import { useState } from 'react'
import { Link } from 'react-router-dom'
import { chapters } from '../briefing/chapters'

export default function Briefing() {
  const [open, setOpen] = useState<string>('sage')

  return (
    <main className="brief">
      <header className="brief-hero">
        <p className="eyebrow">Kohlkat</p>
        <h1>David Kohler</h1>
        <p className="brief-place">Pittsburgh</p>
        <p className="brief-lead">
          I keep old machines able to run yesterday’s programs, and I teach the new ones to feel what they are cutting.
        </p>
      </header>

      <section className="chapters" aria-label="Work">
        {chapters.map((chapter, index) => {
          const isOpen = open === chapter.id
          return (
            <article key={chapter.id} className={isOpen ? 'chapter open' : 'chapter'}>
              <button
                type="button"
                aria-expanded={isOpen}
                onClick={() => setOpen(isOpen ? '' : chapter.id)}
              >
                <span className="num">{String(index + 1).padStart(2, '0')}</span>
                <span>
                  <strong>{chapter.title}</strong>
                  <span className="kicker">{chapter.kicker}</span>
                </span>
              </button>
              {isOpen ? <p className="chapter-body">{chapter.body}</p> : null}
            </article>
          )
        })}
      </section>

      <section className="brief-file" aria-label="Export">
        <div className="file-row">
          <a className="file-link" href="/docs/David%20Kohler%20resume.docx" download>Resume</a>
          <a className="file-link" href="/docs/David%20Kohler%20cover%20letter.docx" download>Cover letter</a>
          <Link className="file-link" to="/resume">Read it here</Link>
        </div>
      </section>

      <footer className="brief-foot">
        <a href="mailto:Dkohlkat@gmail.com">Dkohlkat@gmail.com</a>
        <a href="tel:+14125266764">(412) 526-6764</a>
        <a href="https://github.com/kohlkat" target="_blank" rel="noreferrer">github.com/kohlkat</a>
        <Link to="/contact">vCard</Link>
      </footer>
    </main>
  )
}
