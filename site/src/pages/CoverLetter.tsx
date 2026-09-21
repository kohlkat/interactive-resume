import { Link } from 'react-router-dom'
import { coverPublic } from '../content/documents'

export default function CoverLetterPage() {
  return (
    <div className="page">
      <div className="page-nav">
        <Link className="pill" to="/">← Scene</Link>
        <Link className="pill" to="/resume">Resume</Link>
        <a className="pill" href="/docs/David%20Kohler%20cover%20letter.docx" download>Download cover letter (.docx)</a>
        <a className="pill" href="/docs/David%20Kohler%20cover%20letter.txt" download>Download cover letter (.txt)</a>
      </div>
      <h1>Cover letter</h1>
      <p style={{ color: 'var(--muted)', marginTop: 8 }}>
        General letter for robotics software, controls, simulation, or full-stack roles.
      </p>
      <p className="privacy-note">Mailing address is only in the downloaded file.</p>
      <article className="card doc">{coverPublic}</article>
    </div>
  )
}
