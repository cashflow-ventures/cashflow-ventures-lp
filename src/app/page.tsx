'use client'

import { useRef } from 'react'
import { GoogleReCaptchaProvider } from 'react-google-recaptcha-v3'
import HeroSection from '@/components/HeroSection'
import ScrollNarrative from '@/components/ScrollNarrative'
import CashflowSection from '@/components/CashflowSection'

export default function Home() {
  const heroRef = useRef<HTMLElement>(null)
  const cashflowRef = useRef<HTMLDivElement>(null)

  const recaptchaKey = process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY

  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={recaptchaKey || ''}
      scriptProps={{
        async: true,
        defer: true,
        appendTo: 'head',
      }}
    >
      <main style={{ position: 'relative' }}>
        <ScrollNarrative heroRef={heroRef} />
        <CashflowSection ref={cashflowRef} />
      </main>
    </GoogleReCaptchaProvider>
  )
}
