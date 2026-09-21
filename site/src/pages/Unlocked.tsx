import React from 'react'
import { Link } from 'react-router-dom'
import achievements from '../data/achievements'
import useKeyChallenges from '../hooks/useKeyChallenges'

export default function UnlockedPage() {
  const { unlocked, progress, resetAll } = useKeyChallenges()
  const list = achievements.filter((a) => unlocked[a.id])

  return (
    <div className="page">
      <div className="page-nav">
        <Link className="pill" to="/">← Scene</Link>
        <button type="button" className="pill ghost" onClick={resetAll}>Reset</button>
      </div>
      <h1>Unlocked Achievements</h1>
      <p style={{ color: 'var(--muted)' }}>Progress: {progress}%</p>
      <div className="grid" style={{ marginTop: 12 }}>
        {list.length === 0 ? (
          <div className="card">Nothing unlocked yet — return to the scene and try the key challenges.</div>
        ) : (
          list.map((a) => (
            <div key={a.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 8 }}>
                <strong>{a.title}</strong>
                <span className="badge" style={{ color: 'var(--ok)' }}>Unlocked</span>
              </div>
              <p style={{ marginTop: 8, opacity: 0.9 }}>{a.description}</p>
              {a.highlights?.length ? (
                <ul style={{ margin: '8px 0 0 16px' }}>
                  {a.highlights.map((h, i) => (
                    <li key={i}>{h}</li>
                  ))}
                </ul>
              ) : null}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
