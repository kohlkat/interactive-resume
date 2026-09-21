import React, { useMemo, Suspense } from 'react'
import { MeshTransmissionMaterial, Float as DreiFloat, Html } from '@react-three/drei'
import achievements from '../data/achievements'
import SmartScene from './SmartScene'

type Props = { unlocked: Record<string, boolean> }

export function ThreeScene({ unlocked }: Props) {
  const positions = useMemo(() => {
    const r = 3.2
    const angs = [0, 1, 2, 3, 4, 5, 6].map(i => (i / 7) * Math.PI * 2)
    return angs.map(a => [Math.cos(a) * r, 0.6, Math.sin(a) * r] as [number,number,number])
  }, [])

  const ids = ['sage274', 'sim', 'kuka', 'xrpl', 'pipeline', 'vaguely', 'hcp']

  return (
    <group>
      {ids.map((id, i) => {
        const a = achievements.find(x => x.id === id)!
        const isOn = unlocked[id]
        return (
          <DreiFloat key={id} floatIntensity={isOn ? 2 : 0.6} speed={1.2}>
            <group position={positions[i]} rotation={[0, i * 0.4, 0]}>
              <mesh>
                <boxGeometry args={[0.9, 0.18, 1.4]} />
                <MeshTransmissionMaterial
                  thickness={0.35}
                  transmission={1}
                  roughness={0.2}
                  ior={1.4}
                  chromaticAberration={0.02}
                  anisotropy={0.1}
                  attenuationDistance={2}
                  attenuationColor={isOn ? '#34d399' : '#64748b'}
                  transparent
                />
              </mesh>

              {isOn ? (
                <SmartScene
                  id={a.id}
                  glb={a.scene}
                  position={[0,0.15,0]}
                  rotation={[0,0,0]}
                  scale={a.sceneTransform?.scale ?? 1}
                />
              ) : null}
            </group>
          </DreiFloat>
        )
      })}
      <mesh rotation={[-Math.PI/2,0,0]} position={[0,-0.01,0]}>
        <circleGeometry args={[5.5, 48]} />
        <meshStandardMaterial color={'#111827'} metalness={0.2} roughness={0.9} />
      </mesh>
    </group>
  )
}
