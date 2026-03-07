'use client'

import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import HeroSection from './HeroSection'

gsap.registerPlugin(ScrollTrigger)

interface ScrollNarrativeProps {
  heroRef: React.RefObject<HTMLElement | null>
}

export default function ScrollNarrative({ heroRef }: ScrollNarrativeProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const stickyRef = useRef<HTMLDivElement>(null)
  const narrativeRef = useRef<HTMLDivElement>(null)
  const lineRefs = useRef<(HTMLElement | null)[]>([])

  const cormorantStyle: React.CSSProperties = {
    width: '100%',
    fontFamily: 'var(--font-cormorant), Georgia, serif',
    fontSize: 'clamp(18px, 4.5vw, 36px)',
    fontStyle: 'italic',
    fontWeight: 600,
    lineHeight: 1.5,
  }

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial state
      gsap.set(narrativeRef.current, { x: '-100vw' })
      gsap.set(lineRefs.current.filter(Boolean), { opacity: 0.2 })

      const tl = gsap.timeline()

      // Adjust animation target based on screen size
      const isMobile = window.innerWidth < 768
      const narrativeTargetX = isMobile ? '5vw' : '140px'

      // Phase A: Hero exits right, narrative enters from left — simultaneously (duration: 1)
      if (heroRef.current) {
        tl.to(heroRef.current, { x: '110vw', duration: 1, ease: 'none' })
      }
      tl.to(narrativeRef.current, { x: narrativeTargetX, duration: 1, ease: 'none' }, '<')

      // Phase B: Highlight lines one by one (duration: 0.5 each = 4.5 total for 9 lines)
      lineRefs.current.forEach((el) => {
        if (el) {
          tl.to(el, { opacity: 1, duration: 0.5, ease: 'none' })
        }
      })

      // Phase C: Pause for 3 seconds before allowing scroll to continue
      tl.to({}, { duration: 3, ease: 'none' })

      // Total timeline duration: 1 + 4.5 + 3 = 8.5 units
      // Pin the sticky layer for the full timeline duration
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: `+=${containerRef.current?.offsetHeight ?? 3500}`,
        pin: stickyRef.current,
        scrub: 1.5,
        animation: tl,
      })
    }, containerRef)

    return () => ctx.revert()
  }, [heroRef])

  return (
    <div
      ref={containerRef}
      style={{
        position: 'relative',
        height: '3500px',
        zIndex: 20,
      }}
    >
      {/* Sticky viewport layer — only 100vh visible at any moment */}
      <div
        ref={stickyRef}
        style={{
          position: 'sticky',
          top: 0,
          width: '100vw',
          height: '100vh',
          overflow: 'hidden',
          background: '#0D0D1F',
        }}
      >
        {/* Hero section rendered inside the pinned area */}
        <HeroSection ref={heroRef} />
        
        {/* Narrative text block — starts off-screen left, animated to responsive position */}
        <div
          ref={narrativeRef}
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            transform: 'translateY(-50%)',
            width: '100%',
            maxWidth: 'min(800px, 90vw)',
            zIndex: 25,
            paddingLeft: '20px',
            paddingRight: '20px',
            boxSizing: 'border-box',
          }}
        >
          {/* Line 0: Alexander the Great */}
          <p
            ref={(el) => { lineRefs.current[0] = el }}
            style={{ ...cormorantStyle, marginBottom: 'clamp(16px, 4vw, 32px)', color: '#FFFFFF', opacity: 0.2 }}
          >
            Alexander the Great inherited the world&apos;s most powerful army from his father at 20;
          </p>

          {/* Line 1: Elon Musk */}
          <p
            ref={(el) => { lineRefs.current[1] = el }}
            style={{ ...cormorantStyle, marginBottom: 'clamp(16px, 4vw, 32px)', color: '#FFFFFF', opacity: 0.2 }}
          >
            Elon Musk received $28 million from his father before starting his first venture at 24;
          </p>

          {/* Line 2: Donald Trump */}
          <p
            ref={(el) => { lineRefs.current[2] = el }}
            style={{ ...cormorantStyle, marginBottom: 'clamp(24px, 5vw, 48px)', color: '#FFFFFF', opacity: 0.2 }}
          >
            Donald Trump received over $400 million from his father before taking over his empire at 25.
          </p>

          {/* Line 3: Gold divider 1 */}
          <div
            ref={(el) => { lineRefs.current[3] = el as HTMLElement | null }}
            style={{
              width: 'clamp(32px, 8vw, 48px)',
              height: '2px',
              background: '#C9A84C',
              opacity: 0.4,
              marginBottom: 'clamp(24px, 5vw, 48px)',
            }}
          />

          {/* Line 4: Today line */}
          <p
            ref={(el) => { lineRefs.current[4] = el }}
            style={{ ...cormorantStyle, marginBottom: 'clamp(16px, 4vw, 32px)', color: '#FFFFFF', opacity: 0.2 }}
          >
            Today, there is a shift in the world.
          </p>

          {/* Line 5: Stat line (gold) */}
          <p
            ref={(el) => { lineRefs.current[5] = el }}
            style={{
              ...cormorantStyle,
              marginBottom: 'clamp(8px, 2vw, 16px)',
              color: '#C9A84C',
              fontWeight: 700,
              opacity: 0.27,
            }}
          >
            79% of new millionaires built their wealth from scratch.¹
          </p>

          {/* Line 6: Source citation */}
          <p
            ref={(el) => { lineRefs.current[6] = el }}
            style={{
              width: '100%',
              fontFamily: 'var(--font-dm-sans), system-ui, sans-serif',
              fontSize: 'clamp(10px, 2.2vw, 13px)',
              color: '#FFFFFF',
              opacity: 0.1,
              marginBottom: 'clamp(24px, 5vw, 48px)',
              letterSpacing: '1px',
            }}
          >
            ¹ Northwestern Mutual. (2025). Planning &amp; progress study.
          </p>

          {/* Line 7: Gold divider 2 */}
          <div
            ref={(el) => { lineRefs.current[7] = el as HTMLElement | null }}
            style={{
              width: 'clamp(32px, 8vw, 48px)',
              height: '2px',
              background: '#C9A84C',
              opacity: 0.4,
              marginBottom: 'clamp(24px, 5vw, 48px)',
            }}
          />

          {/* Line 8: Cashflow mission line */}
          <p
            ref={(el) => { lineRefs.current[8] = el }}
            style={{ ...cormorantStyle, color: '#FFFFFF', opacity: 0.2 }}
          >
            @Cashflow supports this trend by democratizing value creation on a international level.
          </p>
        </div>
      </div>
    </div>
  )
}
