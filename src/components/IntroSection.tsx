'use client'
import { useEffect, useRef } from 'react'
import { Gravity, MatterBody, GravityRef } from './Gravity'

const SKILLS = [
  { label: 'Empathy',            filled: false, x: '8%',  y: '-5%'  },
  { label: 'User Research',      filled: true,  x: '22%', y: '-15%' },
  { label: 'Wireframing',        filled: false, x: '38%', y: '-4%'  },
  { label: 'Prototyping',        filled: false, x: '54%', y: '-12%' },
  { label: 'User Flow',          filled: false, x: '68%', y: '-3%'  },
  { label: 'Collaboration',      filled: false, x: '80%', y: '-18%' },
  { label: 'Visual & UI',        filled: false, x: '88%', y: '-8%'  },
  { label: 'Information Design', filled: false, x: '15%', y: '-25%' },
  { label: 'Critical Thinking',  filled: true,  x: '42%', y: '-22%' },
  { label: 'Communication',      filled: false, x: '62%', y: '-28%' },
  { label: 'Accessibility',      filled: true,  x: '76%', y: '-20%' },
  { label: 'Figma',              filled: true,  x: '90%', y: '-30%' },
]

const IconDesigning = () => (
  <svg width="1em" height="1em" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle', margin: '0 4px', position: 'relative', top: '-0.05em' }}>
    <polygon points="24,4 34,22 24,28 14,22" fill="rgba(27,42,74,0.08)" stroke="#1B2A4A" strokeWidth="2.2" strokeLinejoin="round"/>
    <line x1="24" y1="22" x2="24" y2="28" stroke="#1B2A4A" strokeWidth="1.8"/>
    <rect x="17" y="0" width="14" height="8" rx="2" fill="none" stroke="#1B2A4A" strokeWidth="2.2"/>
    <circle cx="24" cy="30" r="3" fill="#1B2A4A"/>
  </svg>
)

const IconExperience = () => (
  <svg width="1em" height="1em" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle', margin: '0 4px', position: 'relative', top: '-0.05em' }}>
    <circle cx="24" cy="14" r="9" fill="none" stroke="#1B2A4A" strokeWidth="2.2"/>
    <path d="M10,40 C10,30 38,30 38,40" fill="none" stroke="#1B2A4A" strokeWidth="2.2" strokeLinecap="round"/>
    <polygon points="36,6 38,11 43,11 39,14 41,19 36,16 31,19 33,14 29,11 34,11" fill="#1B2A4A"/>
  </svg>
)

const IconBrand = () => (
  <svg width="1em" height="1em" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle', margin: '0 4px', position: 'relative', top: '-0.05em' }}>
    <polyline points="8,28 8,16 16,22 24,8 32,22 40,16 40,28" fill="none" stroke="#1B2A4A" strokeWidth="2.3" strokeLinejoin="round" strokeLinecap="round"/>
    <line x1="8" y1="28" x2="40" y2="28" stroke="#1B2A4A" strokeWidth="2.3" strokeLinecap="round"/>
    <polygon points="24,34 14,42 24,46 34,42" fill="none" stroke="#1B2A4A" strokeWidth="2.2" strokeLinejoin="round"/>
    <line x1="24" y1="34" x2="24" y2="46" stroke="#1B2A4A" strokeWidth="1.4" strokeLinecap="round"/>
    <line x1="14" y1="40" x2="34" y2="40" stroke="#1B2A4A" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
)

const IconDigital = () => (
  <svg width="1em" height="1em" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'inline-block', verticalAlign: 'middle', margin: '0 4px', position: 'relative', top: '-0.05em' }}>
    <rect x="2" y="8" width="44" height="32" rx="4" fill="none" stroke="#1B2A4A" strokeWidth="2.2"/>
    <line x1="2" y1="16" x2="46" y2="16" stroke="#1B2A4A" strokeWidth="2"/>
    <circle cx="8" cy="12" r="2" fill="#1B2A4A"/>
    <circle cx="15" cy="12" r="2" fill="#1B2A4A"/>
    <polygon points="18,24 18,38 24,32 27,38 30,37 27,30 34,30" fill="#1B2A4A"/>
  </svg>
)

export function IntroSection() {
  const gravityRef = useRef<GravityRef>(null)
  const sectionRef = useRef<HTMLDivElement>(null)
  const started = useRef(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting && !started.current) {
            started.current = true
            setTimeout(() => gravityRef.current?.start(), 200)
          }
        })
      },
      { threshold: 0.15 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      style={{ background: 'var(--offwhite)', padding: '5rem 3rem 0' }}
    >
      {/* Intro text — centred, larger, bold */}
      <p style={{
        fontFamily: "'Playfair Display', serif",
        fontSize: 'clamp(40px, 6vw, 72px)',
        lineHeight: 1.0,
        fontWeight: 500,
        color: '#1B2A4A',
        maxWidth: '1000px',
        margin: '0 auto',
        textAlign: 'center',
      }}>
        Hi, I am Gaana{' '}
        <img
          src="/images/peace.png"
          alt="peace"
          style={{ display: 'inline-block', height: '0.85em', width: '0.85em', objectFit: 'contain', verticalAlign: 'middle', position: 'relative', top: '-0.05em' }}
        />
        , practicing design since{' '}
        <span style={{
          display: 'inline-block',
          border: '2px solid #1B2A4A',
          borderRadius: '50px',
          padding: '2px 18px',
          lineHeight: 'inherit',
          verticalAlign: 'baseline',
          fontWeight: 700,
        }}>
          2022
        </span>
        , focused on designing{' '}
        <IconDesigning />
        {' '}and building digital products{' '}
        <IconDigital />
        , experiences{' '}
        <IconExperience />
        {' '}and brands{' '}
        <IconBrand />
        .
      </p>

      {/* Skills label */}
      <p style={{
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '15px',
        fontWeight: 400,
        color: '#1B2A4A',
        opacity: 0.55,
        maxWidth: '1000px',
        margin: '2.5rem auto 0',
        textAlign: 'center',
        letterSpacing: '0.02em',
      }}>
        with my skills in:
      </p>

      {/* Physics pills container */}
      <div style={{
        position: 'relative',
        width: '100%',
        height: '320px',
        overflow: 'hidden',
      }}>
        <Gravity
          ref={gravityRef}
          gravity={{ x: 0, y: 1 }}
          addTopWall={false}
          autoStart={false}
          resetOnResize={true}
          style={{ background: 'transparent' }}
        >
          {SKILLS.map(skill => (
            <MatterBody
              key={skill.label}
              x={skill.x}
              y={skill.y}
              bodyType="rectangle"
              isDraggable={true}
              matterBodyOptions={{
                friction: 0.5,
                restitution: 0.3,
                density: 0.002,
                isStatic: false,
              }}
            >
              <div style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '17px',
                fontWeight: 500,
                whiteSpace: 'nowrap',
                padding: '14px 28px',
                borderRadius: '50px',
                border: skill.filled ? 'none' : '1.5px solid #1B2A4A',
                background: skill.filled ? '#1B2A4A' : 'transparent',
                color: skill.filled ? '#F5F2EC' : '#1B2A4A',
                userSelect: 'none',
              }}>
                {skill.label}
              </div>
            </MatterBody>
          ))}
        </Gravity>
      </div>
    </section>
  )
}
