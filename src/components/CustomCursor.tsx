'use client'
import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = cursorRef.current
    if (!el) return

    let mx = -200, my = -200
    let rx = -200, ry = -200
    let rafId: number
    let visible = false

    const move = (e: MouseEvent) => {
      mx = e.clientX
      my = e.clientY
      if (!visible) {
        visible = true
        rx = mx; ry = my
        el.style.opacity = '1'
      }
    }

    const tick = () => {
      rx += (mx - rx) * 0.14
      ry += (my - ry) * 0.14
      el.style.transform = `translate(${rx}px, ${ry}px)`
      rafId = requestAnimationFrame(tick)
    }

    window.addEventListener('mousemove', move, { passive: true })
    rafId = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(rafId)
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: 0,
        height: 0,
        pointerEvents: 'none',
        zIndex: 99999,
        opacity: 0,
      }}
    >
      {/* Outer ring */}
      <div style={{
        position: 'absolute',
        width: '38px',
        height: '38px',
        borderRadius: '50%',
        border: '1.5px solid #0D2240',
        transform: 'translate(-50%, -50%)',
        opacity: 0.5,
      }} />
      {/* Inner filled dot */}
      <div style={{
        position: 'absolute',
        width: '7px',
        height: '7px',
        borderRadius: '50%',
        background: '#0D2240',
        transform: 'translate(-50%, -50%)',
      }} />
    </div>
  )
}
