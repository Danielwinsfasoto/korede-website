import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!
);

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      name,
      email,
      eventType,
      date,
      message,
    } = body;

    if (!name || !email || !eventType || !message) {
      return NextResponse.json(
        { error: 'Please fill in all required fields.' },
        { status: 400 }
      );
    }

    const { error } = await supabase
      .from('booking_inquiries')
      .insert({
        name,
        email,
        event_type: eventType,
        event_date: date || null,
        message,
      });

    if (error) {
      console.error('Supabase error:', error);

      return NextResponse.json(
        { error: 'Unable to save your inquiry.' },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error('Contact API error:', error);

    return NextResponse.json(
      { error: 'Something went wrong.' },
      { status: 500 }
    );
  }
}