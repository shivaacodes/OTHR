// Cloudflare Pages Function: /api/inquiry

interface Env {
  RESEND_API_KEY?: string;
  CONTACT_EMAIL_TO?: string;
  CONTACT_EMAIL_FROM?: string;
  CF_TURNSTILE_SECRET_KEY?: string;
}

export async function onRequestPost(context: { request: Request; env: Env }): Promise<Response> {
  const { request, env } = context;

  try {
    const ip = request.headers.get('cf-connecting-ip') || '127.0.0.1';
    const body = await request.json() as Record<string, any>;

    const {
      name,
      email,
      company = '',
      projectType,
      budget,
      timeline,
      description,
      consent,
      turnstileToken
    } = body;

    // Server-side validation
    if (!name || typeof name !== 'string' || name.trim().length === 0 || name.length > 100) {
      return new Response(
        JSON.stringify({ error: 'Please provide a valid name (maximum 100 characters).' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || typeof email !== 'string' || !emailRegex.test(email) || email.length > 150) {
      return new Response(
        JSON.stringify({ error: 'Please provide a valid work email address.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!description || typeof description !== 'string' || description.trim().length < 10) {
      return new Response(
        JSON.stringify({ error: 'Please describe your project (minimum 10 characters).' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    if (!consent) {
      return new Response(
        JSON.stringify({ error: 'You must agree to the processing of your contact details.' }),
        { status: 400, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Optional Cloudflare Turnstile Spam Check
    if (env.CF_TURNSTILE_SECRET_KEY && turnstileToken) {
      const verifyRes = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
          secret: env.CF_TURNSTILE_SECRET_KEY,
          response: turnstileToken,
          remoteip: ip
        })
      });

      const verifyData = await verifyRes.json() as { success: boolean };
      if (!verifyData.success) {
        return new Response(
          JSON.stringify({ error: 'Spam verification failed. Please try again.' }),
          { status: 403, headers: { 'Content-Type': 'application/json' } }
        );
      }
    }

    const referenceId = `INQ-${Date.now().toString(36).toUpperCase()}`;

    // Safe Development Mode (when Resend is not configured)
    if (!env.RESEND_API_KEY) {
      console.log(`[SAFE_DEV_MODE] Cloudflare Pages inquiry received: ${referenceId}`);
      console.log(`From: ${name} <${email}>`);

      return new Response(
        JSON.stringify({
          success: true,
          simulated: true,
          referenceId,
          message: 'Inquiry received in development mode. (RESEND_API_KEY not configured).'
        }),
        { status: 200, headers: { 'Content-Type': 'application/json' } }
      );
    }

    // Production Resend Email Dispatch
    const sender = env.CONTACT_EMAIL_FROM || 'inquiries@othr.engineering';
    const recipient = env.CONTACT_EMAIL_TO || 'studio@othr.engineering';

    const emailHtml = `
      <div style="font-family: monospace; background: #080B0A; color: #F5F6F0; padding: 32px; border: 1px solid #1D2620;">
        <h2 style="color: #C6FF3D; margin-top: 0;">NEW PROJECT INQUIRY // ${referenceId}</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}" style="color: #C6FF3D;">${email}</a></p>
        <p><strong>Company:</strong> ${company || 'N/A'}</p>
        <p><strong>Project Type:</strong> ${projectType || 'Not specified'}</p>
        <p><strong>Budget Range:</strong> ${budget || 'Not specified'}</p>
        <p><strong>Timeline:</strong> ${timeline || 'Not specified'}</p>
        <hr style="border: none; border-top: 1px solid #1D2620; margin: 24px 0;" />
        <h3 style="color: #F5F6F0;">Project Description:</h3>
        <p style="white-space: pre-wrap; color: #A5A9A3;">${description}</p>
      </div>
    `;

    const resendRes = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${env.RESEND_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        from: sender,
        to: recipient,
        reply_to: email,
        subject: `[OTHR INQUIRY] ${projectType || 'Project'} from ${name} (${referenceId})`,
        html: emailHtml
      })
    });

    if (!resendRes.ok) {
      const errText = await resendRes.text();
      return new Response(
        JSON.stringify({ error: 'Failed to deliver email notification. Please email studio@othr.engineering directly.' }),
        { status: 502, headers: { 'Content-Type': 'application/json' } }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        simulated: false,
        referenceId,
        message: 'Inquiry dispatched to OTHR engineering team.'
      }),
      { status: 200, headers: { 'Content-Type': 'application/json' } }
    );
  } catch (err: any) {
    return new Response(
      JSON.stringify({ error: err.message || 'An unexpected error occurred.' }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }
}
