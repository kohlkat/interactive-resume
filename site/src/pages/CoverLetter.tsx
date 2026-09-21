import React from 'react'
import { Link } from 'react-router-dom'
import coverText from '../content/coverText'

export default function CoverLetterPage() {
  return (
    <div className="page">
      <div className="page-nav">
        <Link className="pill" to="/">← Scene</Link>
        <Link className="pill" to="/resume">Resume</Link>
        <a className="pill" href="/docs/David%20Kohler%20cover%20letter.docx" download>Download DOCX</a>
      </div>
      <h1>Cover letter</h1>
      <p style={{ color: 'var(--muted)', marginTop: 8 }}>Skild AI · Robot Operator / VR Specialist · Aug 27, 2025</p>
      <article className="card doc" style={{ marginTop: 18 }}>{coverText}</article>
    </div>
  )
}
