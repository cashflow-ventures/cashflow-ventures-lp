'use client'

import React from 'react'
import Image from 'next/image'

const HeroSection = React.forwardRef<HTMLElement>((props, ref) => {
  return (
    <section
      ref={ref}
      id="hero-section"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#0D0D1F',
        zIndex: 10,
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

      {/* Radial gradient overlay - using actual image for pixel-perfect match */}
      <Image
        src="/images/dark-overlay.webp"
        alt=""
        fill
        priority
        sizes="100vw"
        style={{ objectFit: 'cover', pointerEvents: 'none' }}
      />

      {/* Headline block - exact match to Pencil design */}
      <div
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '16px',
        }}
      >
        <p
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '88px',
            fontStyle: 'italic',
            fontWeight: '600',
            letterSpacing: '-2px',
            lineHeight: 1,
            color: '#FFFFFF',
            margin: 0,
          }}
        >
          First, Construct
        </p>
        <p
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '88px',
            fontStyle: 'italic',
            fontWeight: '600',
            letterSpacing: '-2px',
            lineHeight: 1,
            color: '#C9A84C',
            margin: 0,
          }}
        >
          the Citadel
        </p>
        <p
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '88px',
            fontStyle: 'italic',
            fontWeight: '600',
            letterSpacing: '-2px',
            lineHeight: 1,
            color: '#FFFFFF',
            margin: 0,
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
