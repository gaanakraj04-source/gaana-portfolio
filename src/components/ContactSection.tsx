'use client'
import { useState, Suspense, lazy, useEffect, useRef } from 'react'
import { ArrowRight } from 'lucide-react'

const Dithering = lazy(() =>
  import('@paper-design/shaders-react').then(mod => ({ default: mod.Dithering }))
)

export function ContactSection() {
  const [isHovered, setIsHovered] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) (e.target as HTMLElement).classList.add('visible')
      }),
      { threshold: 0.1 }
    )
    sectionRef.current?.querySelectorAll('.fade-up').forEach(el => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="contact"
      ref={sectionRef}
      style={{ padding: '4rem 1.5rem 5rem', background: 'var(--offwhite)' }}
    >
      <div
        style={{ maxWidth: '1200px', margin: '0 auto' }}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        {/* Dithering CTA card — from 21st.dev */}
        <div
          style={{
            position: 'relative',
            overflow: 'hidden',
            borderRadius: '48px',
            border: '1px solid rgba(13,34,64,0.12)',
            background: 'var(--cream)',
            minHeight: '560px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* Dithering river-flow animation */}
          <Suspense fallback={<div style={{ position: 'absolute', inset: 0, background: 'rgba(13,34,64,0.03)' }} />}>
            <div
              style={{
                position: 'absolute',
                inset: 0,
                zIndex: 0,
                pointerEvents: 'none',
                opacity: 0.35,
                mixBlendMode: 'multiply',
              }}
            >
              <Dithering
                colorBack="#00000000"
                colorFront="#0D2240"
                shape="warp"
                type="4x4"
                speed={isHovered ? 0.5 : 0.15}
                style={{ width: '100%', height: '100%' }}
                minPixelRatio={1}
              />
            </div>
          </Suspense>

          {/* Content */}
          <div
            style={{
              position: 'relative',
              zIndex: 10,
              padding: '3rem 2rem',
              maxWidth: '720px',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
            {/* Pulse badge */}
            <div
              className="fade-up"
              style={{
                marginBottom: '2rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                borderRadius: '9999px',
                border: '1px solid rgba(13,34,64,0.12)',
                background: 'rgba(13,34,64,0.04)',
                padding: '0.4rem 1rem',
                fontSize: '0.78rem',
                fontWeight: 500,
                color: 'var(--navy)',
                letterSpacing: '0.06em',
              }}
            >
              <span style={{ position: 'relative', display: 'flex', width: '8px', height: '8px' }}>
                <span style={{
                  position: 'absolute',
                  inset: 0,
                  borderRadius: '50%',
                  background: 'var(--navy-light)',
                  animation: 'ping 1.5s ease-in-out infinite',
                  opacity: 0.6,
                }} />
                <span style={{ position: 'relative', width: '8px', height: '8px', borderRadius: '50%', background: 'var(--navy-light)' }} />
              </span>
              Open to new work
            </div>

            <h2
              className="fade-up"
              style={{
                fontFamily: "'Abril Fatface', serif",
                fontSize: 'clamp(3rem, 6vw, 5.5rem)',
                lineHeight: 1,
                color: 'var(--navy)',
                marginBottom: '1rem',
                transitionDelay: '0.1s',
              }}
            >
              Let&apos;s make<br />
              <em style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: 'var(--navy-light)', opacity: 0.75 }}>
                something
              </em>{' '}
              flow.
            </h2>

            <p
              className="fade-up"
              style={{
                fontSize: '1rem',
                color: 'var(--muted)',
                marginBottom: '2.5rem',
                fontWeight: 300,
                letterSpacing: '0.02em',
                lineHeight: 1.7,
                transitionDelay: '0.2s',
              }}
            >
              Available for freelance, contract &amp; full-time roles.<br />
              Based in Birmingham, UK — open to remote and hybrid.
            </p>

            <a
              href="mailto:gaanak73@gmail.com"
              className="fade-up"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.75rem',
                padding: '1rem 2.5rem',
                background: 'var(--navy)',
                color: 'var(--offwhite)',
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.85rem',
                fontWeight: 500,
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                borderRadius: '1px',
                textDecoration: 'none',
                transition: 'background 0.2s, transform 0.2s',
                transitionDelay: '0.3s',
              }}
              onMouseEnter={e => { (e.currentTarget as HTMLElement).style.background = 'var(--navy-mid)' }}
              onMouseLeave={e => { (e.currentTarget as HTMLElement).style.background = 'var(--navy)' }}
            >
              Say hello
              <ArrowRight size={16} />
            </a>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          marginTop: '3rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '0 0.5rem',
          borderTop: '1px solid rgba(13,34,64,0.1)',
          paddingTop: '1.5rem',
        }}
      >
        <span style={{ fontSize: '0.75rem', color: 'var(--muted)', letterSpacing: '0.05em' }}>
          Gaana K Raj — Creative &amp; UI/UX Designer
        </span>
        <span style={{ fontSize: '0.75rem', color: 'var(--muted)', letterSpacing: '0.05em' }}>
          Birmingham, UK · 2025
        </span>
      </footer>

      <style>{`
        @keyframes ping {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </section>
  )
}
