'use client'

import React from 'react'
import Image from 'next/image'

const HeroSection = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section
      ref={ref}
      id="hero-section"
      style={{
        position: 'relative',
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#0D0D1F',
      }}
    >
      {/* Background image */}
      <Image
        src="/images/Hands Background.webp"
        alt=""
        fill
        priority
        style={{ objectFit: 'cover', opacity: 0.35 }}
      />

      {/* Radial gradient overlay */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(ellipse at 50% 45%, transparent 0%, #0D0D1FCC 55%, #0D0D1F 100%)',
        }}
      />

      {/* Headline block */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          gap: '16px',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: '88px',
            fontStyle: 'italic',
            fontWeight: 600,
            letterSpacing: '-2px',
            lineHeight: 1,
            color: '#FFFFFF',
          }}
        >
          First, Construct
        </p>
        <p
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: '88px',
            fontStyle: 'italic',
            fontWeight: 600,
            letterSpacing: '-2px',
            lineHeight: 1,
            color: '#C9A84C',
          }}
        >
          the Citadel
        </p>
        <p
          style={{
            fontFamily: 'var(--font-cormorant), Georgia, serif',
            fontSize: '88px',
            fontStyle: 'italic',
            fontWeight: 600,
            letterSpacing: '-2px',
            lineHeight: 1,
            color: '#FFFFFF',
          }}
        >
          Then, the Gold
        </p>
      </div>
    </section>
  )
})

HeroSection.displayName = 'HeroSection'

export default HeroSection
