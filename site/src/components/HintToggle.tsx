import React from 'react'
import useKeyChallenges from '../hooks/useKeyChallenges'

export default function HintToggle() {
  const [show, setShow] = React.useState(true)
  const { currentHint } = useKeyChallenges()
  return (
    <div style={{display:'flex', gap:8, alignItems:'center'}}>
      <span className="pill" onClick={()=>setShow(s=>!s)} style={{cursor:'pointer'}}>{show ? 'Hide hints' : 'Show hints'}</span>
      {show ? <div className="pill">{currentHint}</div> : null}
    </div>
  )
}
