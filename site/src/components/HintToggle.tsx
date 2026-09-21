import { useState } from 'react'
import useKeyChallenges from '../hooks/useKeyChallenges'

export default function HintToggle() {
  const [show, setShow] = useState(false)
  const { currentHint } = useKeyChallenges()
  return (
    <div className="hint-row">
      <button type="button" className="pill" onClick={() => setShow((s) => !s)}>
        {show ? 'Hide hints' : 'Show hints'}
      </button>
      {show ? <p className="hint-copy">{currentHint}</p> : null}
    </div>
  )
}
