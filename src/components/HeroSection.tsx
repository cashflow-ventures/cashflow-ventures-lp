'use client'

import React from 'react'

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
      {/* Full hero background with responsive images for all screen densities */}
      <picture>
        <source
          srcSet="/images/dark-overlay@1x.webp 1x, /images/dark-overlay@2x.webp 2x, /images/dark-overlay@3x.webp 3x"
          type="image/webp"
        />
        <img
          src="/images/dark-overlay@1x.webp"
          alt=""
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            position: 'absolute',
            top: 0,
            left: 0,
          }}
        />
      </picture>

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
          zIndex: 1,
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
