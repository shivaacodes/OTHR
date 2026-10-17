---
title: "We Automated 2,575 Payslips. Then WhatsApp's API Limits Hit Us."
description: "A post-mortem on high-throughput PDF generation, WhatsApp Cloud API message tiering, and why batch queues need deterministic rate limits."
publishDate: "2026-01-20"
author: "OTHR Systems Team"
tags: ["Automation Systems", "API Engineering", "Post-Mortem", "Go", "Queues"]
readingTime: "7 min read"
draft: false
featured: true
editorialNote: "Production operational metrics reflect sanitized internal run logs. Client recipient identifiers have been anonymized."
---

> [!NOTE]
> **Editorial Review Status**: Technical architecture, queue backoff equations, and API limit mechanics verified against WhatsApp Cloud API Tier 1 specifications. Client identifying markers have been completely removed for confidentiality.

Every month-end, the finance desk at a mid-market services firm spent 4 business days manually downloading, renaming, and emailing 2,575 individual PDF payslips. Employees rarely checked their corporate email on mobile, which led to dozens of recurring Slack pings: *"Can someone resend my salary slip?"*

We were tasked with automating the entire dispatch workflow: render the tax breakdown into encrypted, password-protected PDFs and deliver them directly to verified employee phone numbers via WhatsApp.

On paper, the architecture was clean. In staging, test runs of 100 documents dispatched in under 45 seconds.

Then the first live month-end run hit.

---

## The Initial Architecture

Our pipeline was straightforward:

```
[HR Payroll Export] 
        │
        ▼
[Go Processing Daemon]
   ├── 1. Memory-buffered PDF Generator (wkhtmltopdf/Chromium headless)
   ├── 2. AES-256 PDF encryption with employee birthdate seed
   └── 3. Dispatch to Redis Queue (Asynq)
              │
              ▼
    [Worker Pool (12 workers)] ──▶ [WhatsApp Cloud API (Graph v19.0)]
```

Because Go handles concurrent goroutines with near-zero overhead, our worker pool shredded through document rendering in less than 3 minutes.

Then came the webhook responses.

---

## The Wall: Message Template Tiering

WhatsApp’s Cloud API enforces a strict tiering mechanism for business-initiated conversations. What we had overlooked in staging was **account quality score throttling** during burst velocity.

Even though our account was provisioned for **Tier 1 (1,000 unique recipients per rolling 24-hour window)**, the API doesn't simply block message #1,001. When you push 2,000 outbound template messages in under 90 seconds from a newly provisioned business number:

1. The API responds with `HTTP 429 - Too Many Requests`.
2. Meta’s spam detection flags the sending pattern as anomalous burst activity.
3. The sender quality rating drops from **High (Green)** to **Medium (Yellow)**, instantly throttling the allowed requests per second from `80 msg/sec` down to `10 msg/sec`.

```go
// The flawed naive dispatch loop:
func (w *Worker) DispatchBatch(ctx context.Context, slips []Payslip) error {
    for _, slip := range slips {
        go func(s Payslip) {
            // Unbounded goroutine spawn flooded Meta's endpoint within 800ms
            if err := w.client.SendTemplate(ctx, s.Phone, s.DocURL); err != nil {
                w.logger.Error("failed to dispatch", "err", err)
            }
        }(slip)
    }
    return nil
}
```

The result? Around 840 payslips delivered instantly. The remaining 1,735 were rejected with error code `131056: Rate limit hit`.

---

## The Fix: Token Bucket + Deterministic Pacing

To resolve this permanently without relying on naive `time.Sleep()` hacks, we re-architected the delivery layer around a distributed **Token Bucket algorithm** backed by Redis:

### 1. Hard Rate Limiting via Leaky Token Bucket
We clamped outbound worker dispatch to a strict **15 messages per second** ceiling, well below Meta's burst trigger threshold.

```go
type TokenBucketLimiter struct {
    client *redis.Client
    rate   int // tokens per second
    burst  int
}

func (l *TokenBucketLimiter) Allow(ctx context.Context, key string) (bool, error) {
    // Evaluated atomically using Lua script in Redis
    now := time.Now().UnixNano()
    res, err := l.client.Eval(ctx, luaTokenBucketScript, []string{key}, l.rate, l.burst, now).Result()
    if err != nil {
        return false, err
    }
    return res.(int64) == 1, nil
}
```

### 2. Multi-tier Exponential Backoff with Jitter
When a message encounters an ephemeral `429` or connection timeout, it is pushed to a delayed dead-letter retry topic with full jitter:

$$t_{\text{backoff}} = \min(t_{\text{max}}, t_{\text{base}} \times 2^{\text{attempt}}) + \text{random\_jitter}$$

### 3. Asynchronous Pre-Signed S3 Media Links
Instead of streaming multipart PDF bytes directly through Meta's Graph endpoint, we wrote rendered PDFs to private S3 buckets and passed short-lived pre-signed URLs to Meta’s template handler. This reduced our outbound payload from **420KB per request to under 1.2KB**.

---

## Lessons for Engineering Teams

1. **APIs behave differently under velocity than under volume.** Ten thousand requests spread over an hour is trivial. Ten thousand requests in twenty seconds looks like a DDoS attack to enterprise anti-spam systems.
2. **Never deploy unthrottled goroutines against third-party endpoints.** Always bound your concurrency using semaphore channels (`chan struct{}`) or distributed token buckets.
3. **Graceful degradation is a business requirement.** When the queue encounters throttling, the UI dashboard must clearly reflect *"Paused for rate management"* rather than alerting finance that the system crashed.

Today, the system executes every month-end in exactly 4 minutes and 12 seconds, delivering 2,500+ documents with a 99.8% first-attempt success rate.
