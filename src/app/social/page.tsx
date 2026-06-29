'use client'
import { useEffect, useRef } from 'react'
import Link from 'next/link'

const reels = [
  { url: 'https://www.instagram.com/reel/DZVNGZ8q9cA/', id: 'DZVNGZ8q9cA', client: 'Via Delhi Restaurant' },
  { url: 'https://www.instagram.com/reel/DYDjtPmFJ9h/', id: 'DYDjtPmFJ9h', client: "Diya's Clothing Store" },
  { url: 'https://www.instagram.com/reel/DZm_EkBKK6W/', id: 'DZm_EkBKK6W', client: 'Londis Old Hill' },
]

function ReelEmbed({ url, client }: { url: string; client: string }) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (ref.current && ref.current.innerHTML === '') {
      const blockquote = document.createElement('blockquote')
      blockquote.className = 'instagram-media'
      blockquote.setAttribute('data-instgrm-permalink', url)
      blockquote.setAttribute('data-instgrm-version', '14')
      blockquote.style.cssText = 'background:#fff;border:0;border-radius:3px;box-shadow:none;margin:0;min-width:100%;width:100%;'
      ref.current.appendChild(blockquote)

      if (!(window as any).instgrm) {
        const script = document.createElement('script')
        script.src = '//www.instagram.com/embed.js'
        script.async = true
        document.body.appendChild(script)
        script.onload = () => (window as any).instgrm?.Embeds?.process()
      } else {
        ;(window as any).instgrm.Embeds.process()
      }
    }
  }, [url])

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
      <div ref={ref} style={{ borderRadius: '12px', overflow: 'hidden', background: '#f5f5f5', minHeight: '500px' }} />
      <p style={{ fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(13,34,64,0.45)', fontFamily: "'DM Sans', sans-serif", textAlign: 'center' }}>{client}</p>
    </div>
  )
}

export default function SocialPage() {
  return (
    <div style={{ background: '#F5F0E8', minHeight: '100vh' }}>
      {/* Nav */}
      <nav style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100, display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '1.5rem 3rem', background: 'rgba(245,240,232,0.85)', backdropFilter: 'blur(12px)', borderBottom: '1px solid rgba(13,34,64,0.07)' }}>
        <Link href="/" style={{ fontFamily: "'Abril Fatface', serif", fontSize: '1.4rem', color: '#0D2240', textDecoration: 'none' }}>GKR</Link>
        <Link href="/" style={{ fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#0D2240', textDecoration: 'none', opacity: 0.55 }}>← All Work</Link>
      </nav>

      {/* Hero */}
      <div style={{ paddingTop: '10rem', paddingBottom: '4rem', paddingLeft: '3rem', paddingRight: '3rem', maxWidth: '1100px', margin: '0 auto' }}>
        <p style={{ fontSize: '0.7rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(13,34,64,0.4)', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', fontFamily: "'DM Sans', sans-serif" }}>
          <span style={{ display: 'inline-block', width: '2rem', height: '1px', background: 'rgba(13,34,64,0.3)' }} />
          Social Media Content
        </p>
        <h1 style={{ fontFamily: "'Abril Fatface', serif", fontSize: 'clamp(3rem, 7vw, 6rem)', color: '#0D2240', lineHeight: 0.95, marginBottom: '1.5rem' }}>
          Content that<br />
          <em style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: 'rgba(13,34,64,0.45)' }}>connects</em>
        </h1>
        <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(13,34,64,0.6)', maxWidth: '520px', fontFamily: "'DM Sans', sans-serif", fontWeight: 300 }}>
          Short-form video content created for local brands in Birmingham — taking time to understand the product and people, then building content that genuinely engages.
        </p>
      </div>

      {/* Grid */}
      <div style={{ padding: '0 3rem 6rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {reels.map(r => (
            <ReelEmbed key={r.id} url={r.url} client={r.client} />
          ))}
        </div>
      </div>
    </div>
  )
}
