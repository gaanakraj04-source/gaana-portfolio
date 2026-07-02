'use client'
import Link from 'next/link'
import { Nav } from '@/components/Nav'

const videos = [
  { src: 'https://res.cloudinary.com/dmk6udelj/video/upload/v1782759740/v1_v5z8if.mp4', views: '1,100', likes: '26', ig: 'https://www.instagram.com/reel/DZVNGZ8q9cA/' },
  { src: 'https://res.cloudinary.com/dmk6udelj/video/upload/v1782759823/v3_csqzaw.mp4', views: '7,200', likes: '41', ig: 'https://www.instagram.com/reel/DY9VB8zKvR9/' },
  { src: 'https://res.cloudinary.com/dmk6udelj/video/upload/v1782759808/v5_lwubom.mp4', views: '22,500', likes: '40', ig: 'https://www.instagram.com/reel/DZ7AwZbFSSB/' },
  { src: 'https://res.cloudinary.com/dmk6udelj/video/upload/v1782758938/v6_yk8wws.mp4', views: '10,400', likes: '48', ig: 'https://www.instagram.com/reel/DZj1Ng6EUJF/' },
  { src: 'https://res.cloudinary.com/dmk6udelj/video/upload/v1782758883/v7_efsoow.mp4', views: '17,400', likes: '35', ig: 'https://www.instagram.com/reel/DYDjtPmFJ9h/' },
  { src: 'https://res.cloudinary.com/dmk6udelj/video/upload/v1782758885/v8_uajljt.mp4', views: '28,000', likes: '190', ig: 'https://www.instagram.com/reel/DZwtRNpj9MA/' },
  { src: 'https://res.cloudinary.com/dmk6udelj/video/upload/v1782758910/v9_qzi4ue.mp4', views: '2,700', likes: '45', ig: 'https://www.instagram.com/reel/DaJIEVdxOK9/' },
  { src: 'https://res.cloudinary.com/dmk6udelj/video/upload/v1782758880/v10_xuks7l.mp4', views: '21,500', likes: '160', ig: 'https://www.instagram.com/reel/DZ9u6uvIjV6/' },
  { src: 'https://res.cloudinary.com/dmk6udelj/video/upload/v1782759070/v11_ujzpi0.mp4', views: '3,200', likes: '25', ig: 'https://www.instagram.com/reel/DaA70nqIqTE/' },
]

export default function SocialPage() {
  return (
    <div style={{ background: '#F5F0E8', minHeight: '100vh' }}>
      <Nav />

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
        <p style={{ fontSize: '1rem', lineHeight: 1.8, color: 'rgba(13,34,64,0.6)', maxWidth: '520px', fontFamily: "'DM Sans', sans-serif", fontWeight: 300, marginBottom: '2rem' }}>
          Short-form video content created for local brands in Birmingham —
        </p>

        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem', maxWidth: '700px', marginBottom: '1rem' }}>
          {[
            { brand: 'Via Delhi', views: '85.8%', likes: '66.2%' },
            { brand: 'Londis', views: '229%', likes: '570%' },
            { brand: "Diya's", views: '73.8%', likes: '73.2%' },
          ].map(({ brand, views, likes }) => (
            <div key={brand} style={{ padding: '1.25rem', background: 'rgba(13,34,64,0.05)', borderRadius: '8px', border: '1px solid rgba(13,34,64,0.08)' }}>
              <p style={{ fontSize: '0.65rem', letterSpacing: '0.15em', textTransform: 'uppercase', color: 'rgba(13,34,64,0.4)', fontFamily: "'DM Sans', sans-serif", marginBottom: '0.75rem' }}>{brand}</p>
              <p style={{ fontFamily: "'Abril Fatface', serif", fontSize: '1.4rem', color: '#0D2240', lineHeight: 1, marginBottom: '0.25rem' }}>{views} <span style={{ fontSize: '0.7rem', fontFamily: "'DM Sans', sans-serif", fontWeight: 300, color: 'rgba(13,34,64,0.5)' }}>views</span></p>
              <p style={{ fontFamily: "'Abril Fatface', serif", fontSize: '1.4rem', color: '#0D2240', lineHeight: 1 }}>{likes} <span style={{ fontSize: '0.7rem', fontFamily: "'DM Sans', sans-serif", fontWeight: 300, color: 'rgba(13,34,64,0.5)' }}>likes</span></p>
            </div>
          ))}
        </div>
        <p style={{ fontSize: '0.78rem', color: 'rgba(13,34,64,0.4)', fontFamily: "'DM Sans', sans-serif", fontStyle: 'italic' }}>Growth achieved within one month of starting.</p>
      </div>

      {/* Video grid */}
      <div style={{ padding: '0 3rem 6rem', maxWidth: '1100px', margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '2rem' }}>
          {videos.map((v, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <div style={{ borderRadius: '12px', overflow: 'hidden', background: '#000', aspectRatio: '9/16' }}>
                <video
                  src={v.src}
                  controls
                  playsInline
                  preload="metadata"
                  style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0 0.25rem' }}>
                <div style={{ display: 'flex', gap: '1rem' }}>
                  <span style={{ fontSize: '0.78rem', color: 'rgba(13,34,64,0.55)', fontFamily: "'DM Sans', sans-serif" }}>👁 {v.views}</span>
                  <span style={{ fontSize: '0.78rem', color: 'rgba(13,34,64,0.55)', fontFamily: "'DM Sans', sans-serif" }}>❤ {v.likes}</span>
                </div>
                <a href={v.ig} target="_blank" rel="noopener noreferrer" style={{ fontSize: '0.72rem', color: 'rgba(13,34,64,0.45)', fontFamily: "'DM Sans', sans-serif", textDecoration: 'none', letterSpacing: '0.05em', borderBottom: '1px solid rgba(13,34,64,0.2)' }}>
                  Instagram ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
