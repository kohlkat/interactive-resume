import React, { Suspense, useEffect, useMemo, useState } from 'react'
import { Html } from '@react-three/drei'
import { SceneLoader } from './SceneLoader'

// Dynamically discover any gltfjsx TSX components placed in src/models/*.tsx
// Keys are normalized filenames (letters+digits only, lowercase), e.g. "rs274", "kuka", "pipeline".
const sceneModules = import.meta.glob('../models/*.tsx')

function normalize(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]/g, '')
}

export default function SmartScene({
  id,
  glb,
  position=[0,0,0],
  rotation=[0,0,0],
  scale=1
}: {
  id: string,
  glb?: string,
  position?: [number,number,number],
  rotation?: [number,number,number],
  scale?: number
}) {
  const [Comp, setComp] = useState<React.LazyExoticComponent<React.ComponentType<any>> | null>(null)

  const tryLoad = useMemo(() => {
    const aliases = id.toLowerCase() === 'sage274' ? ['sage274','rs274'] : [id]
    // try exact match, then variants with "-model" or "-scene" suffix
    const candidates = aliases.flatMap(base => [base, base + '-model', base + '-scene']).map(normalize)
    const byKey: Record<string, () => Promise<any>> = {}
    for (const path in sceneModules) {
      const file = path.split('/').pop() || ''
      const base = normalize(file.replace(/\.(tsx|jsx)$/, ''))
      byKey[base] = sceneModules[path] as () => Promise<any>
    }
    for (const key of candidates) {
      if (byKey[key]) return byKey[key]
    }
    return null
  }, [id])

  useEffect(() => {
    let active = true
    if (tryLoad) {
      tryLoad().then(mod => {
        if (!active) return
        // gltfjsx usually exports default component named Model
        const C = React.lazy(async () => mod)
        setComp(() => C)
      }).catch(() => setComp(null))
    } else {
      setComp(null)
    }
    return () => { active = false }
  }, [tryLoad])

  if (Comp) {
    return (
      <Suspense fallback={<Html center>loading…</Html>}>
        <group position={position} rotation={rotation}>
          <Comp />
        </group>
      </Suspense>
    )
  }

  // Fallback to GLB loader if no TSX component is found
  if (glb) {
    return (
      <Suspense fallback={<Html center>loading…</Html>}>
        <group position={position} rotation={rotation}>
          <SceneLoader src={glb} position={[0,0,0]} rotation={[0,0,0]} scale={scale} />
        </group>
      </Suspense>
    )
  }

  return null
}
