# OTHR // Future Payments Architecture

## 1. Executive Summary & Purpose

This architectural document defines the planned payment processing infrastructure for OTHR's digital products and SaaS platforms, beginning with **WrapForge**.

> **Important Boundary Rule**:  
> Dodo Payments is evaluated specifically for eligible digital products, downloadable assets, and recurring SaaS subscriptions—**not** for bespoke studio agency engagements. Studio contracts are managed through conventional enterprise invoicing (SOW/MSA).

In Phase 02, live payment gateways remain strictly decoupled from the marketing website. This document establishes the secure technical blueprint to be implemented when WrapForge transitions from private alpha to commercial availability.

---

## 2. Core Security & Design Principles

1. **Isolation from Marketing Website**: The static marketing website (`https://othr.engineering`) will never process credit cards, store sensitive cardholder data, or hold payment secrets.
2. **Hosted Checkout Delegation**: Checkout experiences are delegated to Dodo Payments' PCI-compliant hosted checkout sessions.
3. **Zero Secret Exposure**: All API keys (`DODO_PAYMENTS_API_KEY`) and webhook signing secrets (`DODO_PAYMENTS_WEBHOOK_SECRET`) reside exclusively in encrypted server-side edge environments (Cloudflare Workers secrets).
4. **Idempotent Webhook Fulfillment**: Webhook event processing must be strictly idempotent to prevent duplicate software license generation or credit allocation during network retries.
5. **Cryptographic Signature Verification**: Incoming webhook payloads are rejected unless verified against Dodo's HMAC-SHA256 signature header.

---

## 3. End-to-End Transaction Flow

```
[User on WrapForge App] ──▶ 1. Selects "Pro License"
         │
         ▼
[Serverless Backend /api/checkout]
   ├── 2. Creates Dodo Checkout Session via Server SDK
   └── 3. Returns signed checkout URL
              │
              ▼
    [Dodo Payments Hosted Checkout (PCI DSS Level 1)]
              │
              ▼ (Customer completes purchase)
    [Dodo Webhook Event: payment.succeeded]
              │
              ▼
[Serverless Webhook Consumer /api/webhooks/dodo]
   ├── 4. Verify HMAC-SHA256 signature (dodo-signature header)
   ├── 5. Check if event_id already processed (Idempotency)
   ├── 6. Issue license key / Provision tenant tier
   └── 7. Send confirmation dispatch to user email
```

---

## 4. Webhook Ingestion & Signature Verification Spec

```typescript
/**
 * Example Serverless Worker: /api/webhooks/dodo
 * Runtime: Cloudflare Workers
 */
import { verifyDodoSignature } from './crypto';

interface DodoWebhookPayload {
  event_id: string;
  event_type: 'payment.succeeded' | 'subscription.created' | 'subscription.cancelled';
  data: {
    customer_id: string;
    customer_email: string;
    product_id: string;
    amount: number;
    currency: string;
    metadata: {
      tenant_id?: string;
      tier?: string;
    };
  };
}

export async function handleDodoWebhook(request: Request, env: Env): Promise<Response> {
  const signature = request.headers.get('dodo-signature');
  const rawBody = await request.text();

  // 1. Cryptographic Signature Check
  const isValid = await verifyDodoSignature(rawBody, signature, env.DODO_PAYMENTS_WEBHOOK_SECRET);
  if (!isValid) {
    return new Response(JSON.stringify({ error: 'Invalid webhook signature' }), { status: 401 });
  }

  const event = JSON.parse(rawBody) as DodoWebhookPayload;

  // 2. Idempotency Check (e.g. Cloudflare KV or PostgreSQL)
  const isDuplicate = await env.KV_STORE.get(`dodo_event_${event.event_id}`);
  if (isDuplicate) {
    return new Response(JSON.stringify({ status: 'already_processed' }), { status: 200 });
  }

  // 3. Event Routing & Fulfillment
  switch (event.event_type) {
    case 'payment.succeeded':
      await fulfillDigitalOrder(event.data);
      break;
    case 'subscription.created':
      await provisionTenantSubscription(event.data);
      break;
    case 'subscription.cancelled':
      await scheduleGracePeriod(event.data);
      break;
    default:
      console.log(`Unhandled event type: ${event.event_type}`);
  }

  // 4. Mark Event as Processed (TTL 7 days)
  await env.KV_STORE.put(`dodo_event_${event.event_id}`, 'processed', { expirationTtl: 604800 });

  return new Response(JSON.stringify({ received: true }), { status: 200 });
}
```

---

## 5. WrapForge Pricing Tiers (Planned)

When WrapForge opens public enrollment, planned commercial models include:

| Tier | Model | Target Audience | Features |
| :--- | :--- | :--- | :--- |
| **Studio Starter** | One-time seat | Independent packaging designers | Unlimited 3D box folds, basic PBR textures, 4K WebP export |
| **Studio Pro** | Monthly / Annual | Boutique branding agencies | Custom foil & spot UV shaders, print-ready PDF/X export, share links |
| **Enterprise OEM** | Annual license | Packaging printers & manufacturers | CAD/DXF batch API, custom paper profiles, white-label client viewport |

---

## 6. Implementation Prerequisites Checklist

Before activating payments in production:
- [ ] Dodo Payments merchant account approved and verified.
- [ ] Production webhook endpoint provisioned with HTTPS.
- [ ] Webhook signing secret stored in Cloudflare Workers secrets vault.
- [ ] Automated end-to-end sandbox test completing full checkout and refund cycles.
- [ ] Commercial refund and cancellation policy updated in `/terms`.
