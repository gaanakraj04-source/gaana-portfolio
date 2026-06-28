'use client'
import { useEffect, useState, useRef } from 'react'
import Link from 'next/link'

const NAV_ITEMS = [
  { label: 'Overview', id: 'overview' },
  { label: 'Research', id: 'research' },
  { label: 'Define', id: 'define' },
  { label: 'Design', id: 'design' },
  { label: 'Testing', id: 'testing' },
  { label: 'Outcomes', id: 'outcomes' },
]

function MarqueeStrip({ text, bgColor = '#1B2A4A', textColor = '#F5F2EC', speed = 40 }: { text: string; bgColor?: string; textColor?: string; speed?: number }) {
  const repeated = `${text}   ${text}   ${text}   `
  return (
    <div style={{ background: bgColor, height: '44px', overflow: 'hidden', display: 'flex', alignItems: 'center', width: '100%' }}>
      <div
        style={{ display: 'flex', whiteSpace: 'nowrap', animation: `marqueeScroll ${speed}s linear infinite`, willChange: 'transform' }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.animationPlayState = 'paused' }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.animationPlayState = 'running' }}
      >
        {[0, 1].map(i => (
          <span key={i} style={{ color: textColor, fontSize: '13px', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif", paddingRight: '4rem', flexShrink: 0 }}>
            {repeated}
          </span>
        ))}
      </div>
    </div>
  )
}

function SLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p style={{
      fontSize: '1.1rem',
      letterSpacing: '0.18em',
      textTransform: 'uppercase',
      fontWeight: 700,
      color: light ? 'rgba(245,242,236,0.85)' : '#1B2A4A',
      display: 'flex',
      alignItems: 'center',
      gap: '0.85rem',
      fontFamily: "'DM Sans', sans-serif",
    }}>
      <span style={{ display: 'inline-block', width: '2rem', height: '2px', background: light ? 'rgba(245,242,236,0.5)' : '#1B2A4A', borderRadius: '1px', flexShrink: 0 }} />
      {children}
    </p>
  )
}

function RDiv({ from, to, flip = false }: { from: string; to: string; flip?: boolean }) {
  return (
    <div style={{ background: to, lineHeight: 0 }}>
      <svg viewBox="0 0 1440 60" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '50px', transform: flip ? 'scaleX(-1)' : undefined }}>
        <path d="M0,30 C200,8 400,52 600,30 C800,8 1000,52 1200,30 C1320,16 1380,42 1440,30 L1440,0 L0,0 Z" fill={from} />
      </svg>
    </div>
  )
}

function PhoneMockup({ src, label }: { src?: string; label: string }) {
  if (!src) return (
    <div style={{ width: "700px", margin: "0 auto", aspectRatio: '9/19', background: 'rgba(27,42,74,0.07)', borderRadius: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px dashed rgba(27,42,74,0.15)' }}>
      <span style={{ fontSize: '0.65rem', color: 'rgba(27,42,74,0.3)', textTransform: 'uppercase', textAlign: 'center', padding: '0 1rem' }}>{label}</span>
    </div>
  )
  return (
    <div style={{ width: "700px", margin: "0 auto" }}>
      <img src={src} alt={label} style={{ width: '100%', display: 'block' }} />
    </div>
  )
}

function Callout({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', padding: '0.75rem 1rem', background: '#F5F2EC', borderLeft: '2px solid #1B2A4A', borderRadius: '0 4px 4px 0' }}>
      <span style={{ color: '#1B2A4A', opacity: 0.4, flexShrink: 0, marginTop: '1px', fontSize: '0.85rem' }}>→</span>
      <p style={{ fontSize: '0.85rem', lineHeight: 1.6, color: 'rgba(27,42,74,0.75)', fontWeight: 300, fontFamily: "'DM Sans', sans-serif", margin: 0 }}>{text}</p>
    </div>
  )
}

function MoreWorkCard({ label, title, tags, readTime, bg, textColor, hovered, onEnter, onLeave }: { label: string; title: string; tags: string[]; readTime: string; bg: string; textColor: string; hovered: boolean; onEnter: () => void; onLeave: () => void }) {
  const isLight = textColor === '#F5F2EC'
  const tagBorder = isLight ? 'rgba(245,242,236,0.3)' : 'rgba(27,42,74,0.25)'
  const tagColor = isLight ? 'rgba(245,242,236,0.7)' : 'rgba(27,42,74,0.6)'
  const badgeBg = isLight ? 'rgba(245,242,236,0.12)' : 'rgba(27,42,74,0.08)'
  return (
    <div onMouseEnter={onEnter} onMouseLeave={onLeave} style={{ background: bg, borderRadius: '20px', minHeight: '320px', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'space-between', position: 'relative', overflow: 'hidden', transition: 'transform 0.3s ease, box-shadow 0.3s ease', transform: hovered ? 'scale(1.02)' : 'scale(1)', boxShadow: hovered ? '0 20px 56px rgba(27,42,74,0.18)' : '0 4px 20px rgba(27,42,74,0.08)', cursor: 'pointer' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <p style={{ fontSize: '0.62rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: tagColor, fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }}>{label}</p>
        <span style={{ fontSize: '0.68rem', letterSpacing: '0.06em', color: tagColor, background: badgeBg, padding: '0.3rem 0.75rem', borderRadius: '9999px', fontFamily: "'DM Sans', sans-serif" }}>{readTime}</span>
      </div>
      <div style={{ flex: 1, margin: '1.5rem 0', background: isLight ? 'rgba(245,242,236,0.08)' : 'rgba(27,42,74,0.08)', borderRadius: '10px', minHeight: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ fontSize: '0.6rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: tagColor, opacity: 0.5 }}>Thumbnail coming soon</span>
      </div>
      <div>
        <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.4rem, 2.5vw, 2rem)', fontWeight: 700, color: textColor, lineHeight: 1.2, marginBottom: '1rem' }}>{title}</h3>
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          {tags.map(tag => <span key={tag} style={{ fontSize: '0.68rem', letterSpacing: '0.06em', color: tagColor, border: `1px solid ${tagBorder}`, padding: '0.25rem 0.7rem', borderRadius: '9999px', fontFamily: "'DM Sans', sans-serif" }}>{tag}</span>)}
        </div>
      </div>
      <div style={{ position: 'absolute', bottom: '2rem', right: '2rem', fontSize: '1.2rem', color: textColor, opacity: hovered ? 0.9 : 0.3, transition: 'opacity 0.3s ease, transform 0.3s ease', transform: hovered ? 'translate(4px, -4px)' : 'translate(0,0)' }}>↗</div>
    </div>
  )
}

// ── USER FLOW DIAGRAM — styled, static, navy ──
function UserFlowDiagram() {
  const sections = [
    {
      num: '01', label: 'Home / Dashboard',
      features: ['Daily Check-in', 'Dashboard Stats', 'Profile'],
      outputs: ['Days / Weeks Spent'],
    },
    {
      num: '02', label: 'Game Zone',
      features: ['Game Bar', 'Daily Challenges', 'One Time Challenge', 'Leaderboard'],
      outputs: ['Money Saved', 'Streak Score'],
    },
    {
      num: '03', label: 'Support / Aid',
      features: ['Breathe', 'Journey', 'Journal', 'Calm Music'],
      outputs: ['Sober Days', 'Smoke Avoided', 'Time Spent'],
    },
    {
      num: '04', label: 'Rewards / Badges',
      features: ['Unlock', 'Lock', 'Win Badges'],
      outputs: ['Achievements'],
    },
  ]

  return (
    <div style={{ background: '#1B2A4A', borderRadius: '16px', padding: '3rem 2.5rem', fontFamily: "'DM Sans', sans-serif" }}>

      {/* Top flow */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0', marginBottom: '2.5rem', flexWrap: 'wrap', rowGap: '0.5rem' }}>
        {['Splash Screen', 'Onboarding', 'Sign Up / Login', 'Personalisation Questions'].map((step, i) => (
          <div key={step} style={{ display: 'flex', alignItems: 'center' }}>
            <div style={{
              padding: '0.55rem 1.1rem',
              border: `1.5px solid ${i === 0 ? '#E2F164' : 'rgba(245,242,236,0.35)'}`,
              borderRadius: i === 0 ? '9999px' : '6px',
              color: i === 0 ? '#E2F164' : 'rgba(245,242,236,0.85)',
              fontSize: '0.72rem',
              fontWeight: 600,
              letterSpacing: '0.08em',
              textTransform: 'uppercase' as const,
              whiteSpace: 'nowrap' as const,
            }}>{step}</div>
            {i < 3 && <div style={{ padding: '0 0.5rem', color: 'rgba(245,242,236,0.3)', fontSize: '0.8rem' }}>→</div>}
          </div>
        ))}
      </div>

      {/* Down arrow to sections */}
      <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <div style={{ width: '1px', height: '2rem', background: 'rgba(245,242,236,0.2)' }} />
          <div style={{ color: 'rgba(245,242,236,0.3)', fontSize: '0.8rem' }}>↓</div>
        </div>
      </div>

      {/* 4 columns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1rem' }}>
        {sections.map(({ num, label, features, outputs }) => (
          <div key={num} style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>

            {/* Section header box */}
            <div style={{ padding: '0.85rem 1rem', border: '1.5px solid rgba(245,242,236,0.4)', borderRadius: '8px', textAlign: 'center' as const }}>
              <div style={{ color: 'rgba(245,242,236,0.4)', fontSize: '0.62rem', marginBottom: '0.25rem', letterSpacing: '0.1em' }}>{num}</div>
              <div style={{ color: '#F5F2EC', fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase' as const, lineHeight: 1.3 }}>{label}</div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', color: 'rgba(245,242,236,0.25)', fontSize: '0.75rem' }}>↓</div>

            {/* Features */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {features.map(f => (
                <div key={f} style={{ padding: '0.4rem 0.7rem', border: '1px solid rgba(245,242,236,0.15)', borderRadius: '4px', color: 'rgba(245,242,236,0.65)', fontSize: '0.64rem', letterSpacing: '0.02em' }}>{f}</div>
              ))}
            </div>

            <div style={{ display: 'flex', justifyContent: 'center', color: 'rgba(245,242,236,0.25)', fontSize: '0.75rem' }}>↓</div>

            {/* Outputs */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
              {outputs.map(o => (
                <div key={o} style={{ padding: '0.4rem 0.7rem', border: '1px solid #E2F164', borderRadius: '4px', color: '#E2F164', fontSize: '0.62rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase' as const }}>{o}</div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Footer note */}
      <div style={{ marginTop: '2rem', paddingTop: '1.5rem', borderTop: '1px solid rgba(245,242,236,0.1)', textAlign: 'center' as const }}>
        <span style={{ fontSize: '0.65rem', color: 'rgba(245,242,236,0.3)', letterSpacing: '0.12em', textTransform: 'uppercase' as const, fontStyle: 'italic' }}>All sections feed into the unified dashboard</span>
      </div>
    </div>
  )
}

const body: React.CSSProperties = { fontSize: '1rem', lineHeight: 1.85, color: 'rgba(27,42,74,0.68)', fontWeight: 300, fontFamily: "'DM Sans', sans-serif" }
const h2st: React.CSSProperties = { fontFamily: "'Playfair Display', serif", fontSize: '1.35rem', fontWeight: 700, color: '#1B2A4A', marginBottom: '1rem', marginTop: '1.5rem' }
const strongSt: React.CSSProperties = { fontWeight: 500, color: '#1B2A4A' }
const emSt: React.CSSProperties = { fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: 'rgba(27,42,74,0.55)' }

const decisions = [
  { num: '01', name: 'Panic Flow Architecture', body: 'Scrapped the standard tab navigation. Built a "panic flow" where the Game Zone is always one tap away. Wireframes proved users under craving stress cannot navigate menus.' },
  { num: '02', name: 'Visceral Dark Mode UI', body: 'Chose dark backgrounds with neon accents over clinical white. Mimics an arcade atmosphere — intentionally non-medical. Backed by research: graphic health imagery boosts quit attempts by 20%.' },
  { num: '03', name: 'Card Sorting → Separated Game Zone', body: 'Initial IA had Game Zone features mixed into Home. Card sorting with users revealed the "Home vs Game Zone" distinction was unclear. Separated into a dedicated sacred space.' },
  { num: '04', name: 'Goal Gradient Effect in Progress UI', body: 'Designed progress bars to show the finish line feels close. Deliberately accelerates visual momentum near the end of the craving timer — grounded in behavioural psychology research.' },
]

const features = [
  { num: '01', name: 'Game Zone', src: '/images/exhale-gamezone.jpg', desc: 'A dedicated space for craving distraction, reachable in one tap from anywhere in the app.', callouts: ['Single-tap access — bottom nav Game Zone icon is always visible', 'Lung-cleaning game uses visceral imagery to trigger emotional response', 'Goal Gradient Effect: progress bar fills as craving timer counts down'] },
  { num: '02', name: 'Dashboard', src: '/images/exhale-dashboard.png', desc: 'Tracks "Sober Days", money saved, and streak — metrics that feel meaningful, not clinical.', callouts: ['"Life Gained" renamed to "Sober Days" after usability testing — felt more honest', 'Money saved shown in £ — financial motivation was the #2 quit driver in research'] },
  { num: '03', name: 'Support Tab', src: '/images/exhale-support.png', desc: 'Breathing exercises and community support available in one tap during a triggered moment.', callouts: ['Support content separated from Game Zone — different emotional states need different spaces', 'Push notifications remind users to complete daily challenge for streak continuity'] },
]

const moreWork = [
  { label: 'Case Study 02', title: 'Project name coming soon', tags: ['UX Research', 'Mobile'], readTime: '5 min read', bg: '#1B2A4A', textColor: '#F5F2EC' },
  { label: 'Case Study 03', title: 'Project name coming soon', tags: ['UI Design', 'Web'], readTime: '4 min read', bg: '#C9B99A', textColor: '#1B2A4A' },
]

export default function ExhalePage() {
  const [activeSection, setActiveSection] = useState('overview')
  const [navVisible, setNavVisible] = useState(false)
  const [scrollIndicator, setScrollIndicator] = useState(true)
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [hoveredWork, setHoveredWork] = useState<number | null>(null)
  const compScrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const sectionEls = NAV_ITEMS.map(({ id }) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver(
      entries => { entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id) }) },
      { threshold: 0.15, rootMargin: '-10% 0px -60% 0px' }
    )
    sectionEls.forEach(el => el && observer.observe(el))
    const onScroll = () => { setNavVisible(window.scrollY > window.innerHeight * 0.5); setScrollIndicator(window.scrollY < 80) }
    window.addEventListener('scroll', onScroll)
    return () => { observer.disconnect(); window.removeEventListener('scroll', onScroll) }
  }, [])

  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }

  const problemCards = [
    { num: '01', heading: 'Traditional apps are passive trackers', desc: 'They count days but go silent when a craving peaks — offering no active support in the critical moment.' },
    { num: '02', heading: 'Young adults need immediate distraction', desc: 'Not a dashboard — a ritual replacement in under 5 seconds. The window is 30–90 seconds. Nothing exists for it.' },
    { num: '03', heading: 'Social pressure and stress trigger relapses', desc: '33% of relapses happen in social contexts, 23% from career anxiety. Triggers are emotional, not informational.' },
    { num: '04', heading: 'Gamification preference is high but unmet', desc: '55% of surveyed users preferred gamified quit tools — yet none existed on the market at the time of research.' },
  ]

  return (
    <div style={{ background: '#F5F2EC', minHeight: '100vh', color: '#1B2A4A', fontFamily: "'DM Sans', sans-serif" }}>

      {/* TOP NAV */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.25rem 3rem', background: 'rgba(245,242,236,0.9)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(27,42,74,0.07)' }}>
        <Link href="/" style={{ fontFamily: "'Abril Fatface', serif", fontSize: '1.3rem', color: '#1B2A4A', textDecoration: 'none' }}>GKR</Link>
        <Link href="/#work" style={{ fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#1B2A4A', textDecoration: 'none', opacity: 0.45 }}>← All work</Link>
      </nav>

      {/* STICKY BOTTOM NAV */}
      <div style={{ position: 'fixed', bottom: '1.75rem', left: '50%', transform: 'translateX(-50%)', zIndex: 200, opacity: navVisible ? 1 : 0, pointerEvents: navVisible ? 'auto' : 'none', transition: 'opacity 0.4s ease' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', background: 'rgba(27,42,74,0.9)', backdropFilter: 'blur(16px)', borderRadius: '9999px', padding: '0.35rem 0.45rem', boxShadow: '0 8px 32px rgba(27,42,74,0.3)', border: '1px solid rgba(245,242,236,0.08)' }}>
          {NAV_ITEMS.map(({ label, id }) => (
            <button key={id} onClick={() => scrollTo(id)} style={{ background: activeSection === id ? 'rgba(245,242,236,0.14)' : 'transparent', border: 'none', borderRadius: '9999px', padding: '0.4rem 0.9rem', color: activeSection === id ? '#F5F2EC' : 'rgba(245,242,236,0.42)', fontSize: '0.7rem', fontWeight: activeSection === id ? 500 : 400, letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer', transition: 'all 0.25s ease', fontFamily: "'DM Sans', sans-serif", whiteSpace: 'nowrap', outline: 'none' }}>
              {label}
            </button>
          ))}
        </div>
      </div>

      {/* ══ HERO ══ */}
      <section style={{ maxHeight: '90vh', minHeight: '70vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '7rem 3rem 3rem', position: 'relative', overflow: 'hidden', background: 'linear-gradient(155deg, #F5F2EC 55%, #E9EDF6 100%)' }}>
        <style>{`
          @keyframes slideInRight {
            from { opacity: 0; transform: translateY(-50%) translateX(100px); }
            to   { opacity: 1; transform: translateY(-50%) translateX(0); }
          }
        `}</style>

        {/* Watermark */}
        <div style={{ position: 'absolute', bottom: '-2rem', right: '-1rem', fontFamily: "'Abril Fatface', serif", fontSize: 'clamp(8rem, 22vw, 18rem)', color: 'rgba(27,42,74,0.035)', letterSpacing: '-0.04em', lineHeight: 1, userSelect: 'none', pointerEvents: 'none' }}>Exhale</div>

        {/* Main screens — slides in from right */}
        <div style={{ position: 'absolute', top: '50%', right: '-2rem', zIndex: 2, width: '52%', animation: 'slideInRight 0.9s cubic-bezier(0.22, 1, 0.36, 1) 0.1s both' }}>
          <img src="/images/exhale-main-screens.png" alt="Exhale app main screens" style={{ width: '100%', display: 'block', filter: 'drop-shadow(0 24px 48px rgba(27,42,74,0.15))' }} />
        </div>

        <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%', position: 'relative', zIndex: 3 }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(27,42,74,0.4)', marginBottom: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ display: 'inline-block', width: '2rem', height: '1px', background: 'rgba(27,42,74,0.3)' }} />
            UI/UX Case Study · 2024
          </p>
          <h1 style={{ fontFamily: "'Abril Fatface', serif", fontSize: 'clamp(80px, 12vw, 140px)', lineHeight: 0.92, color: '#1B2A4A', marginBottom: '1rem', letterSpacing: '-0.03em' }}>Exhale</h1>
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 'clamp(1.1rem, 2.2vw, 1.6rem)', color: 'rgba(27,42,74,0.5)', marginBottom: '2rem', fontWeight: 400 }}>Turning cravings into quick wins</p>
          <p style={{ ...body, maxWidth: '480px', marginBottom: '2.5rem' }}>Led user research and interaction design for a mobile app that uses behavioural science and gamification to help young adults (18–25) quit smoking — replacing the smoking ritual with an interactive "lung-cleaning" game that activates the moment a craving peaks.</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, auto)', border: '1px solid rgba(27,42,74,0.12)', maxWidth: '680px', background: 'rgba(27,42,74,0.06)' }}>
            {[{ label: 'Timeline', value: '3 Weeks' }, { label: 'Role', value: 'UI/UX Designer' }, { label: 'Team', value: 'Group Project' }, { label: 'Tools', value: 'Figma · Maze' }].map(({ label, value }, i) => (
              <div key={label} style={{ padding: '1rem 1.25rem', background: '#F5F2EC', borderRight: i < 3 ? '1px solid rgba(27,42,74,0.1)' : 'none' }}>
                <div style={{ fontSize: '0.58rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(27,42,74,0.38)', marginBottom: '0.35rem' }}>{label}</div>
                <div style={{ fontFamily: "'Playfair Display', serif", fontSize: '0.92rem', fontWeight: 700, color: '#1B2A4A' }}>{value}</div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: '1.5rem', right: '3rem', display: 'flex', alignItems: 'center', gap: '0.6rem', opacity: scrollIndicator ? 0.4 : 0, transition: 'opacity 0.5s ease', zIndex: 3 }}>
          <span style={{ fontSize: '0.68rem', letterSpacing: '0.14em', textTransform: 'uppercase', color: '#1B2A4A' }}>Scroll to explore</span>
          <span style={{ fontSize: '1rem', color: '#1B2A4A' }}>↓</span>
        </div>
      </section>

      <MarqueeStrip text="BEHAVIOURAL SCIENCE ✦ GAMIFICATION ✦ UX RESEARCH ✦ VISCERAL DESIGN ✦ INTERACTION DESIGN ✦" bgColor="#1B2A4A" textColor="#F5F2EC" speed={40} />

      {/* ══ CONTEXT ══ */}
      <section id="overview" style={{ padding: '6rem 3rem', background: '#F5F2EC' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SLabel>Context</SLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1px 1fr', gap: "2rem", marginTop: '3rem', alignItems: 'start' }}>
            <div>
              <p style={{ fontSize: '0.68rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600, color: '#1B2A4A', marginBottom: '1.25rem' }}>Who are we designing for?</p>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'rgba(27,42,74,0.72)', fontWeight: 300 }}>Young adults aged <strong style={strongSt}>18–25 who smoke and want to quit</strong>, but find existing cessation apps too clinical, passive, and boring. They need immediate relief during a craving — not a tracker.</p>
            </div>
            <div style={{ background: 'rgba(27,42,74,0.1)', minHeight: '120px', width: '1px' }} />
            <div>
              <p style={{ fontSize: '0.68rem', letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600, color: '#1B2A4A', marginBottom: '1.25rem' }}>What are we solving?</p>
              <p style={{ fontSize: '1.05rem', lineHeight: 1.85, color: 'rgba(27,42,74,0.72)', fontWeight: 300 }}>Traditional apps count sober days but go silent when a craving peaks. There's <strong style={strongSt}>no tool that activates in the 30–90 seconds</strong> of a craving moment. Exhale fills this gap with an interactive "lung-cleaning" game triggered instantly from the home screen.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ PROBLEM CARDS ══ */}
      <section style={{ padding: '0 3rem 6rem', background: '#F5F2EC' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SLabel>The Problem</SLabel>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginTop: '2rem' }}>
            {problemCards.map(({ num, heading, desc }, i) => (
              <div key={num} onMouseEnter={() => setHoveredCard(i)} onMouseLeave={() => setHoveredCard(null)}
                style={{ background: '#1B2A4A', borderRadius: '16px', padding: '2.25rem 2rem', position: 'relative', overflow: 'hidden', transition: 'transform 0.25s ease, box-shadow 0.25s ease', transform: hoveredCard === i ? 'translateY(-4px)' : 'translateY(0)', boxShadow: hoveredCard === i ? '0 16px 48px rgba(27,42,74,0.22)' : '0 4px 16px rgba(27,42,74,0.1)' }}>
                <div style={{ position: 'absolute', top: '1rem', right: '1.5rem', fontFamily: "'Abril Fatface', serif", fontSize: '5rem', color: 'rgba(245,242,236,0.06)', lineHeight: 1, userSelect: 'none', fontStyle: 'italic' }}>{num}</div>
                <div style={{ position: 'relative', zIndex: 2 }}>
                  <p style={{ fontSize: '0.62rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'rgba(245,242,236,0.35)', marginBottom: '1rem' }}>{num}</p>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1rem, 1.5vw, 1.2rem)', fontWeight: 700, color: '#F5F2EC', lineHeight: 1.35, marginBottom: '0.85rem' }}>{heading}</h3>
                  <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: 'rgba(245,242,236,0.58)', fontWeight: 300 }}>{desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <RDiv from="#F5F2EC" to="#EEF0F7" />

      {/* ══ RESEARCH ══ */}
      <section id="research" style={{ padding: '6rem 0 6rem 0', background: '#EEF0F7' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SLabel>Research</SLabel>
          <h2 style={{ ...h2st, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', marginTop: '1rem', marginBottom: '2.5rem' }}>Understanding the <em style={emSt}>user</em></h2>

          {/* Survey — text left, image right */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem', alignItems: 'center', marginBottom: '4rem' }}>
            <div>
              <p style={{ fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(27,42,74,0.4)', marginBottom: '1rem' }}>Survey Results</p>
              <p style={body}>We surveyed <strong style={strongSt}>47 young adults (18–25)</strong> and ran empathy mapping sessions to uncover why traditional cessation apps fail this demographic.</p>
              <p style={{ ...body, marginTop: '1rem' }}>Key craving triggers: social contexts (33%), career anxiety (23%), boredom (21%), and habit cues (23%).</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem', marginTop: '1.75rem' }}>
                {['Social pressure · 33%', 'Career anxiety · 23%', 'Boredom · 21%', 'Habit cues · 23%'].map(tag => (
                  <span key={tag} style={{ background: 'rgba(27,42,74,0.08)', color: '#1B2A4A', padding: '0.35rem 0.85rem', borderRadius: '9999px', fontSize: '0.76rem', fontWeight: 500 }}>{tag}</span>
                ))}
              </div>
            </div>
            <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(27,42,74,0.12)' }}>
              <img src="/images/exhale-survey.png" alt="Survey Results" style={{ width: '100%', display: 'block' }} />
            </div>
          </div>

          {/* Personas */}
          <div style={{ marginBottom: '4rem' }}>
            <p style={{ fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(27,42,74,0.4)', marginBottom: '1.5rem' }}>Personas</p>
            <p style={{ ...body, maxWidth: '600px', marginBottom: '2rem' }}>We created <strong style={strongSt}>4 personas</strong> spanning different income levels, social contexts, and smoking motivations — from postgrad students to full-time professionals.</p>
            <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(27,42,74,0.12)' }}>
              <img src="/images/exhale-personas.png" alt="Personas" style={{ width: '100%', display: 'block' }} />
            </div>
          </div>

          {/* Competitor Analysis */}
          <div>
            <p style={{ fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(27,42,74,0.4)', marginBottom: '0.75rem' }}>Competitor Analysis</p>
            <p style={{ ...body, maxWidth: '600px', marginBottom: '2rem' }}>We analysed <strong style={strongSt}>QuitNow, a Fitness App, and Duolingo</strong> to understand what works, what fails, and what gaps Exhale could fill.</p>

            {/* Competitor table */}
            <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(27,42,74,0.12)', marginBottom: '2rem' }}>
              <img src="/images/exhale-comp-table.png" alt="Competitor Analysis Table" style={{ width: '100%', display: 'block' }} />
            </div>

            {/* Horizontal scroll row */}
            <p style={{ fontSize: '0.72rem', color: 'rgba(27,42,74,0.4)', marginBottom: '1rem', letterSpacing: '0.06em' }}>Scroll to explore annotated competitor screens →</p>
            <div
              ref={compScrollRef}
              style={{ display: 'flex', gap: '1.5rem', overflowX: 'auto', paddingBottom: '1.5rem', scrollSnapType: 'x mandatory', WebkitOverflowScrolling: 'touch', cursor: 'grab' }}
              onMouseDown={e => {
                const el = compScrollRef.current; if (!el) return
                el.style.cursor = 'grabbing'
                const startX = e.pageX - el.offsetLeft
                const scrollLeft = el.scrollLeft
                const onMove = (ev: MouseEvent) => { el.scrollLeft = scrollLeft - (ev.pageX - el.offsetLeft - startX) }
                const onUp = () => { el.style.cursor = 'grab'; window.removeEventListener('mousemove', onMove); window.removeEventListener('mouseup', onUp) }
                window.addEventListener('mousemove', onMove)
                window.addEventListener('mouseup', onUp)
              }}
            >
              {[
                { src: '/images/exhale-comp-1.png', label: 'QuitNow — Dashboard / Achievement / Health Meters' },
                { src: '/images/exhale-comp-2.png', label: 'Fitness App — Colour Scheme / Minimal Design / Buttons' },
                { src: '/images/exhale-comp-3.png', label: 'Duolingo — Rewards / Achievements / Leaderboard / Badges' },
              ].map(({ src, label }) => (
                <div key={label} style={{ flexShrink: 0, width: 'min(85vw, 800px)', scrollSnapAlign: 'start', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(27,42,74,0.12)' }}>
                  <img src={src} alt={label} style={{ width: '100%', display: 'block' }} />
                  <div style={{ padding: '0.75rem 1rem', background: '#1B2A4A' }}>
                    <p style={{ fontSize: '0.72rem', color: 'rgba(245,242,236,0.6)', letterSpacing: '0.06em', fontStyle: 'italic' }}>{label}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <MarqueeStrip text="CARD SORTING ✦ USER INTERVIEWS ✦ COMPETITIVE RESEARCH ✦ GUERRILLA TESTING ✦ USABILITY TESTING ✦" bgColor="#F5F2EC" textColor="#1B2A4A" speed={40} />

      {/* ══ DEFINE — DESIGN DECISIONS ══ */}
      <section id="define" style={{ padding: '6rem 3rem', background: '#F5F2EC' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SLabel>Design Decisions</SLabel>
          <h2 style={{ ...h2st, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', marginTop: '1rem', marginBottom: '3.5rem' }}>How we <em style={emSt}>solved it</em></h2>
          {decisions.map(({ num, name, body: decBody }, i) => (
            <div key={num}>
              {i > 0 && <div style={{ height: '1px', background: 'rgba(27,42,74,0.1)', margin: '0 0 3rem' }} />}
              <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: '3rem', alignItems: 'start', marginBottom: '3rem' }}>
                <div>
                  <p style={{ fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(27,42,74,0.35)', marginBottom: '0.4rem' }}>Decision</p>
                  <div style={{ fontFamily: "'Abril Fatface', serif", fontSize: 'clamp(3rem, 5vw, 4.5rem)', color: '#1B2A4A', lineHeight: 1, opacity: 0.15 }}>{num}</div>
                </div>
                <div>
                  <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)', fontWeight: 700, color: '#1B2A4A', marginBottom: '0.85rem', lineHeight: 1.3 }}>{name}</h3>
                  <p style={{ ...body, maxWidth: '620px' }}>{decBody}</p>
                </div>
              </div>
            </div>
          ))}

          {/* User Flow */}
          <div style={{ height: '1px', background: 'rgba(27,42,74,0.1)', margin: '2rem 0 3rem' }} />
          <p style={{ fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(27,42,74,0.4)', marginBottom: '1rem' }}>User Flow</p>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.1rem, 1.8vw, 1.35rem)', fontWeight: 700, color: '#1B2A4A', marginBottom: '0.75rem' }}>From Splash Screen to <em style={emSt}>every feature</em></h3>
          <p style={{ ...body, maxWidth: '600px', marginBottom: '2rem' }}>Click each tab to explore the four main sections of the app and see what features live within each.</p>
          <UserFlowDiagram />
        </div>
      </section>

      <RDiv from="#F5F2EC" to="#EEF0F7" />

      {/* ══ DESIGN ══ */}
      <section id="design" style={{ padding: '6rem 3rem 6rem 0', background: '#EEF0F7' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SLabel>Design</SLabel>
          <h2 style={{ ...h2st, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', marginTop: '1rem', marginBottom: '3rem' }}>Building the <em style={emSt}>experience</em></h2>

          {/* Low-fi wireframes */}
          <p style={{ fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(27,42,74,0.4)', marginBottom: '0.75rem' }}>Low-Fidelity Wireframes</p>
          <p style={{ ...body, maxWidth: '600px', marginBottom: '1.5rem' }}>Grey-scale wireframes across all 9 screens — establishing layout, hierarchy, and navigation before introducing visual design.</p>
          <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(27,42,74,0.12)', marginBottom: '4rem' }}>
            <img src="/images/exhale-wireframes.png" alt="Low-fidelity wireframes" style={{ width: '100%', display: 'block' }} />
          </div>

          {/* Design System */}
          <div style={{ height: '1px', background: 'rgba(27,42,74,0.1)', marginBottom: '3rem' }} />
          <p style={{ fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(27,42,74,0.4)', marginBottom: '0.75rem' }}>Design System</p>
          <p style={{ ...body, maxWidth: '600px', marginBottom: '1.5rem' }}>The colour scheme was selected through guerrilla testing and validated for accessibility — colour-blind safe and WCAG compliant.</p>
          <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(27,42,74,0.12)', marginBottom: '4rem' }}>
            <img src="/images/exhale-design-system.png" alt="Design System" style={{ width: '100%', display: 'block' }} />
          </div>

          {/* Guerilla Testing */}
          <div style={{ height: '1px', background: 'rgba(27,42,74,0.1)', marginBottom: '3rem' }} />
          <p style={{ fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(27,42,74,0.4)', marginBottom: '0.75rem' }}>Guerrilla Testing</p>
          <p style={{ ...body, maxWidth: '600px', marginBottom: '1.5rem' }}>17 classmates were shown three design routes and asked to select their preferred colour system. Design Route 3 won — and shaped the final visual language of Exhale.</p>
          <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(27,42,74,0.12)', marginBottom: '4rem' }}>
            <img src="/images/exhale-guerilla.png" alt="Guerrilla Testing" style={{ width: '100%', display: 'block' }} />
          </div>

          {/* Design goals */}
          <div style={{ height: '1px', background: 'rgba(27,42,74,0.1)', marginBottom: '3rem' }} />
          <p style={{ fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(27,42,74,0.4)', marginBottom: '2rem' }}>Design Goals</p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '4rem' }}>
            {[{ num: '01', title: 'Speed', desc: 'Under 5 seconds to support via single-tap Game Zone' }, { num: '02', title: 'Completion', desc: '70% activity completion target through visual feedback' }, { num: '03', title: 'Retention', desc: '60% retention intent via visceral rewards' }].map(({ num, title, desc }) => (
              <div key={num} style={{ padding: '1.5rem', background: '#F5F2EC', borderRadius: '2px' }}>
                <div style={{ fontFamily: "'Abril Fatface', serif", fontSize: '1.8rem', color: '#1B2A4A', opacity: 0.1 }}>{num}</div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.05rem', fontWeight: 700, color: '#1B2A4A', margin: '0.4rem 0 0.5rem' }}>{title}</h3>
                <p style={{ fontSize: '0.88rem', lineHeight: 1.7, color: 'rgba(27,42,74,0.55)', fontWeight: 300 }}>{desc}</p>
              </div>
            ))}
          </div>

          {/* Feature Walkthrough */}
          <div style={{ height: '1px', background: 'rgba(27,42,74,0.1)', marginBottom: '3rem' }} />
          <p style={{ fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(27,42,74,0.4)', marginBottom: '0.75rem' }}>Feature Walkthrough</p>
          <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.3rem, 2vw, 1.8rem)', fontWeight: 700, color: '#1B2A4A', marginBottom: '3rem', lineHeight: 1.2 }}>Inside the <em style={emSt}>app</em></h3>

          {features.map(({ num, name, src, desc, callouts, deepDive }, i) => {
            const isEven = i % 2 !== 0
            return (
              <div key={num}>
                {i === 1 && <img src="/images/exhale-gamezone-3.png" alt="Game Zone screens" style={{ width: '100%', display: 'block', borderRadius: '12px', margin: '3rem 0' }} />}
                 {i === 2 && <img src="/images/exhale-dasboard-3.png" alt="Dashboard screens" style={{ width: '100%', display: 'block', borderRadius: '12px', margin: '3rem 0' }} />}
                 {i > 0 && <div style={{ height: '1px', background: 'rgba(27,42,74,0.1)', margin: '4rem 0' }} />}
                <div style={{ display: 'grid', gridTemplateColumns: isEven ? '1fr 420px' : '420px 1fr', gap: "16rem", alignItems: "center" }}>
                  <div>
                    <p style={{ fontSize: '0.6rem', letterSpacing: '0.28em', textTransform: 'uppercase', color: 'rgba(27,42,74,0.35)', marginBottom: '0.5rem' }}>Feature {num}</p>
                    <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.3rem, 2vw, 1.7rem)', fontWeight: 700, color: '#1B2A4A', marginBottom: '0.85rem', lineHeight: 1.2 }}>{name}</h3>
                    <p style={{ ...body, marginBottom: '1.75rem' }}>{desc}</p>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                      {callouts.map((c, ci) => <Callout key={ci} text={c} />)}
                    </div>
                  </div>
{!isEven && <PhoneMockup src={src} label={`Screen — ${name}`} />}
{isEven && <PhoneMockup src={src} label={`Screen — ${name}`} />}                </div>
              </div>
            )
          })}
        </div>
      </section>

      <RDiv from="#EEF0F7" to="#F5F2EC" flip />

      {/* ══ TESTING ══ */}
      <div style={{ padding: '0 12rem' }}>
  <img src="/images/exhale-support-3.png" alt="Support screens" style={{ width: '100%', display: 'block', borderRadius: '12px', margin: '3rem 0' }} />
</div>
      <section id="testing" style={{ padding: '6rem 3rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SLabel>Testing</SLabel>
          <h2 style={{ ...h2st, fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', marginTop: '1rem' }}>Usability <em style={emSt}>testing</em></h2>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '2.5rem', alignItems: 'start' }}>
            <div>
              <p style={body}>Tested with <strong style={strongSt}>6 participants (4M, 2F, aged 18–25)</strong> via Maze and Microsoft Forms. Refined across two rounds against Nielsen's 10 Heuristics.</p>
              <div style={{ marginTop: '2rem', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                {[{ finding: 'Game Zone discoverability low — moved to tab bar', round: 'Round 1' }, { finding: 'Progress tracker confusing — simplified to single metric', round: 'Round 1' }, { finding: 'Breathing exercise needed feedback — added haptic + visual cue', round: 'Round 2' }, { finding: 'Onboarding too long — reduced from 6 screens to 3', round: 'Round 2' }].map(({ finding, round }) => (
                  <div key={finding} style={{ padding: '0.9rem 1.1rem', background: 'rgba(27,42,74,0.04)', borderLeft: '2px solid rgba(27,42,74,0.18)', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '1rem' }}>
                    <p style={{ fontSize: '0.9rem', lineHeight: 1.6, color: '#1B2A4A', fontWeight: 300, margin: 0 }}>{finding}</p>
                    <span style={{ fontSize: '0.62rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(27,42,74,0.35)', whiteSpace: 'nowrap' }}>{round}</span>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <div style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(27,42,74,0.12)' }}>
                <img src="/images/exhale-testing-results.png" alt="Usability Testing Results" style={{ width: '100%', display: 'block' }} />
              </div>
              <div style={{ borderRadius: '8px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(27,42,74,0.12)' }}>
                <img src="/images/exhale-testing-thinkaloud.png" alt="Think-Aloud Results" style={{ width: '100%', display: 'block' }} />
              </div>
            </div>
          </div>
          {/* Old vs New — design iterations */}
          <div style={{ marginTop: '3rem' }}>
            <p style={{ fontSize: '0.68rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(27,42,74,0.4)', marginBottom: '1rem' }}>Design Iterations</p>
            <div style={{ borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 32px rgba(27,42,74,0.12)' }}>
              <img src="/images/exhale-old-new.png" alt="Old vs New design iterations" style={{ width: '100%', display: 'block' }} />
            </div>
          </div>
        </div>
      </section>

      <RDiv from="#F5F2EC" to="#1B2A4A" />

      {/* ══ OUTCOMES ══ */}
      <section id="outcomes" style={{ padding: '6rem 3rem', background: '#1B2A4A' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SLabel light>Outcomes</SLabel>
          <h2 style={{ fontFamily: "'Abril Fatface', serif", fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#F5F2EC', margin: '1rem 0 3rem', lineHeight: 1.1 }}>
            What we <em style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: 'rgba(245,242,236,0.55)' }}>achieved</em>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(245,242,236,0.08)', marginBottom: '4rem' }}>
            {[{ metric: '< 5s', label: 'Time to craving support' }, { metric: '72%', label: 'Activity completion rate' }, { metric: '65%', label: 'Said they would use it daily' }].map(({ metric, label }) => (
              <div key={label} style={{ padding: '2.5rem 2rem', background: 'rgba(245,242,236,0.04)', textAlign: 'center' }}>
                <div style={{ fontFamily: "'Abril Fatface', serif", fontSize: 'clamp(2.5rem, 5vw, 4rem)', color: '#F5F2EC', lineHeight: 1 }}>{metric}</div>
                <div style={{ fontSize: '0.78rem', color: 'rgba(245,242,236,0.45)', marginTop: '0.75rem', letterSpacing: '0.05em' }}>{label}</div>
              </div>
            ))}
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3rem' }}>
            <div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', color: '#F5F2EC', marginBottom: '0.85rem' }}>What worked</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: 'rgba(245,242,236,0.55)', fontWeight: 300 }}>The single-tap Game Zone proved critical. Users responded strongly to the immediate visual reward of cleaning their digital lungs — the visceral feedback loop created genuine motivation.</p>
            </div>
            <div>
              <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', color: '#F5F2EC', marginBottom: '0.85rem' }}>What I'd do differently</h3>
              <p style={{ fontSize: '0.95rem', lineHeight: 1.85, color: 'rgba(245,242,236,0.55)', fontWeight: 300 }}>With more time, I'd explore social accountability features and a longer longitudinal study to measure actual quit rates — not just intent. The community layer felt underexplored.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══ MORE WORK ══ */}
      <section style={{ padding: '6rem 3rem', background: '#F5F2EC' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '2.5rem' }}>
            <div>
              <SLabel>More Work</SLabel>
              <h2 style={{ fontFamily: "'Abril Fatface', serif", fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#1B2A4A', marginTop: '0.75rem', lineHeight: 1 }}>
                Explore my other <em style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: 'rgba(27,42,74,0.5)' }}>case studies</em>
              </h2>
            </div>
            <Link href="/#work" style={{ fontSize: '0.75rem', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(27,42,74,0.5)', textDecoration: 'none', fontWeight: 500, whiteSpace: 'nowrap', paddingBottom: '0.25rem', borderBottom: '1px solid rgba(27,42,74,0.2)' }}>View all →</Link>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem' }}>
            {moreWork.map((project, i) => (
              <MoreWorkCard key={i} {...project} hovered={hoveredWork === i} onEnter={() => setHoveredWork(i)} onLeave={() => setHoveredWork(null)} />
            ))}
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <div style={{ background: '#1B2A4A', padding: '2rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link href="/#work" style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(245,242,236,0.4)', textDecoration: 'none' }}>← All projects</Link>
        <span style={{ fontSize: '0.72rem', color: 'rgba(245,242,236,0.28)' }}>Gaana K Raj · 2025</span>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Playfair+Display:ital,wght@0,400;0,700;1,400&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes marqueeScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
        ::-webkit-scrollbar { height: 4px; } ::-webkit-scrollbar-track { background: transparent; } ::-webkit-scrollbar-thumb { background: rgba(27,42,74,0.2); border-radius: 2px; }
      `}</style>
    </div>
  )
}
