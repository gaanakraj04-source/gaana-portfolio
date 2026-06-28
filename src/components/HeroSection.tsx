'use client'
import { useEffect, useRef } from 'react'
import { Waves } from './Waves'

export function HeroSection() {
  const contentRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const els = contentRef.current?.querySelectorAll('.fade-up')
    els?.forEach((el, i) => {
      setTimeout(() => el.classList.add('visible'), i * 120)
    })
  }, [])

  const name = 'GAANA K RAJ'
  const letters = name.split('')

  return (
    <section
      id="home"
      style={{
        position: 'relative',
        minHeight: '100vh',
        background: 'var(--offwhite)',
        overflow: 'hidden',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
      }}
    >
      {/* Waves animation — completely untouched */}
      <Waves
        strokeColor="rgba(13,34,64,0.12)"
        backgroundColor="transparent"
      />

      {/* Hero content */}
      <div
        ref={contentRef}
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'flex-end',
          height: '100vh',
          paddingBottom: '6rem',
          paddingTop: '8rem',
        }}
      >
        {/* Status label */}
        <p
          className="fade-up"
          style={{
            fontSize: '0.72rem',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            marginBottom: '20px',
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            transitionDelay: '0s',
          }}
        >
          <span style={{ display: 'inline-block', width: '2rem', height: '1px', background: 'var(--muted)' }} />
          Available for new projects
          <span style={{ display: 'inline-block', width: '2rem', height: '1px', background: 'var(--muted)' }} />
        </p>

        {/* Circular profile photo */}
        <div
          className="fade-up"
          style={{
            marginBottom: '16px',
            transitionDelay: '0.08s',
          }}
        >
          <img
            src="/images/profile.jpg"
            alt="Gaana K Raj"
            style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              border: '2px solid #0D2240',
              objectFit: 'cover',
              display: 'block',
            }}
          />
        </div>

        {/* Name — billboard scale, letter animation */}
        <h1
          aria-label="GAANA K RAJ"
          style={{
            fontFamily: "'Abril Fatface', serif",
            fontSize: 'clamp(3rem, 10vw, 9rem)',
            lineHeight: 1,
            color: 'var(--navy)',
            letterSpacing: '-0.01em',
            marginBottom: '16px',
            display: 'flex',
            flexWrap: 'nowrap',
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          {letters.map((letter, i) => (
            <span
              key={i}
              style={{
                display: 'inline-block',
                opacity: 0,
                transform: 'translateY(-120px)',
                animation: `letterDrop 0.6s cubic-bezier(0.22, 1, 0.36, 1) forwards`,
                animationDelay: `${0.1 + i * 0.035}s`,
                whiteSpace: letter === ' ' ? 'pre' : 'normal',
              }}
            >
              {letter === ' ' ? '\u00A0' : letter}
            </span>
          ))}
        </h1>

        {/* Subtitle */}
        <p
          className="fade-up"
          style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '1rem',
            fontWeight: 300,
            color: 'var(--muted)',
            letterSpacing: '0.05em',
            marginBottom: '28px',
            transitionDelay: '0.55s',
            textAlign: 'center',
          }}
        >
          Creative Product Designer
        </p>

        {/* CTA Button */}
        <a
          className="fade-up"
          href="#contact"
          style={{
            display: 'inline-block',
            background: 'var(--navy)',
            color: 'var(--offwhite)',
            borderRadius: '50px',
            padding: '14px 36px',
            fontFamily: "'DM Sans', sans-serif",
            fontSize: '0.78rem',
            fontWeight: 500,
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            textDecoration: 'none',
            border: 'none',
            transitionDelay: '0.35s',
          }}
          onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
          onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
        >
          Get in Touch →
        </a>

        {/* Quote — right side, untouched */}
        <p
          className="fade-up"
          style={{
            position: 'absolute',
            right: '3rem',
            bottom: '6rem',
            fontFamily: "'Playfair Display', serif",
            fontStyle: 'italic',
            fontSize: '1.05rem',
            color: 'var(--navy-mid)',
            opacity: 0.55,
            textAlign: 'right',
            maxWidth: '260px',
            lineHeight: 1.6,
            transitionDelay: '0.5s',
          }}
        >
          "Design should flow like water — effortless, purposeful, alive."
        </p>

        {/* Scroll hint — untouched */}
        <div
          className="fade-up"
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.5rem',
            color: 'var(--muted)',
            fontSize: '0.7rem',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            opacity: 0.45,
            transitionDelay: '0.7s',
          }}
        >
          <div style={{
            width: '1px',
            height: '3rem',
            background: 'linear-gradient(to bottom, var(--navy), transparent)',
            animation: 'scrollPulse 2s ease-in-out infinite',
          }} />
          <span>scroll</span>
        </div>
      </div>

      <style>{`
        @keyframes letterDrop {
          0%   { opacity: 0; transform: translateY(-120px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        @keyframes scrollPulse {
          0%, 100% { opacity: 0.3; }
          50%       { opacity: 1; }
        }
        .fade-up {
          opacity: 0;
          transform: translateY(20px);
          transition: opacity 0.7s ease, transform 0.7s ease;
        }
        .fade-up.visible {
          opacity: 1;
          transform: translateY(0);
        }
      `}</style>
    </section>
  )
}
