import { serve } from 'https://deno.land/std@0.177.0/http/server.ts';

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY');
const NOTIFY_EMAIL = 'akinodekorede3@gmail.com';

serve(async (req) => {
  try {
    const payload = await req.json();
    const record = payload.record; // Supabase webhook wraps the row in "record"

    const { name, email, event_type, event_date, message } = record;

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: 'Booking Inquiries <bookings@contact.violinistak3.com>',
        to: NOTIFY_EMAIL,
        subject: `New Booking Inquiry from ${name}`,
        html: `
          <h2>New Booking Inquiry From My Website</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Event Type:</strong> ${event_type}</p>
          <p><strong>Event Date:</strong> ${event_date || 'Not specified'}</p>
          <p><strong>Message:</strong></p>
          <p>${message}</p>
        `,
      }),
    });

    if (!res.ok) {
      const errorText = await res.text();
      console.error('Resend error:', errorText);
      return new Response(JSON.stringify({ error: 'Failed to send email' }), { status: 500 });
    }

    return new Response(JSON.stringify({ success: true }), { status: 200 });
  } catch (err) {
    console.error('Function error:', err);
    return new Response(JSON.stringify({ error: 'Internal error' }), { status: 500 });
  }
});