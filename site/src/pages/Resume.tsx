import { Link } from 'react-router-dom'
import { resumePublic } from '../content/documents'

export default function ResumePage() {
  return (
    <div className="page">
      <div className="page-nav">
        <Link className="pill" to="/">← Scene</Link>
        <Link className="pill" to="/cover">Cover letter</Link>
        <a className="pill" href="/docs/David%20Kohler%20resume.docx" download>Download resume (.docx)</a>
        <a className="pill" href="/docs/David%20Kohler%20resume.txt" download>Download resume (.txt)</a>
      </div>
      <h1>Resume</h1>
      <p style={{ color: 'var(--muted)', marginTop: 8 }}>
        David Kohler · Robotics software, controls, and full-stack · Pittsburgh
      </p>
      <p className="privacy-note">Mailing address is only in the downloaded file.</p>
      <article className="card doc">{resumePublic}</article>
    </div>
  )
}
