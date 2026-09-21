import React from 'react'
import { Link } from 'react-router-dom'
import QrCard from '../components/QrCard'

export default function ContactPage() {
  const url =
    typeof window !== 'undefined'
      ? window.location.origin + (import.meta.env.BASE_URL ?? '/')
      : ''
  return (
    <div className="page">
      <div className="page-nav">
        <Link className="pill" to="/">← Scene</Link>
        <Link className="pill" to="/resume">Resume</Link>
      </div>
      <h1>Contact</h1>
      <p style={{ color: 'var(--muted)' }}>
        David Kohler · Dkohlkat@gmail.com · (412) 526-6764 · github.com/kohlkat
      </p>
      <div style={{ marginTop: 16, display: 'grid', gap: 12 }}>
        <QrCard url={url} />
      </div>
    </div>
  )
}
