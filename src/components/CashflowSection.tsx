'use client'

import React from 'react'

const CashflowSection = React.forwardRef<HTMLDivElement>((props, ref) => {
  return (
    <div
      ref={ref}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        background: '#F8F9FA',
        overflowY: 'auto',
        transform: 'translateX(100vw)',
        zIndex: 30,
        visibility: 'visible',
        pointerEvents: 'auto',
      }}
    >
      {/* Editorial document card */}
      <div
        style={{
          margin: '0 auto',
          width: '816px',
          minHeight: '100vh',
          background: '#FFFFFF',
          paddingTop: '72px',
          paddingBottom: '72px',
          paddingLeft: '96px',
          paddingRight: '96px',
          fontFamily: 'Arial, var(--font-dm-sans), sans-serif',
          fontSize: '11px',
          lineHeight: 1.6,
          color: '#202124',
        }}
      >
        {/* Company description */}
        <p style={{ marginBottom: '16px' }}>
          @C builds new businesses from the ground up via dedicated partnerships from around the
          world and/or connecting brilliant like minded founders. our north star is: always real;
          always hands on; 0 → real value → stable &amp; scalable frameworks.
        </p>

        <p style={{ marginBottom: '16px' }}>
          we build and scale ventures ranging from tech to brick-and-mortar to ecom and more.
        </p>

        <p style={{ marginBottom: '16px' }}>we also consult and invest.</p>

        {/* Contact prompt */}
        <p style={{ marginTop: '48px', marginBottom: '16px' }}>if you are onto somethin&#39; —</p>

        {/* Contact form */}
        <form
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            maxWidth: '480px',
          }}
        >
          <input
            type="text"
            placeholder="name"
            name="name"
            style={{
              border: 'none',
              borderBottom: '1px solid #DADCE0',
              padding: '8px 0',
              fontSize: '11px',
              fontFamily: 'inherit',
              outline: 'none',
              width: '100%',
              background: 'transparent',
            }}
          />

          <input
            type="text"
            placeholder="link/email"
            name="contact"
            style={{
              border: 'none',
              borderBottom: '1px solid #DADCE0',
              padding: '8px 0',
              fontSize: '11px',
              fontFamily: 'inherit',
              outline: 'none',
              width: '100%',
              background: 'transparent',
            }}
          />

          <textarea
            placeholder="shoot away"
            name="message"
            rows={4}
            style={{
              border: 'none',
              borderBottom: '1px solid #DADCE0',
              padding: '8px 0',
              fontSize: '11px',
              fontFamily: 'inherit',
              outline: 'none',
              width: '100%',
              height: '100px',
              resize: 'vertical',
              background: 'transparent',
            }}
          />

          <button
            type="submit"
            style={{
              background: '#1A73E8',
              color: '#FFFFFF',
              border: 'none',
              padding: '8px 24px',
              fontSize: '11px',
              fontFamily: 'inherit',
              cursor: 'pointer',
              borderRadius: '4px',
              alignSelf: 'flex-start',
            }}
          >
            Submit
          </button>
        </form>

        {/* Footer */}
        <p
          style={{
            marginTop: '48px',
            textAlign: 'center',
            fontSize: '11px',
            color: '#1A73E8',
          }}
        >
          <a href="#" style={{ color: '#1A73E8', textDecoration: 'none' }}>
            Terms &amp; Conditions
          </a>
          {'; '}
          <a href="#" style={{ color: '#1A73E8', textDecoration: 'none' }}>
            Privacy
          </a>
          {'.'}
        </p>
      </div>
    </div>
  )
})

CashflowSection.displayName = 'CashflowSection'

export default CashflowSection
