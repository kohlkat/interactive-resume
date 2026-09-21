import { useState } from 'react'
import { Link } from 'react-router-dom'
import { chapters } from '../briefing/chapters'

export default function Briefing() {
  const [open, setOpen] = useState<string>('sage')
  const chapter = chapters.find((item) => item.id === open) ?? chapters[0]

  return (
    <main className="window">
      <div className="titlebar">
        <span className="gem" aria-hidden="true" />
        <span className="titlebar-name">Kohlkat</span>
        <span className="titlebar-place">Pittsburgh</span>
      </div>

      <div className="mast">
        <h1>David Kohler</h1>
        <p className="brief-lead">
          I keep old machines able to run yesterday’s programs, and I teach the new ones to feel what they are cutting.
        </p>
      </div>

      <div className="tab-row" role="tablist" aria-label="Work">
        {chapters.map((item) => {
          const isOpen = item.id === chapter.id
          return (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={isOpen}
              className={isOpen ? 'gel on' : 'gel'}
              onClick={() => setOpen(item.id)}
            >
              {item.title}
            </button>
          )
        })}
      </div>

      <article className="well" aria-live="polite">
        <p className="kicker">{chapter.kicker}</p>
        <h2>{chapter.title}</h2>
        <p>{chapter.body}</p>
      </article>

      <div className="file-row">
        <a className="gel" href="/docs/David%20Kohler%20resume.docx" download>Resume</a>
        <a className="gel" href="/docs/David%20Kohler%20cover%20letter.docx" download>Cover letter</a>
        <Link className="gel" to="/resume">Read it here</Link>
      </div>

      <footer className="dock">
        <a href="mailto:Dkohlkat@gmail.com">Dkohlkat@gmail.com</a>
        <a href="tel:+14125266764">(412) 526-6764</a>
        <a href="https://github.com/kohlkat" target="_blank" rel="noreferrer">github.com/kohlkat</a>
        <Link to="/contact">vCard</Link>
      </footer>
      <div className="mirror" aria-hidden="true" />
    </main>
  )
}
