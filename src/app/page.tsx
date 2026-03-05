'use client'

import { useRef } from 'react'
import HeroSection from '@/components/HeroSection'
import ScrollNarrative from '@/components/ScrollNarrative'
import CashflowSection from '@/components/CashflowSection'

export default function Home() {
  const heroRef = useRef<HTMLElement>(null)
  const cashflowRef = useRef<HTMLDivElement>(null)

  return (
    <main>
      <HeroSection ref={heroRef} />
      <ScrollNarrative heroRef={heroRef} cashflowRef={cashflowRef} />
      <CashflowSection ref={cashflowRef} />
    </main>
  )
}
