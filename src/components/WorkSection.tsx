'use client'
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

interface ProjectCard {
  caseStudyNumber: string
  title: string
  titleBold: string
  titleLight: string
  platforms: string[]
  readTime: string
  stat1Number: string
  stat1Label: string
  stat2Number: string
  stat2Label: string
  link: string
  image?: string
}

const projects: ProjectCard[] = [
  {
    caseStudyNumber: 'Case Study 01',
    title: 'Turning Cravings into Quick Wins',
    titleBold: 'Turning Cravings into',
    titleLight: 'Quick Wins',
    platforms: ['Mobile', 'App', 'UX Research'],
    readTime: '5 min Read',
    stat1Number: '12%',
    stat1Label: 'Increase in app usage',
    stat2Number: '5%',
    stat2Label: 'Users found the experience more impactful',
    link: '/projects/exhale',
    image: '/images/exhale-mockup.png',
  },
  {
    caseStudyNumber: 'Case Study 02',
    title: 'Project Coming Soon',
    titleBold: 'Project',
    titleLight: 'Coming Soon',
    platforms: ['UI Design', 'Web'],
    readTime: '5 min Read',
    stat1Number: '—',
    stat1Label: 'Coming soon',
    stat2Number: '—',
    stat2Label: 'Coming soon',
    link: '#',
    image: undefined,
  },
]

function CardTicker({ readTime }: { readTime: string }) {
  const text = `✦ ${readTime}  ✦ ${readTime}  ✦ ${readTime}  ✦ ${readTime}  ✦ ${readTime}  ✦ ${readTime}  `
  return (
    <div style={{
      position: 'absolute',
      top: 0, left: 0, right: 0,
      height: '28px',
      background: '#F5F2EC',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      zIndex: 3,
    }}>
      <div style={{
        display: 'flex',
        whiteSpace: 'nowrap',
        animation: 'cardTicker 12s linear infinite',
        willChange: 'transform',
      }}>
        {[0, 1].map(i => (
          <span key={i} style={{
            color: '#1B2A4A',
            fontSize: '11px',
            fontWeight: 500,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            fontFamily: "'DM Sans', sans-serif",
            paddingRight: '2rem',
            flexShrink: 0,
          }}>
            {text}
          </span>
        ))}
      </div>
    </div>
  )
}

function ProjectCardComponent({ card, index }: { card: ProjectCard; index: number }) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        borderRadius: '20px',
        overflow: 'hidden',
        border: '1px solid rgba(27,42,74,0.12)',
        transition: 'transform 0.3s ease',
        transform: hovered ? 'scale(1.01)' : 'scale(1)',
        background: '#1B2A4A',
      }}
    >
      {/* ── IMAGE AREA ── */}
      <div style={{
        position: 'relative',
        height: '340px',
        background: '#1B2A4A',
        overflow: 'hidden',
      }}>
        {/* Full-bleed background image — shifted down slightly */}
        {card.image ? (
          <img
            src={card.image}
            alt={card.title}
            style={{
              position: 'absolute',
              inset: 0,
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              objectPosition: 'center 30%',
            }}
          />
        ) : (
          <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingTop: '28px',
          }}>
            <div style={{
              width: '65%',
              height: '75%',
              background: 'rgba(245,242,236,0.05)',
              borderRadius: '12px',
              border: '1px dashed rgba(245,242,236,0.12)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
              <span style={{
                fontSize: '0.65rem',
                color: 'rgba(245,242,236,0.2)',
                letterSpacing: '0.1em',
                textTransform: 'uppercase' as const,
                fontFamily: "'DM Sans', sans-serif",
              }}>
                Project Mockup
              </span>
            </div>
          </div>
        )}

        {/* Ticker strip — pinned to top, always above image */}
        <div style={{ position: 'relative', zIndex: 3 }}>
          <CardTicker readTime={card.readTime} />
        </div>

        {/* INSIGHTS block — bottom left, frosted glass card */}
        <div style={{
          position: 'absolute',
          bottom: '0',
          left: '0',
          zIndex: 2,
          background: 'rgba(15, 25, 45, 0.45)',
          backdropFilter: 'blur(12px)',
          WebkitBackdropFilter: 'blur(12px)',
          borderRadius: '0 12px 0 0',
          border: '1px solid rgba(245,242,236,0.1)',
          borderBottom: 'none',
          borderLeft: 'none',
          padding: '0.75rem 1rem',
        }}>
          <p style={{
            fontSize: '9px',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            color: 'rgba(245,242,236,0.5)',
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 500,
            marginBottom: '0.5rem',
          }}>
            Insights
          </p>
          <div style={{ marginBottom: '0.6rem' }}>
            <div style={{
              fontFamily: "'Abril Fatface', serif",
              fontSize: '1.6rem',
              color: '#F5F2EC',
              lineHeight: 1,
              marginBottom: '0.2rem',
            }}>
              {card.stat1Number}
            </div>
            <div style={{
              fontSize: '10px',
              color: 'rgba(245,242,236,0.7)',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              lineHeight: 1.3,
              maxWidth: '130px',
            }}>
              {card.stat1Label}
            </div>
          </div>
          <div>
            <div style={{
              fontFamily: "'Abril Fatface', serif",
              fontSize: '1.6rem',
              color: '#F5F2EC',
              lineHeight: 1,
              marginBottom: '0.2rem',
            }}>
              {card.stat2Number}
            </div>
            <div style={{
              fontSize: '10px',
              color: 'rgba(245,242,236,0.7)',
              fontFamily: "'DM Sans', sans-serif",
              fontWeight: 300,
              lineHeight: 1.3,
              maxWidth: '130px',
            }}>
              {card.stat2Label}
            </div>
          </div>
        </div>

        {/* "See Project" hover button — centred over image */}
        <div style={{
          position: 'absolute',
          inset: 0,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 4,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.25s ease',
          pointerEvents: hovered ? 'auto' : 'none',
        }}>
          <Link
            href={card.link}
            style={{
              background: '#F5F2EC',
              color: '#1B2A4A',
              borderRadius: '50px',
              padding: '10px 24px',
              fontSize: '0.78rem',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontFamily: "'DM Sans', sans-serif",
              textDecoration: 'none',
              display: 'inline-block',
            }}
          >
            See Project
          </Link>
        </div>
      </div>

      {/* ── INFO AREA ── */}
      <div style={{
        background: '#F5F2EC',
        borderRadius: '0 0 20px 20px',
        padding: '1.5rem',
      }}>
        {/* Case study label */}
        <p style={{
          fontSize: '11px',
          letterSpacing: '0.2em',
          textTransform: 'uppercase',
          color: 'rgba(27,42,74,0.4)',
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
          marginBottom: '0.6rem',
        }}>
          {card.caseStudyNumber}
        </p>

        {/* Title */}
        <h3 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: 'clamp(1.4rem, 2.2vw, 1.9rem)',
          lineHeight: 1.2,
          color: '#1B2A4A',
          marginBottom: '0.85rem',
        }}>
          <span style={{ fontWeight: 700 }}>{card.titleBold} </span>
          <span style={{ fontWeight: 400 }}>{card.titleLight}</span>
        </h3>

        {/* Platform tags */}
        <p style={{
          fontSize: '11px',
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: 'rgba(27,42,74,0.55)',
          fontFamily: "'DM Sans', sans-serif",
          fontWeight: 500,
          marginBottom: '1.25rem',
        }}>
          {card.platforms.map((p, i) => (
            <span key={p}>
              {i > 0 && <span style={{ margin: '0 0.4rem', opacity: 0.4 }}>·</span>}
              {p}
            </span>
          ))}
        </p>

        {/* CTA button — right aligned */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Link
            href={card.link}
            style={{
              display: 'inline-block',
              background: '#1B2A4A',
              color: '#F5F2EC',
              borderRadius: '50px',
              padding: '12px 28px',
              fontSize: '0.78rem',
              fontWeight: 500,
              letterSpacing: '0.08em',
              textTransform: 'uppercase',
              fontFamily: "'DM Sans', sans-serif",
              textDecoration: 'none',
              transition: 'opacity 0.2s ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.8')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            View Case Study →
          </Link>
        </div>
      </div>
    </div>
  )
}

export function WorkSection() {
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
      id="work"
      ref={sectionRef}
      style={{
        background: 'var(--offwhite)',
        minHeight: '100vh',
        padding: '6rem 3rem',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        {/* Header */}
        <div
          className="fade-up"
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-end',
            marginBottom: '3rem',
            borderBottom: '1px solid rgba(13,34,64,0.12)',
            paddingBottom: '2rem',
          }}
        >
          <div>
            <p style={{
              fontSize: '0.7rem',
              letterSpacing: '0.2em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginBottom: '0.5rem',
              display: 'flex',
              alignItems: 'center',
              gap: '0.75rem',
            }}>
              <span style={{ display: 'inline-block', width: '1.5rem', height: '1px', background: 'var(--muted)' }} />
              Selected work
            </p>
            <h2
              style={{
                fontFamily: "'Abril Fatface', serif",
                fontSize: 'clamp(2.5rem, 4vw, 4rem)',
                color: 'var(--navy)',
                lineHeight: 1,
              }}
            >
              Case{' '}
              <em style={{
                fontFamily: "'Playfair Display', serif",
                fontStyle: 'italic',
                color: 'var(--navy-light)',
              }}>
                Studies
              </em>
            </h2>
          </div>
          <span style={{ fontSize: '0.75rem', color: 'var(--muted)', letterSpacing: '0.05em' }}>
            More projects soon
          </span>
        </div>

        {/* Cards grid */}
        <div
          className="fade-up"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '24px',
            transitionDelay: '0.1s',
          }}
        >
          {projects.map((card, i) => (
            <ProjectCardComponent key={card.caseStudyNumber} card={card} index={i} />
          ))}
        </div>
      </div>

      <style>{`
        @keyframes cardTicker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @media (max-width: 768px) {
          #work .cards-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </section>
  )
}
