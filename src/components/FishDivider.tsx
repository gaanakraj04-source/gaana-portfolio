'use client'
import { useEffect, useRef } from 'react'

export function FishDivider() {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            ref.current?.classList.add('fish-swim')
          }
        })
      },
      { threshold: 0.3 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      style={{
        position: 'relative',
        background: 'var(--offwhite)',
        height: '160px',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
      }}
    >
      {/* Wavy river SVG path behind fish */}
      <svg
        viewBox="0 0 1440 80"
        preserveAspectRatio="none"
        style={{
          position: 'absolute',
          bottom: 0,
          width: '100%',
          height: '80px',
          opacity: 0.08,
        }}
      >
        <path
          d="M0,40 C240,10 480,70 720,40 C960,10 1200,70 1440,40"
          fill="none"
          stroke="var(--navy)"
          strokeWidth="60"
        />
      </svg>

      {/* Fish shoal image — animates in from left */}
      <div
        ref={ref}
        style={{
          position: 'relative',
          zIndex: 2,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <img
          src="/images/fishshoal.jpeg"
          alt=""
          style={{
            height: '100px',
            opacity: 0.22,
            filter: 'saturate(0.5)',
            transform: 'translateX(-60px)',
            transition: 'transform 1.4s cubic-bezier(0.4,0,0.2,1), opacity 1s ease',
          }}
          className="fish-img"
        />
      </div>

      <style>{`
        .fish-swim .fish-img {
          transform: translateX(0px) !important;
          opacity: 0.28 !important;
        }
      `}</style>
    </div>
  )
}
