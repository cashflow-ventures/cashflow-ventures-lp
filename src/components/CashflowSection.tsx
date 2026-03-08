'use client'

import React, { useState, useEffect } from 'react'
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3'
import {
  Lock,
  Search,
  Undo2,
  Redo2,
  ChevronDown,
  Minus,
  Plus,
  Pen,
  ChevronUp,
} from 'lucide-react'

const CashflowSection = React.forwardRef<HTMLDivElement>((props, ref) => {
  const [formData, setFormData] = useState({
    name: '',
    link: '',
    desc: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')
  const { executeRecaptcha } = useGoogleReCaptcha()

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    try {
      // Get reCAPTCHA token
      if (!executeRecaptcha) {
        throw new Error('reCAPTCHA not loaded. Please refresh the page and try again.')
      }

      const recaptchaToken = await executeRecaptcha('submit_form')
      
      if (!recaptchaToken) {
        throw new Error('Failed to verify reCAPTCHA')
      }

      // Submit to API route (server-side verification)
      const response = await fetch('/api/submit-form', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.name,
          link: formData.link,
          desc: formData.desc,
          recaptchaToken,
        }),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || 'Failed to submit form')
      }

      // Success
      setSubmitStatus('success')
      setFormData({ name: '', link: '', desc: '' })

      // Reset success message after 5 seconds
      setTimeout(() => setSubmitStatus('idle'), 5000)
    } catch (error: any) {
      setSubmitStatus('error')
      setErrorMessage(error.message || 'Failed to submit form. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div
      ref={ref}
      style={{
        position: 'relative',
        width: '100vw',
        minHeight: '100vh',
        background: '#F8F9FA',
        zIndex: 30,
      }}
    >
      {/* Google Docs-style Header */}
      <div
        style={{
          background: '#F8F9FA',
          fontFamily: 'var(--font-dm-sans), sans-serif',
          position: 'sticky',
          top: 0,
          zIndex: 100,
        }}
      >
        {/* Title Row */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(4px, 1.5vw, 8px)',
            padding: '8px clamp(8px, 2vw, 12px) 4px clamp(8px, 2vw, 12px)',
            background: '#FFFFFF',
            flexWrap: 'nowrap',
            overflow: 'hidden',
            minHeight: '60px',
          }}
        >
          <div style={{ display: 'flex', flexDirection: 'column', minWidth: 0, flex: '0 1 auto', maxWidth: '50%' }}>
            <div
              style={{
                fontSize: 'clamp(12px, 3.5vw, 18px)',
                color: '#202124',
                fontWeight: 'normal',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              cashflow ventures
            </div>
            <div
              style={{
                display: 'flex',
                gap: 'clamp(3px, 1vw, 5px)',
                fontSize: 'clamp(9px, 2vw, 12px)',
                color: '#202124',
                marginTop: '2px',
                flexWrap: 'nowrap',
                overflow: 'hidden',
              }}
            >
              <span>File</span>
              <span>Edit</span>
              <span>View</span>
            </div>
          </div>
          <div style={{ flex: 1, minWidth: '8px' }} />
          <div style={{ display: 'flex', gap: 'clamp(4px, 1.5vw, 6px)', alignItems: 'center', flexShrink: 0 }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'clamp(4px, 1.5vw, 6px)',
                background: '#C2E7FF',
                padding: 'clamp(3px, 1vw, 4px) clamp(8px, 2.5vw, 12px)',
                borderRadius: '20px',
                flexShrink: 0,
              }}
            >
              <Lock size={12} color="#001D35" />
              <span style={{ fontSize: 'clamp(10px, 2vw, 14px)', fontWeight: '500', color: '#001D35', whiteSpace: 'nowrap' }}>Share</span>
            </div>
            <div
              style={{
                width: 'clamp(24px, 6vw, 28px)',
                height: 'clamp(24px, 6vw, 28px)',
                borderRadius: '50%',
                background: '#9C27B0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#FFFFFF',
                fontSize: 'clamp(12px, 3vw, 14px)',
                fontWeight: '500',
                flexShrink: 0,
              }}
            >
              D
            </div>
          </div>
        </div>

        {/* Formatting Toolbar */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(2px, 1vw, 4px)',
            padding: '4px clamp(4px, 1.5vw, 8px)',
            fontSize: '11px',
            color: '#444746',
            background: '#EDF2FA',
            borderBottom: '1px solid #E0E0E0',
            overflowX: 'auto',
            overflowY: 'hidden',
            flexWrap: 'nowrap',
            WebkitOverflowScrolling: 'touch',
          }}
        >
          <Search size={12} color="#444746" style={{ flexShrink: 0 }} />
          <Undo2 size={12} color="#444746" style={{ flexShrink: 0 }} />
          <Redo2 size={12} color="#444746" style={{ flexShrink: 0 }} />
          <div style={{ width: '1px', height: '16px', background: '#C4C7C5', flexShrink: 0 }} />
          <span style={{ flexShrink: 0, fontSize: '9px' }}>100%</span>
          <ChevronDown size={8} color="#444746" style={{ flexShrink: 0 }} />
          <div style={{ width: '1px', height: '16px', background: '#C4C7C5', flexShrink: 0 }} />
          <span style={{ flexShrink: 0, fontSize: '9px' }}>Arial</span>
          <ChevronDown size={8} color="#444746" style={{ flexShrink: 0 }} />
          <div style={{ width: '1px', height: '16px', background: '#C4C7C5', flexShrink: 0 }} />
          <Minus size={8} color="#444746" style={{ flexShrink: 0 }} />
          <span style={{ flexShrink: 0, fontSize: '9px' }}>11</span>
          <Plus size={8} color="#444746" style={{ flexShrink: 0 }} />
          <div style={{ width: '1px', height: '16px', background: '#C4C7C5', flexShrink: 0 }} />
          <span style={{ fontWeight: '700', fontSize: '11px', flexShrink: 0 }}>B</span>
          <span style={{ fontStyle: 'italic', fontSize: '11px', flexShrink: 0 }}>I</span>
          <span style={{ fontSize: '11px', flexShrink: 0 }}>U</span>
          <div style={{ flex: 1, minWidth: '8px' }} />
          <div style={{ display: 'flex', gap: 'clamp(2px, 1vw, 4px)', alignItems: 'center', flexShrink: 0 }}>
            <Pen size={10} color="#444746" />
            <span style={{ fontSize: '9px', whiteSpace: 'nowrap' }}>Editing</span>
            <ChevronDown size={8} color="#444746" />
          </div>
          <ChevronUp size={10} color="#444746" style={{ flexShrink: 0 }} />
        </div>
      </div>

      {/* Pageless Document Body - Notion Style */}
      <div
        style={{
          maxWidth: '900px',
          margin: '0 auto',
          padding: 'clamp(24px, 5vw, 60px) clamp(16px, 5vw, 96px)',
          fontFamily: 'Arial, sans-serif',
          fontSize: 'clamp(14px, 3.5vw, 16px)',
          lineHeight: 1.6,
          color: '#202124',
        }}
      >
        {/* Company description */}
        <div style={{ marginBottom: '0' }}>
          cashflow ventures builds new businesses from the ground up via dedicated partnerships from around the
          world and/or connecting brilliant like minded founders. our north star is: always real;
          always hands on; 0 → real value → stable &amp; scalable frameworks.
        </div>

        <div style={{ lineHeight: 1.6 }}>&nbsp;</div>

        <div style={{ marginBottom: '0' }}>
          we build and scale ventures ranging from tech to brick-and-mortar to ecom and more.
        </div>

        <div style={{ lineHeight: 1.6 }}>&nbsp;</div>

        <div style={{ marginBottom: '0', lineHeight: 1.8 }}>we also consult and invest.</div>

        <div style={{ lineHeight: 1.6 }}>&nbsp;</div>
        <div style={{ lineHeight: 1.6 }}>&nbsp;</div>

        {/* Contact prompt */}
        <div style={{ marginBottom: '0', lineHeight: 1.8 }}>if you&#39;re onto somethin:</div>

        {/* Contact form */}
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            paddingTop: '8px',
          }}
        >
          {/* Name Field */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '12px 0',
              borderBottom: '1px solid #DADCE0',
            }}
          >
            <input
              type="text"
              placeholder="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              style={{
                border: 'none',
                padding: '0',
                fontSize: 'clamp(14px, 3.5vw, 16px)',
                fontFamily: 'Arial, sans-serif',
                outline: 'none',
                width: '100%',
                background: 'transparent',
                color: '#202124',
              }}
            />
          </div>

          {/* Link/Email Field */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '12px 0',
              borderBottom: '1px solid #DADCE0',
            }}
          >
            <input
              type="text"
              placeholder="link/email"
              name="link"
              value={formData.link}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              style={{
                border: 'none',
                padding: '0',
                fontSize: 'clamp(14px, 3.5vw, 16px)',
                fontFamily: 'Arial, sans-serif',
                outline: 'none',
                width: '100%',
                background: 'transparent',
                color: '#202124',
              }}
            />
          </div>

          {/* Message Field */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              padding: '12px 0',
              borderBottom: '1px solid #DADCE0',
              minHeight: 'clamp(80px, 20vw, 120px)',
            }}
          >
            <textarea
              placeholder="shoot away"
              name="desc"
              value={formData.desc}
              onChange={handleInputChange}
              required
              disabled={isSubmitting}
              style={{
                border: 'none',
                padding: '0',
                fontSize: 'clamp(14px, 3.5vw, 16px)',
                fontFamily: 'Arial, sans-serif',
                outline: 'none',
                width: '100%',
                minHeight: 'clamp(60px, 15vw, 100px)',
                background: 'transparent',
                color: '#202124',
                resize: 'vertical',
              }}
            />
          </div>

          <div style={{ fontSize: '6px', lineHeight: 1 }}>&nbsp;</div>

          {/* reCAPTCHA v3 Badge Notice */}
          <div
            style={{
              fontSize: '11px',
              color: '#5F6368',
              paddingTop: '8px',
            }}
          >
            This site is protected by reCAPTCHA and the Google{' '}
            <a href="https://policies.google.com/privacy" style={{ color: '#1A73E8' }}>
              Privacy Policy
            </a>{' '}
            and{' '}
            <a href="https://policies.google.com/terms" style={{ color: '#1A73E8' }}>
              Terms of Service
            </a>{' '}
            apply.
          </div>

          <div style={{ fontSize: '4px', lineHeight: 1 }}>&nbsp;</div>

          {/* Submit Row */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              gap: '16px',
              paddingTop: '12px',
            }}
          >
            <button
              type="submit"
              disabled={isSubmitting}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: isSubmitting ? '#9CA3AF' : '#1A73E8',
                padding: 'clamp(8px, 2vw, 10px) clamp(20px, 5vw, 28px)',
                borderRadius: '4px',
                cursor: isSubmitting ? 'not-allowed' : 'pointer',
                border: 'none',
                fontSize: 'clamp(13px, 3vw, 14px)',
                fontWeight: '500',
                color: '#FFFFFF',
              }}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div style={{ fontSize: '14px', color: '#10B981', marginTop: '8px' }}>
                ✓ Thank you! Your message has been sent successfully.
              </div>
            )}
            {submitStatus === 'error' && (
              <div style={{ fontSize: '14px', color: '#EF4444', marginTop: '8px' }}>
                ✗ {errorMessage}
              </div>
            )}
          </div>

          <div style={{ fontSize: 'clamp(14px, 3.5vw, 16px)', lineHeight: 1.6 }}>&nbsp;</div>
          <div style={{ fontSize: 'clamp(14px, 3.5vw, 16px)', lineHeight: 1.6 }}>&nbsp;</div>
          <div style={{ fontSize: 'clamp(14px, 3.5vw, 16px)', lineHeight: 1.6 }}>&nbsp;</div>

          {/* Credentials Title */}
          <div
            style={{
              fontSize: 'clamp(14px, 3.5vw, 16px)',
              textAlign: 'left',
              marginBottom: 'clamp(-30px, -5vw, -50px)',
              color: '#202124',
              position: 'relative',
              zIndex: 1000,
            }}
          >
            credentials:
          </div>

          {/* RevenueCat Widget */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              width: '100%',
            }}
          >
            <div style={{ position: 'relative', width: '100%', maxWidth: '900px' }}>
              <iframe
                src="https://verified.revenuecat.com/senior-mongoose4971"
                style={{
                  width: '100%',
                  height: 'clamp(400px, 60vh, 700px)',
                  border: 'none',
                  borderRadius: '8px',
                }}
                title="RevenueCat Verification"
              />
              {/* Overlay to hide username at top */}
              <div
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: 'clamp(60px, 10vw, 80px)',
                  background: '#F8F9FA',
                  borderTopLeftRadius: '8px',
                  borderTopRightRadius: '8px',
                  pointerEvents: 'none',
                }}
              />
            </div>
          </div>

          <div style={{ fontSize: 'clamp(14px, 3.5vw, 16px)', lineHeight: 1.6 }}>&nbsp;</div>
          <div style={{ fontSize: 'clamp(14px, 3.5vw, 16px)', lineHeight: 1.6 }}>&nbsp;</div>

          {/* Footer */}
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '4px',
            }}
          >
            <div
              style={{
                fontSize: 'clamp(12px, 3vw, 14px)',
                color: '#1A73E8',
                textAlign: 'center',
              }}
            >
              <a href="/terms" style={{ color: '#1A73E8', textDecoration: 'none' }}>
                Terms &amp; Conditions
              </a>
              ;
              <br />
              <a href="/privacy" style={{ color: '#1A73E8', textDecoration: 'none' }}>
                Privacy
              </a>
              .
            </div>
          </div>
        </form>
      </div>
    </div>
  )
})

CashflowSection.displayName = 'CashflowSection'

export default CashflowSection
