import { useEffect, useMemo, useState } from 'react'
import { create } from 'zustand'

type UnlockMap = Record<string, boolean>

type Store = {
  unlocked: UnlockMap
  setUnlocked: (id: string, value: boolean) => void
  resetAll: () => void
}

const useStore = create<Store>((set) => ({
  unlocked: { sage274:false, sim:false, kuka:false, xrpl:false, hcp:false, pipeline:false, vaguely:false },
  setUnlocked: (id, value) => set(s => ({ unlocked: { ...s.unlocked, [id]: value } })),
  resetAll: () => set(() => ({ unlocked: { sage274:false, sim:false, kuka:false, xrpl:false, hcp:false, pipeline:false, vaguely:false } }))
}))

function useKeyChallenges() {
  const unlocked = useStore(s => s.unlocked)
  const setUnlocked = useStore(s => s.setUnlocked)
  const resetAll = useStore(s => s.resetAll)
  const [hintIdx, setHintIdx] = useState(0)

  const hints = useMemo(() => [
    'Press R then N to reveal SAGE274 achievements.',
    'Hold SPACE for ~2 seconds to unlock Simulation & Training Architecture.',
    'Tap ↑ → ↓ ← (arrow keys) in that order for the KUKA / Omniverse rig.',
    'Press 1 for XRPL Arbitrage Bot.',
    'Type PIPE to unlock the Chat Export → Local AI → Obsidian+Neo4j pipeline.',
    'Type SITE to unlock the Vaguely Media website rebuild.',
    'Type G P U or press 3 to unlock the Homebrew HCP cluster.',
    'All done? Reset anytime with the button in the top-right.'
  ], [])

  useEffect(() => {
    let spaceHoldTimer: number | null = null
    let seqRN = ''
    let seqArrows = ''
    let seqGPU = ''
    let seqPIPE = ''
    let seqSITE = ''

    const onKeyDown = (e: KeyboardEvent) => {
      const k = e.key

      if (!unlocked.sage274) {
        if ((k === 'r' || k === 'R') && seqRN === '') seqRN = 'R'
        else if ((k === 'n' || k === 'N') && seqRN === 'R') {
          seqRN = 'RN'
          setUnlocked('sage274', true)
          setHintIdx(1)
        } else if (k.length === 1) {
          seqRN = ''
        }
      }

      if (!unlocked.sim) {
        if (k === ' ') {
          if (spaceHoldTimer == null) {
            spaceHoldTimer = window.setTimeout(() => {
              setUnlocked('sim', true)
              setHintIdx(2)
            }, 1800)
          }
        }
      }

      if (!unlocked.kuka) {
        const map: Record<string, string> = { ArrowUp: 'U', ArrowRight: 'R', ArrowDown: 'D', ArrowLeft: 'L' }
        if (k in map) {
          const target = 'URDL'
          seqArrows = (seqArrows + map[k]).slice(-4)
          if (seqArrows === target) {
            setUnlocked('kuka', true)
            setHintIdx(3)
          }
        }
      }

      if (k === '1' && !unlocked.xrpl) {
        setUnlocked('xrpl', true)
        setHintIdx(4)
      }

      if (!unlocked.pipeline) {
        const t = 'PIPE'
        if (/^[a-zA-Z]$/.test(k)) {
          seqPIPE = (seqPIPE + k.toUpperCase()).slice(-4)
          if (seqPIPE === t) {
            setUnlocked('pipeline', true)
            setHintIdx(5)
          }
        }
      }

      if (!unlocked.vaguely) {
        const t = 'SITE'
        if (/^[a-zA-Z]$/.test(k)) {
          seqSITE = (seqSITE + k.toUpperCase()).slice(-4)
          if (seqSITE === t) {
            setUnlocked('vaguely', true)
            setHintIdx(6)
          }
        }
      }

      if (!unlocked.hcp) {
        if (k === '3') {
          setUnlocked('hcp', true)
          setHintIdx(7)
        } else if (['g','G','p','P','u','U'].includes(k)) {
          seqGPU = (seqGPU + k.toUpperCase()).slice(-3)
          if (seqGPU === 'GPU') {
            setUnlocked('hcp', true)
            setHintIdx(7)
          }
        }
      }
    }

    const onKeyUp = (e: KeyboardEvent) => {
      if (e.key === ' ' && spaceHoldTimer != null) {
        clearTimeout(spaceHoldTimer)
        spaceHoldTimer = null
      }
    }

    window.addEventListener('keydown', onKeyDown)
    window.addEventListener('keyup', onKeyUp)
    return () => {
      window.removeEventListener('keydown', onKeyDown)
      window.removeEventListener('keyup', onKeyUp)
    }
  }, [setUnlocked, unlocked])

  const progress = useMemo(() => {
    const values = Object.values(unlocked)
    const n = values.length
    const done = values.filter(Boolean).length
    return Math.round((done / n) * 100)
  }, [unlocked])

  return { unlocked, currentHint: hints[hintIdx], progress, resetAll }
}

export default useKeyChallenges
