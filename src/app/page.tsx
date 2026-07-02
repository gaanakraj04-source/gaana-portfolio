'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'
import { Nav } from '@/components/Nav'

export default function AboutPage() {
  const sectionRef = useRef<HTMLDivElement>(null)

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
    <div style={{ background: 'var(--offwhite)', minHeight: '100vh', color: 'var(--navy)' }}>
      <Nav />

      {/* HERO */}
      <section style={{ position: 'relative', height: '100vh', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <video autoPlay muted loop playsInline style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', zIndex: 0, filter: 'brightness(0.55) saturate(0.8)' }}>
          <source src="https://res.cloudinary.com/dmk6udelj/video/upload/v1783018376/river-lotus_v2mpxi.mp4" type="video/mp4" />
        </video>
        <div style={{ position: 'absolute', inset: 0, zIndex: 1, background: 'linear-gradient(to bottom, rgba(13,34,64,0.15) 0%, rgba(13,34,64,0.4) 100%)' }} />
        <div style={{ position: 'relative', zIndex: 2, textAlign: 'center', padding: '0 2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '1.5rem' }}>
          <p style={{ fontSize: '0.72rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.7)', display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <span style={{ display: 'inline-block', width: '2rem', height: '1px', background: 'rgba(245,240,232,0.5)' }} />
            About me
            <span style={{ display: 'inline-block', width: '2rem', height: '1px', background: 'rgba(245,240,232,0.5)' }} />
          </p>
          <h1 style={{ fontFamily: "'Abril Fatface', serif", fontSize: 'clamp(4rem, 9vw, 8rem)', lineHeight: 0.95, color: '#F5F0E8', letterSpacing: '-0.02em' }}>
            Gaana<br />
            <em style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: 'rgba(245,240,232,0.75)' }}>K Raj</em>
          </h1>
          <p style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: 'clamp(1rem, 2vw, 1.3rem)', color: 'rgba(245,240,232,0.65)', maxWidth: '480px', lineHeight: 1.6 }}>
            "I didn't plan to become a designer — I fell into it graciously."
          </p>
        </div>
        <div style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', zIndex: 2, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', color: 'rgba(245,240,232,0.45)', fontSize: '0.68rem', letterSpacing: '0.15em', textTransform: 'uppercase' }}>
          <div style={{ width: '1px', height: '3rem', background: 'linear-gradient(to bottom, rgba(245,240,232,0.6), transparent)', animation: 'spulse 2s ease-in-out infinite' }} />
          <span>scroll</span>
        </div>
      </section>

      {/* BIO */}
      <section ref={sectionRef} style={{ background: 'var(--offwhite)', padding: '7rem 3rem 5rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start' }}>
          <div style={{ position: 'sticky', top: '7rem' }}>
            <p className="fade-up" style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span style={{ display: 'inline-block', width: '1.5rem', height: '1px', background: 'var(--muted)' }} />Who I am
            </p>
            <h2 className="fade-up" style={{ fontFamily: "'Abril Fatface', serif", fontSize: 'clamp(2.5rem, 4vw, 3.8rem)', lineHeight: 1.05, color: 'var(--navy)', marginBottom: '2rem', transitionDelay: '0.1s' }}>
              Designer,<br />
              <em style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: 'var(--navy-light)' }}>creator,</em><br />
              storyteller.
            </h2>
            <div style={{ width: '100%', aspectRatio: '3/4', borderRadius: '2px', overflow: 'hidden', position: 'relative' }}>
              <img
                src="/images/gaana-portrait.jpeg"
                alt="Gaana K Raj"
                style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top', display: 'block' }}
              />
            </div>
          </div>

          <div style={{ paddingTop: '1rem' }}>
            <p className="fade-up" style={{ fontSize: '1rem', lineHeight: 1.9, color: 'var(--navy-mid)', marginBottom: '1.5rem', fontWeight: 300 }}>
              I'm a <strong style={{ fontWeight: 500, color: 'var(--navy)' }}>UI/UX Designer & Creative</strong> based in Birmingham, UK.
            </p>
            <blockquote className="fade-up" style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', fontSize: '1.3rem', lineHeight: 1.5, color: 'var(--navy)', borderLeft: '2px solid var(--navy-light)', paddingLeft: '1.5rem', margin: '2rem 0', transitionDelay: '0.1s' }}>
              "Good design should feel like breathing — you don't notice it, but you couldn't live without it."
            </blockquote>
            <p className="fade-up" style={{ fontSize: '1rem', lineHeight: 1.9, color: 'var(--navy-mid)', marginBottom: '1.5rem', fontWeight: 300, transitionDelay: '0.15s' }}>
              I also create social media content for local brands — <strong style={{ fontWeight: 500, color: 'var(--navy)' }}>Via Delhi Restaurant, Diya's Clothing Store, and Londis Old Hill</strong> — taking time to understand the product and the people behind it, then building content that genuinely engages.
            </p>
            <p className="fade-up" style={{ fontSize: '1rem', lineHeight: 1.9, color: 'var(--navy-mid)', marginBottom: '2.5rem', fontWeight: 300, transitionDelay: '0.2s' }}>
              That same instinct is what drives my UI/UX work.
            </p>
            <p className="fade-up" style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', transitionDelay: '0.22s' }}>
              <span style={{ display: 'inline-block', width: '1.5rem', height: '1px', background: 'var(--muted)' }} />How I became a designer
            </p>
            <p className="fade-up" style={{ fontSize: '1rem', lineHeight: 1.9, color: 'var(--navy-mid)', marginBottom: '1.5rem', fontWeight: 300, transitionDelay: '0.25s' }}>
              It started with noticing. I'd open an app and feel frustrated — not at the task, but at the experience. Out of curiosity, I'd sketch better versions in my notebook. One day I realised there was a whole field dedicated to this.
            </p>
            <p className="fade-up" style={{ fontSize: '1rem', lineHeight: 1.9, color: 'var(--navy-mid)', fontWeight: 300, transitionDelay: '0.3s' }}>
              And just like that, I went from curious observer to UI/UX designer.
            </p>
          </div>
        </div>
      </section>

      <div style={{ background: 'var(--cream)', lineHeight: 0 }}>
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: '80px' }}>
          <path d="M0,40 C200,10 400,70 600,40 C800,10 1000,70 1200,40 C1320,22 1380,55 1440,40 L1440,0 L0,0 Z" fill="#F5F0E8" />
        </svg>
      </div>

      {/* OUTSIDE OF SCREENS */}
      <section style={{ background: 'var(--cream)', padding: '5rem 3rem 6rem' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '3rem' }}>
            <span style={{ display: 'inline-block', width: '1.5rem', height: '1px', background: 'var(--muted)' }} />Outside of screens
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', marginBottom: '4rem', gridAutoRows: 'auto' }}>
            {[
              { title: 'Painting', desc: 'Wall painting and acrylics — I sometimes paint on books too. It\'s a freedom I feel when I paint.' },
              { title: 'Nature', desc: 'Long walks, rivers, pressing flowers. Being outside resets my thinking.' },
              { title: 'Film', desc: 'Feel-good movies with slow, lasting impact.' },
              { title: 'Journaling', desc: 'Writing is how I process ideas before they become designs.' },
              { title: 'Exercise', desc: 'I love to move — and I\'m always trying to learn more about it. Training, recovery, the science behind it. It keeps me grounded.' },
            ].map(({ title, desc }) => (
              <div key={title} style={{ padding: '2rem 1.5rem', background: 'var(--offwhite)', borderRadius: '2px', border: '1px solid rgba(13,34,64,0.07)' }}>
                <h3 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: '1.1rem', color: 'var(--navy)', marginBottom: '0.75rem' }}>{title}</h3>
                <p style={{ fontSize: '0.9rem', lineHeight: 1.75, color: 'var(--muted)', fontWeight: 300 }}>{desc}</p>
              </div>
            ))}
          </div>

          <p style={{ fontSize: '0.7rem', letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.5rem' }}>
            <span style={{ display: 'inline-block', width: '1.5rem', height: '1px', background: 'var(--muted)' }} />My paintings
          </p>

          {/* Infinite horizontal scroll carousel */}
          <div style={{ overflow: 'hidden', width: '100vw', marginLeft: 'calc(-50vw + 50%)', position: 'relative' }}>
            <div style={{ display: 'flex', gap: '1rem', animation: 'paintingScroll 40s linear infinite', width: 'max-content' }}>
              {[...Array(2)].flatMap((_, setIndex) =>
                [1,2,3,4,5,6,7,8,9,10,11,12].map((n) => (
                  <div key={`set-${setIndex}-painting-${n}`} style={{ flexShrink: 0, height: '340px', width: 'auto', borderRadius: '4px', overflow: 'hidden' }}>
                    <img
                      src={`/images/painting-${n}.jpeg`}
                      alt={`Painting ${n}`}
                      style={{ height: '100%', width: 'auto', display: 'block', objectFit: 'cover' }}
                    />
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <div style={{ background: 'var(--navy)', padding: '4rem 3rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <p style={{ fontSize: '0.7rem', letterSpacing: '0.18em', textTransform: 'uppercase', color: 'rgba(245,240,232,0.45)', marginBottom: '0.5rem' }}>Ready to see the work?</p>
          <h3 style={{ fontFamily: "'Abril Fatface', serif", fontSize: '2rem', color: 'var(--offwhite)' }}>
            View my <em style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: 'rgba(245,240,232,0.65)' }}>case studies</em>
          </h3>
        </div>
        <Link href="/#work" style={{ display: 'inline-flex', alignItems: 'center', gap: '0.75rem', padding: '1rem 2.5rem', background: 'var(--offwhite)', color: 'var(--navy)', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.08em', textTransform: 'uppercase', borderRadius: '2px', textDecoration: 'none', fontFamily: "'DM Sans', sans-serif" }}>
          See my work
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" /></svg>
        </Link>
      </div>

      <style>{`
        @keyframes ripple { 0%{opacity:0;transform:translate(-50%,-50%) scale(.8)} 30%{opacity:1} 100%{opacity:0;transform:translate(-50%,-50%) scale(1.6)} }
        @keyframes spulse { 0%,100%{opacity:.3} 50%{opacity:1} }
        @keyframes paintingScroll { 0%{transform:translateX(0)} 100%{transform:translateX(-50%)} }
        .fade-up { opacity:0; transform:translateY(28px); transition:opacity .85s ease,transform .85s ease; }
        .fade-up.visible { opacity:1; transform:translateY(0); }
        :root { --offwhite:#F5F0E8; --cream:#EDE8DC; --navy:#0D2240; --navy-mid:#1A3A5C; --navy-light:#2E5F8A; --muted:#6B7A8D; }
      `}</style>
    </div>
  )
}
