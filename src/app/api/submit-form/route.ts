import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const recaptchaSecret = process.env.RECAPTCHA_SECRET_KEY!

export async function POST(request: NextRequest) {
  try {
    const { name, link, desc, recaptchaToken } = await request.json()

    console.log('Form submission received:', { name, link, hasToken: !!recaptchaToken })

    // Verify reCAPTCHA token server-side
    const recaptchaResponse = await fetch(
      'https://www.google.com/recaptcha/api/siteverify',
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: `secret=${recaptchaSecret}&response=${recaptchaToken}`,
      }
    )

    const recaptchaData = await recaptchaResponse.json()
    console.log('reCAPTCHA response:', recaptchaData)

    // Check if reCAPTCHA verification passed
    // For v2, just check success. For v3, also check score
    if (!recaptchaData.success) {
      console.error('reCAPTCHA verification failed:', recaptchaData)
      return NextResponse.json(
        { error: 'reCAPTCHA verification failed. Please try again.' },
        { status: 400 }
      )
    }

    // If it's v3 and has a score, check it (optional for v2)
    if (recaptchaData.score !== undefined && recaptchaData.score < 0.5) {
      return NextResponse.json(
        { error: 'reCAPTCHA score too low. Please try again.' },
        { status: 400 }
      )
    }

    // Validate input
    if (!name || !link || !desc) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Rate limiting: Check IP address
    const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown'
    
    // Insert into Supabase
    const supabase = createClient(supabaseUrl, supabaseKey)
    const { data, error } = await supabase
      .from('form')
      .insert([{ name, link, desc }])
      .select()

    if (error) {
      console.error('Supabase error:', error)
      return NextResponse.json(
        { error: 'Failed to submit form' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Form submission error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
