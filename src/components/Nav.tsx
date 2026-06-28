'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

export function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav
      style={{
        position: 'fixed',
        top: 0, left: 0, right: 0,
        zIndex: 100,
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '1.5rem 3rem',
        transition: 'background 0.4s ease, backdrop-filter 0.4s ease',
        background: scrolled ? 'rgba(245,240,232,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
      }}
    >
      <Link
        href="/"
        style={{
          fontFamily: "'Abril Fatface', serif",
          fontSize: '1.4rem',
          color: 'var(--navy)',
          textDecoration: 'none',
          letterSpacing: '0.02em',
        }}
      >
        GKR
      </Link>

      <ul style={{ display: 'flex', gap: '2.5rem', listStyle: 'none' }}>
        {[
          { label: 'Home', href: '/' },
          { label: 'About', href: '/about' },
          { label: 'Work', href: '/#work' },
          { label: 'Contact', href: '/#contact' },
        ].map(({ label, href }) => (
          <li key={label}>
            <Link
              href={href}
              style={{
                fontFamily: "'DM Sans', sans-serif",
                fontSize: '0.78rem',
                fontWeight: 500,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--navy)',
                textDecoration: 'none',
                opacity: 0.65,
                transition: 'opacity 0.2s',
              }}
              onMouseEnter={e => (e.currentTarget.style.opacity = '1')}
              onMouseLeave={e => (e.currentTarget.style.opacity = '0.65')}
            >
              {label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
