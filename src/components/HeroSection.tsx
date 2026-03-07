'use client'

import React, { useEffect, useState } from 'react'
import Image from 'next/image'

const HeroSection = React.forwardRef<HTMLElement>((props, ref) => {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  return (
    <section
      ref={ref}
      id="hero-section"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        maxWidth: '100vw',
        height: '100vh',
        overflow: 'hidden',
        background: '#0D0D1F',
        zIndex: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      {isMobile ? (
        // Mobile: Component-based with separate elements
        <>
          {/* Background hands image */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              opacity: 0.35,
            }}
          >
            <Image
              src="/images/Hands Background.webp"
              alt="Hands Background"
              fill
              style={{
                objectFit: 'cover',
                objectPosition: 'center',
              }}
              priority
            />
          </div>

          {/* Radial gradient overlay */}
          <div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              background: `radial-gradient(ellipse at center 45%, transparent 0%, #0D0D1FCC 50%, #0D0D1F 100%)`,
              pointerEvents: 'none',
            }}
          />

          {/* Centered text content */}
          <div
            style={{
              position: 'relative',
              zIndex: 2,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 'clamp(12px, 3vw, 16px)',
              padding: '0 clamp(20px, 5vw, 40px)',
              textAlign: 'center',
            }}
          >
            <h1
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(48px, 10vw, 88px)',
                fontStyle: 'italic',
                fontWeight: 600,
                letterSpacing: '-2px',
                color: '#FFFFFF',
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              First, Construct
            </h1>
            <h1
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(48px, 10vw, 88px)',
                fontStyle: 'italic',
                fontWeight: 600,
                letterSpacing: '-2px',
                color: '#C9A84C',
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              the Citadel
            </h1>
            <h1
              style={{
                fontFamily: 'var(--font-cormorant), Georgia, serif',
                fontSize: 'clamp(48px, 10vw, 88px)',
                fontStyle: 'italic',
                fontWeight: 600,
                letterSpacing: '-2px',
                color: '#FFFFFF',
                lineHeight: 1.1,
                margin: 0,
              }}
            >
              Then, the Gold
            </h1>
          </div>
        </>
      ) : (
        // Desktop/iPad: Full hero image
        <div style={{ width: '100%', height: '100%', position: 'relative', overflow: 'hidden' }}>
          <picture style={{ width: '100%', height: '100%', display: 'block' }}>
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
                maxWidth: '100%',
                objectFit: 'cover',
                objectPosition: 'center center',
                position: 'absolute',
                top: 0,
                left: 0,
                display: 'block',
              }}
            />
          </picture>
        </div>
      )}
    </section>
  )
})

HeroSection.displayName = 'HeroSection'

export default HeroSection
