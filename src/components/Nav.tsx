'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    const onResize = () => setIsMobile(window.innerWidth < 768)
    onResize()
    window.addEventListener('scroll', onScroll)
    window.addEventListener('resize', onResize)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  const links = [
    { label: 'Home', href: '/' },
    { label: 'About', href: '/about' },
    { label: 'Work', href: '/#work' },
    { label: 'Contact', href: '/#contact' },
  ]

  return (
    <>
      <nav style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        padding: isMobile ? '1.25rem 1.5rem' : '1.5rem 3rem',
        transition: 'background 0.4s ease',
        background: scrolled || menuOpen ? 'rgba(245,240,232,0.95)' : 'transparent',
        backdropFilter: scrolled || menuOpen ? 'blur(12px)' : 'none',
      }}>
        <Link href="/" style={{ fontFamily: "'Abril Fatface', serif", fontSize: '1.4rem', color: 'var(--navy)', textDecoration: 'none' }}>GKR</Link>

        {/* Desktop nav */}
        {!isMobile && (
          <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none' }}>
            {links.map(({ label, href }) => (
              <li key={label}>
                <Link href={href} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '0.78rem', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--navy)', textDecoration: 'none', opacity: 0.65 }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '0.65')}
                >{label}</Link>
              </li>
            ))}
          </ul>
        )}

        {/* Hamburger */}
        {isMobile && (
          <button onClick={() => setMenuOpen(!menuOpen)} style={{ background: 'none', border: 'none', padding: '0.5rem', display: 'flex', flexDirection: 'column', gap: '5px', cursor: 'pointer' }}>
            <span style={{ display: 'block', width: '24px', height: '2px', background: 'var(--navy)', transition: 'transform 0.3s', transform: menuOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
            <span style={{ display: 'block', width: '24px', height: '2px', background: 'var(--navy)', transition: 'opacity 0.3s', opacity: menuOpen ? 0 : 1 }} />
            <span style={{ display: 'block', width: '24px', height: '2px', background: 'var(--navy)', transition: 'transform 0.3s', transform: menuOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
          </button>
        )}
      </nav>

      {/* Mobile menu */}
      {isMobile && menuOpen && (
        <div style={{ position: 'fixed', top: '64px', left: 0, right: 0, zIndex: 99, background: 'rgba(245,240,232,0.97)', backdropFilter: 'blur(12px)', padding: '2rem 1.5rem', display: 'flex', flexDirection: 'column', gap: '1.5rem', borderBottom: '1px solid rgba(13,34,64,0.1)' }}>
          {links.map(({ label, href }) => (
            <Link key={label} href={href} onClick={() => setMenuOpen(false)} style={{ fontFamily: "'DM Sans', sans-serif", fontSize: '1.1rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--navy)', textDecoration: 'none', opacity: 0.75 }}>{label}</Link>
          ))}
        </div>
      )}
    </>
  )
}
