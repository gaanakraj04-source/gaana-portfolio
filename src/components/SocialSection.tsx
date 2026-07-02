'use client'
import Link from 'next/link'
import { useEffect, useRef } from 'react'

const reels = [
  { url: 'https://www.instagram.com/reel/DZ7DS1bKoTW/', id: 'DZ7DS1bKoTW' },
  { url: 'https://www.instagram.com/reel/DZNx6Y2D0xv/', id: 'DZNx6Y2D0xv' },
  { url: 'https://www.instagram.com/reel/DZup17DEkpI/', id: 'DZup17DEkpI' },
]

function ReelEmbed({ url }: { url: string }) {
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
    <div ref={ref} style={{ borderRadius: '12px', overflow: 'hidden', background: '#f5f5f5', minHeight: '500px' }} />
  )
}

export function SocialSection() {
  return (
    <section style={{ background: '#F5F0E8', padding: '6rem 3rem' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3.5rem' }}>
          <div>
            <p style={{ fontSize: '0.7rem', letterSpacing: '0.22em', textTransform: 'uppercase', color: 'rgba(13,34,64,0.4)', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem', fontFamily: "'DM Sans', sans-serif" }}>
              <span style={{ display: 'inline-block', width: '2rem', height: '1px', background: 'rgba(13,34,64,0.3)' }} />
              Social Media Content
            </p>
            <h2 style={{ fontFamily: "'Abril Fatface', serif", fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#0D2240', lineHeight: 1.05 }}>
              Content that <em style={{ fontFamily: "'Playfair Display', serif", fontStyle: 'italic', color: 'rgba(13,34,64,0.5)' }}>connects</em>
            </h2>
          </div>
          <Link href="/social" style={{
            display: 'inline-flex', alignItems: 'center', gap: '0.5rem',
            padding: '0.75rem 1.75rem',
            border: '1px solid rgba(13,34,64,0.25)',
            borderRadius: '2px',
            fontSize: '0.75rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase',
            color: '#0D2240', textDecoration: 'none',
            fontFamily: "'DM Sans', sans-serif",
          }}>
            See all →
          </Link>
        </div>
        <div className="social-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {reels.map(r => <ReelEmbed key={r.id} url={r.url} />)}
        </div>
      </div>
    </section>
  )
}
