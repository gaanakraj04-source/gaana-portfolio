'use client'
// app/projects/ar-medical-research/page.tsx
// Research case study — MSc Dissertation: Systematic Review of AR Interface & Interaction Design in Medicine
import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'

const NAV_ITEMS = [
  { id: 'overview', label: 'Overview' },
  { id: 'method', label: 'Method' },
  { id: 'findings', label: 'Findings' },
  { id: 'paradigms', label: 'Paradigms' },
  { id: 'impact', label: 'Impact' },
]

const body: React.CSSProperties = { fontSize: '1rem', lineHeight: 1.85, color: 'rgba(27,42,74,0.68)', fontWeight: 300, fontFamily: "'DM Sans', sans-serif" }
const h2st: React.CSSProperties = { fontFamily: "'Playfair Display', serif", fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 700, color: '#1B2A4A', marginBottom: '1rem', marginTop: '1rem', lineHeight: 1.15 }
const emSt: React.CSSProperties = { fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: 'rgba(27,42,74,0.55)', fontWeight: 400 }

function SLabel({ children, light = false }: { children: React.ReactNode; light?: boolean }) {
  return (
    <p style={{
      fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase',
      color: light ? 'rgba(245,242,236,0.5)' : 'rgba(27,42,74,0.45)',
      fontFamily: "'DM Sans', sans-serif", fontWeight: 500,
      display: 'flex', alignItems: 'center', gap: '0.75rem',
    }}>
      <span style={{ display: 'inline-block', width: '1.5rem', height: '1px', background: light ? 'rgba(245,242,236,0.5)' : 'rgba(27,42,74,0.45)' }} />
      {children}
    </p>
  )
}

function StatBlock({ number, label, light = false }: { number: string; label: string; light?: boolean }) {
  return (
    <div>
      <div style={{ fontFamily: "'Abril Fatface', serif", fontSize: 'clamp(2.2rem, 4vw, 3.2rem)', color: light ? '#F5F2EC' : '#1B2A4A', lineHeight: 1 }}>{number}</div>
      <div style={{ fontSize: '0.78rem', color: light ? 'rgba(245,242,236,0.65)' : 'rgba(27,42,74,0.55)', fontFamily: "'DM Sans', sans-serif", fontWeight: 300, marginTop: '0.5rem', lineHeight: 1.4, maxWidth: '180px' }}>{label}</div>
    </div>
  )
}

/* PRISMA funnel — simplified visual of the screening flow */
function PrismaFunnel() {
  const stages = [
    { n: '194', label: 'Records identified', sub: 'PubMed · MEDLINE · Web of Science · IEEE Xplore', width: '100%' },
    { n: '144', label: 'Screened', sub: '48 duplicates removed', width: '80%' },
    { n: '99', label: 'Full-text assessed', sub: '45 out-of-scope records excluded', width: '62%' },
    { n: '70', label: 'Included in synthesis', sub: 'Analysed with a six-category taxonomy', width: '46%' },
  ]
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '10px', margin: '2.5rem 0' }}>
      {stages.map((s, i) => (
        <div key={s.n} style={{
          width: s.width, minWidth: '260px',
          background: i === stages.length - 1 ? '#1B2A4A' : 'rgba(27,42,74,0.06)',
          border: '1px solid rgba(27,42,74,0.12)',
          borderRadius: '12px', padding: '1rem 1.5rem',
          display: 'flex', alignItems: 'center', gap: '1.25rem',
          transition: 'transform 0.2s ease',
        }}>
          <span style={{ fontFamily: "'Abril Fatface', serif", fontSize: '1.6rem', color: i === stages.length - 1 ? '#F5F2EC' : '#1B2A4A', lineHeight: 1 }}>{s.n}</span>
          <span>
            <span style={{ display: 'block', fontFamily: "'DM Sans', sans-serif", fontSize: '0.85rem', fontWeight: 500, color: i === stages.length - 1 ? '#F5F2EC' : '#1B2A4A' }}>{s.label}</span>
            <span style={{ display: 'block', fontFamily: "'DM Sans', sans-serif", fontSize: '0.72rem', fontWeight: 300, color: i === stages.length - 1 ? 'rgba(245,242,236,0.6)' : 'rgba(27,42,74,0.5)' }}>{s.sub}</span>
          </span>
        </div>
      ))}
    </div>
  )
}

/* Horizontal frequency bars for key findings */
function FreqBar({ label, value, max, suffix }: { label: string; value: number; max: number; suffix: string }) {
  return (
    <div style={{ marginBottom: '1.1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.35rem' }}>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', fontWeight: 400, color: '#1B2A4A' }}>{label}</span>
        <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.8rem', fontWeight: 500, color: 'rgba(27,42,74,0.6)' }}>{suffix}</span>
      </div>
      <div style={{ height: '8px', background: 'rgba(27,42,74,0.08)', borderRadius: '4px', overflow: 'hidden' }}>
        <div style={{ height: '100%', width: `${(value / max) * 100}%`, background: '#1B2A4A', borderRadius: '4px' }} />
      </div>
    </div>
  )
}

/* Paradigm comparison card */
function ParadigmCard({ title, device, interaction, visual, evalFocus, note }: { title: string; device: string; interaction: string; visual: string; evalFocus: string; note: string }) {
  const row: React.CSSProperties = { display: 'flex', flexDirection: 'column', gap: '2px', paddingBottom: '0.85rem', marginBottom: '0.85rem', borderBottom: '1px solid rgba(245,242,236,0.1)' }
  const k: React.CSSProperties = { fontSize: '0.62rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(245,242,236,0.45)', fontFamily: "'DM Sans', sans-serif", fontWeight: 500 }
  const v: React.CSSProperties = { fontSize: '0.88rem', color: '#F5F2EC', fontFamily: "'DM Sans', sans-serif", fontWeight: 400 }
  return (
    <div style={{ background: '#1B2A4A', borderRadius: '16px', padding: '1.75rem', flex: 1, minWidth: '250px', border: '1px solid rgba(245,242,236,0.08)' }}>
      <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.25rem', fontWeight: 700, color: '#F5F2EC', marginBottom: '1.25rem' }}>{title}</h3>
      <div style={row}><span style={k}>Device</span><span style={v}>{device}</span></div>
      <div style={row}><span style={k}>Interaction</span><span style={v}>{interaction}</span></div>
      <div style={row}><span style={k}>Visualisation</span><span style={v}>{visual}</span></div>
      <div style={{ ...row, borderBottom: 'none', marginBottom: '0.5rem' }}><span style={k}>Evaluation focus</span><span style={v}>{evalFocus}</span></div>
      <p style={{ fontSize: '0.78rem', lineHeight: 1.6, color: 'rgba(245,242,236,0.55)', fontFamily: "'DM Sans', sans-serif", fontWeight: 300, fontStyle: 'italic' }}>{note}</p>
    </div>
  )
}

export default function ARMedicalResearchPage() {
  const [activeSection, setActiveSection] = useState('overview')
  const [navVisible, setNavVisible] = useState(false)

  useEffect(() => {
    const sectionEls = NAV_ITEMS.map(({ id }) => document.getElementById(id)).filter(Boolean)
    const observer = new IntersectionObserver(
      entries => { entries.forEach(entry => { if (entry.isIntersecting) setActiveSection(entry.target.id) }) },
      { rootMargin: '-40% 0px -55% 0px' }
    )
    sectionEls.forEach(el => el && observer.observe(el))
    const onScroll = () => setNavVisible(window.scrollY > window.innerHeight * 0.5)
    window.addEventListener('scroll', onScroll)
    return () => { observer.disconnect(); window.removeEventListener('scroll', onScroll) }
  }, [])

  const scrollTo = (id: string) => { document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' }) }

  return (
    <main style={{ background: '#F5F2EC' }}>

      {/* ── Sticky pill nav ── */}
      <div style={{
        position: 'fixed', bottom: '1.5rem', left: '50%', transform: `translateX(-50%) translateY(${navVisible ? 0 : '120%'})`,
        zIndex: 90, background: 'rgba(27,42,74,0.92)', backdropFilter: 'blur(12px)', borderRadius: '9999px',
        padding: '0.35rem', display: 'flex', gap: '0.15rem', transition: 'transform 0.35s ease', maxWidth: '92vw', overflowX: 'auto',
      }}>
        {NAV_ITEMS.map(({ id, label }) => (
          <button key={id} onClick={() => scrollTo(id)} style={{
            background: activeSection === id ? 'rgba(245,242,236,0.14)' : 'transparent',
            border: 'none', borderRadius: '9999px', padding: '0.4rem 0.9rem',
            color: activeSection === id ? '#F5F2EC' : 'rgba(245,242,236,0.42)',
            fontSize: '0.7rem', fontWeight: activeSection === id ? 500 : 400,
            letterSpacing: '0.08em', textTransform: 'uppercase', cursor: 'pointer',
            transition: 'all 0.25s ease', fontFamily: "'DM Sans', sans-serif", whiteSpace: 'nowrap', outline: 'none',
          }}>{label}</button>
        ))}
      </div>

      {/* ── HERO ── */}
      <section style={{ minHeight: '80vh', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', padding: '7rem 3rem 3.5rem', position: 'relative', overflow: 'hidden', background: 'linear-gradient(155deg, #F5F2EC 50%, #E9EDF6 100%)' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto', width: '100%' }}>
          <SLabel>Case Study 02 · MSc Dissertation</SLabel>
          <h1 style={{ fontFamily: "'Abril Fatface', serif", fontSize: 'clamp(48px, 8vw, 96px)', lineHeight: 1.02, color: '#1B2A4A', margin: '1.25rem 0', letterSpacing: '-0.02em' }}>
            Designing AR<br />
            <em style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 400 }}>for medicine</em>
          </h1>
          <p style={{ ...body, maxWidth: '620px', fontSize: '1.05rem' }}>
            A systematic review of interface and interaction design in medical Augmented Reality —
            synthesising 70 peer-reviewed studies to map how AR is designed for surgeons, students, and patients,
            and where the field's evaluation practices fall short.
          </p>
          <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', marginTop: '2.5rem', paddingTop: '2rem', borderTop: '1px solid rgba(27,42,74,0.12)' }}>
            <StatBlock number="70" label="Peer-reviewed studies synthesised" />
            <StatBlock number="4" label="Databases searched, PRISMA-guided" />
            <StatBlock number="6" label="Category taxonomy built for analysis" />
            <StatBlock number="2013–25" label="Publication window covered" />
          </div>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(27,42,74,0.4)', fontFamily: "'DM Sans', sans-serif", marginTop: '2rem' }}>
            UX Research · Systematic Review · AR / Healthcare · Birmingham City University, 2025
          </p>
        </div>
      </section>

      {/* ── OVERVIEW ── */}
      <section id="overview" style={{ padding: '6rem 3rem', background: '#F5F2EC' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SLabel>The problem</SLabel>
          <h2 style={h2st}>Technology raced ahead. <em style={emSt}>Evidence didn't.</em></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3rem', marginTop: '2rem' }}>
            <p style={body}>
              Augmented Reality is transforming how medicine is taught and practised — from holographic surgical
              navigation to anatomy apps in students' pockets. But the pace of technical development has outstripped
              the field's ability to evaluate it. Research splits into two streams that rarely meet: engineering papers
              that measure registration error to the millimetre but say little about the user, and clinical papers that
              measure outcomes while treating the AR interface as a black box.
            </p>
            <p style={body}>
              The result is a fragmented evidence base with no shared language for what good AR design looks like in
              healthcare. My dissertation set out to build that language: systematically cataloguing and quantifying the
              interaction and interface design patterns across the medical AR landscape, and asking how design adapts —
              or fails to adapt — for surgeons, students, and patients.
            </p>
          </div>
        </div>
      </section>

      {/* ── METHOD ── */}
      <section id="method" style={{ padding: '6rem 3rem', background: '#EEF0F7' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SLabel>The method</SLabel>
          <h2 style={h2st}>From 194 records to <em style={emSt}>70 studies</em></h2>
          <p style={{ ...body, maxWidth: '640px' }}>
            Following PRISMA principles, I searched PubMed, MEDLINE, IEEE Xplore, and Web of Science for studies
            published between 2013 and 2025 — the era spanning consumer mobile AR through to the HoloLens generation.
            Two-stage screening against predefined criteria narrowed the pool to 70 studies with a genuine
            evaluation component.
          </p>
          <PrismaFunnel />
          <p style={{ ...body, maxWidth: '640px' }}>
            Each study was then deconstructed using a six-category taxonomy — <strong style={{ fontWeight: 500, color: '#1B2A4A' }}>device type, interaction
            modality, visualisation type, user type, environment, and evaluation focus</strong> — turning qualitative
            descriptions into quantifiable design patterns that could be compared across medical domains.
          </p>
        </div>
      </section>

      {/* ── FINDINGS ── */}
      <section id="findings" style={{ padding: '6rem 3rem', background: '#F5F2EC' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SLabel>Key findings</SLabel>
          <h2 style={h2st}>What the field <em style={emSt}>actually builds</em></h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '3.5rem', marginTop: '2.5rem', alignItems: 'start' }}>
            <div>
              <p style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(27,42,74,0.5)', fontFamily: "'DM Sans', sans-serif", fontWeight: 500, marginBottom: '1.25rem' }}>Dominant design patterns (n = 70)</p>
              <FreqBar label="Head-Mounted Displays" value={48} max={70} suffix="69%" />
              <FreqBar label="Gesture interaction" value={45} max={70} suffix="61%" />
              <FreqBar label="3D overlays" value={38} max={70} suffix="54%" />
              <FreqBar label="Touch interaction" value={18} max={70} suffix="24%" />
              <FreqBar label="Gamified UI" value={5} max={70} suffix="7%" />
            </div>
            <div>
              <p style={{ fontSize: '0.72rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(27,42,74,0.5)', fontFamily: "'DM Sans', sans-serif", fontWeight: 500, marginBottom: '1.25rem' }}>Who gets designed for</p>
              <FreqBar label="Medical professionals" value={45} max={70} suffix="64%" />
              <FreqBar label="Students" value={26} max={70} suffix="37%" />
              <FreqBar label="Patients" value={10} max={70} suffix="14%" />
              <p style={{ ...body, fontSize: '0.9rem', marginTop: '1.5rem' }}>
                Patient-facing AR is the field's blind spot — just 10 of 70 studies — despite its potential for
                education, adherence, and rehabilitation at home.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── PARADIGMS ── */}
      <section id="paradigms" style={{ padding: '6rem 3rem', background: '#EEF0F7' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SLabel>The core insight</SLabel>
          <h2 style={h2st}>One technology, <em style={emSt}>three design worlds</em></h2>
          <p style={{ ...body, maxWidth: '640px', marginBottom: '2.5rem' }}>
            Medical AR design isn't a monolith — it has bifurcated into context-specific paradigms shaped by
            the constraints of each setting. The operating room demands sterility, so hands stay free.
            The classroom demands scale, so devices stay cheap. The home demands motivation, so interfaces get playful.
          </p>
          <div style={{ display: 'flex', gap: '1.25rem', flexWrap: 'wrap' }}>
            <ParadigmCard
              title="Clinical use"
              device="HMDs — HoloLens (35), Magic Leap (3)"
              interaction="Gesture (30) · Gaze (12) · Voice (10)"
              visual="3D overlays on patient anatomy"
              evalFocus="Technical accuracy (35)"
              note="Sterility rules everything: hands-free or nothing. Usability is dangerously under-measured."
            />
            <ParadigmCard
              title="Medical education"
              device="HMDs (15) & tablets/phones (12)"
              interaction="Gesture (15) · Touch (10)"
              visual="Interactive anatomical models"
              evalFocus="Usability (20) · Task performance (15)"
              note="Accessibility wins: devices students already own, integrated into existing curricula."
            />
            <ParadigmCard
              title="Patient-facing"
              device="Consumer smartphones (10)"
              interaction="Touch (8) · Controller (2)"
              visual="Gamified UI & simple annotations"
              evalFocus="Usability (8) · Satisfaction (6)"
              note="The least mature paradigm — simple, motivating, and almost never clinically validated."
            />
          </div>
          <div style={{ marginTop: '3rem', background: '#F5F2EC', border: '1px solid rgba(27,42,74,0.12)', borderRadius: '16px', padding: '2rem 2.25rem', maxWidth: '760px' }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontStyle: 'italic', color: '#1B2A4A', lineHeight: 1.6, marginBottom: '0.75rem' }}>
              "Surgical research rigorously validates whether systems are accurate — but rarely whether they are usable.
              Educational research measures usability — but rarely technical rigour."
            </p>
            <p style={{ ...body, fontSize: '0.9rem' }}>
              This evaluation gap — the disconnect between technical validation and user-centred design — emerged as
              the single biggest barrier to AR's clinical adoption, and the review's primary contribution is naming
              and quantifying it.
            </p>
          </div>
        </div>
      </section>

      {/* ── IMPACT ── */}
      <section id="impact" style={{ padding: '6rem 3rem', background: '#1B2A4A' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <SLabel light>Impact & recommendations</SLabel>
          <h2 style={{ fontFamily: "'Abril Fatface', serif", fontSize: 'clamp(2rem, 3.5vw, 3rem)', color: '#F5F2EC', margin: '1rem 0 2.5rem', lineHeight: 1.1 }}>
            A roadmap for <em style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontWeight: 400 }}>responsible AR</em>
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '2.5rem' }}>
            {[
              { t: 'A holistic evaluation framework', d: 'Proposed a standardised minimum dataset spanning technical performance, clinical efficacy, usability, and educational impact — so AR systems are validated as complete experiences, not just accurate hardware.' },
              { t: 'Evidence-based design guidance', d: 'Called for rigorous comparative studies of interaction modalities — gesture vs. voice vs. gaze — measuring cognitive load with validated instruments like NASA-TLX and SUS.' },
              { t: 'The under-explored frontiers', d: 'Identified patient-facing AR, hands-free modalities in education, and long-term outcome studies as the field\u2019s highest-value opportunities for future research.' },
            ].map(({ t, d }) => (
              <div key={t}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.15rem', fontWeight: 700, color: '#F5F2EC', marginBottom: '0.75rem' }}>{t}</h3>
                <p style={{ fontSize: '0.92rem', lineHeight: 1.75, color: 'rgba(245,242,236,0.65)', fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>{d}</p>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '3.5rem', paddingTop: '2.5rem', borderTop: '1px solid rgba(245,242,236,0.12)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
            <p style={{ fontSize: '0.8rem', color: 'rgba(245,242,236,0.5)', fontFamily: "'DM Sans', sans-serif", fontWeight: 300, maxWidth: '460px', lineHeight: 1.6 }}>
              Submitted for the degree of MSc User Experience Design, Birmingham City University, September 2025.
              Supervised by Dr Ian Williams.
            </p>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a
                href="/documents/msc-dissertation.pdf"
                target="_blank"
                rel="noopener noreferrer"
                style={{ display: 'inline-block', background: '#F5F2EC', color: '#1B2A4A', borderRadius: '50px', padding: '12px 28px', fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif", textDecoration: 'none' }}
              >
                Read the full dissertation ↗
              </a>
              <Link
                href="/#work"
                style={{ display: 'inline-block', background: 'transparent', color: '#F5F2EC', border: '1px solid rgba(245,242,236,0.3)', borderRadius: '50px', padding: '12px 28px', fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: "'DM Sans', sans-serif", textDecoration: 'none' }}
              >
                ← Back to work
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
