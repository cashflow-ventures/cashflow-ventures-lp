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
          alt="Cashflow Ventures Hero - First, Construct the Citadel, Then, the Gold"
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
    </section>
  )
})

HeroSection.displayName = 'HeroSection'

export default HeroSection
