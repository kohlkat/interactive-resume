import React from 'react'
import { Link } from 'react-router-dom'
import resumeText from '../content/resumeText'

export default function ResumePage() {
  return (
    <div className="page">
      <div className="page-nav">
        <Link className="pill" to="/">← Scene</Link>
        <Link className="pill" to="/cover">Cover letter</Link>
        <a className="pill" href="/docs/David%20Kohler%20resume.docx" download>Download DOCX</a>
      </div>
      <h1>Resume</h1>
      <p style={{ color: 'var(--muted)', marginTop: 8 }}>
        David Kohler · Robot Operator / VR Specialist · github.com/kohlkat
      </p>
      <div className="doc-actions">
        <a className="pill" href="mailto:Dkohlkat@gmail.com">Email</a>
        <a className="pill" href="https://github.com/kohlkat" target="_blank" rel="noreferrer">GitHub</a>
      </div>
      <article className="card doc">{resumeText}</article>
    </div>
  )
}
