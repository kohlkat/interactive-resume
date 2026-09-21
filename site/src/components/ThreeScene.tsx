import { Html } from '@react-three/drei'
import { stationPose, TOUR } from '../scene/stations'
import achievements from '../data/achievements'

type Props = {
  unlocked: Record<string, boolean>
}

function Glyph({ id, on }: { id: string; on: boolean }) {
  const color = on ? '#5eead4' : '#64748b'
  if (id === 'sage274') {
    return (
      <group position={[0, 0.55, 0]}>
        <mesh position={[-0.28, 0.15, 0]}><boxGeometry args={[0.08, 0.55, 0.08]} /><meshStandardMaterial color={color} /></mesh>
        <mesh position={[0.28, 0.15, 0]}><boxGeometry args={[0.08, 0.55, 0.08]} /><meshStandardMaterial color={color} /></mesh>
        <mesh position={[0, 0.42, 0]}><boxGeometry args={[0.7, 0.06, 0.08]} /><meshStandardMaterial color={color} /></mesh>
        <mesh position={[0, 0.02, 0]}><boxGeometry args={[0.72, 0.06, 0.46]} /><meshStandardMaterial color="#9ca3af" metalness={0.4} roughness={0.4} /></mesh>
      </group>
    )
  }
  if (id === 'kuka') {
    return (
      <group position={[0, 0.42, 0]}>
        <mesh position={[0, 0.05, 0]}><cylinderGeometry args={[0.16, 0.2, 0.12, 12]} /><meshStandardMaterial color="#f0ad4e" /></mesh>
        <mesh position={[0, 0.28, 0.08]} rotation={[0.5, 0, 0]}><boxGeometry args={[0.1, 0.42, 0.1]} /><meshStandardMaterial color="#f0ad4e" /></mesh>
        <mesh position={[0, 0.48, 0.22]}><boxGeometry args={[0.08, 0.28, 0.08]} /><meshStandardMaterial color="#374151" /></mesh>
      </group>
    )
  }
  if (id === 'hcp') {
    return (
      <group position={[0, 0.48, 0]}>
        {[0, 1, 2].map((i) => (
          <mesh key={i} position={[0, i * 0.16, 0]}>
            <boxGeometry args={[0.46, 0.12, 0.28]} />
            <meshStandardMaterial color={i === 1 && on ? '#34d399' : '#1f2937'} />
          </mesh>
        ))}
      </group>
    )
  }
  if (id === 'xrpl') {
    return (
      <group position={[0, 0.55, 0]}>
        {[[-0.16, 0, 0], [0.16, 0.08, 0.05], [0, 0.18, -0.1]].map((p, i) => (
          <mesh key={i} position={p as [number, number, number]}>
            <sphereGeometry args={[0.08, 16, 16]} />
            <meshStandardMaterial color={on ? '#60a5fa' : '#64748b'} emissive={on ? '#1d4ed8' : '#000'} emissiveIntensity={0.4} />
          </mesh>
        ))}
      </group>
    )
  }
  if (id === 'pipeline') {
    return (
      <group position={[0, 0.5, 0]}>
        <mesh rotation={[0, 0, Math.PI / 2]}><cylinderGeometry args={[0.04, 0.04, 0.7, 8]} /><meshStandardMaterial color={color} /></mesh>
        <mesh position={[-0.28, 0, 0]}><boxGeometry args={[0.14, 0.14, 0.14]} /><meshStandardMaterial color="#34d399" /></mesh>
        <mesh position={[0.28, 0, 0]}><octahedronGeometry args={[0.1]} /><meshStandardMaterial color="#60a5fa" /></mesh>
      </group>
    )
  }
  if (id === 'vaguely') {
    return (
      <group position={[0, 0.48, 0]}>
        <mesh><boxGeometry args={[0.5, 0.32, 0.04]} /><meshStandardMaterial color="#111827" /></mesh>
        <mesh position={[0, -0.2, 0.08]} rotation={[0.4, 0, 0]}><boxGeometry args={[0.5, 0.04, 0.28]} /><meshStandardMaterial color="#374151" /></mesh>
      </group>
    )
  }
  return (
    <group position={[0, 0.5, 0]}>
      {[0, 1, 2].map((i) => (
        <mesh key={i} position={[(i - 1) * 0.16, i * 0.05, 0]}>
          <boxGeometry args={[0.12, 0.12 + i * 0.04, 0.12]} />
          <meshStandardMaterial color={on ? '#a78bfa' : '#64748b'} />
        </mesh>
      ))}
    </group>
  )
}

export function ThreeScene({ unlocked }: Props) {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]} receiveShadow>
        <circleGeometry args={[7.2, 64]} />
        <meshStandardMaterial color="#0c1018" metalness={0.15} roughness={0.9} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.001, 0]}>
        <ringGeometry args={[4.35, 4.48, 64]} />
        <meshStandardMaterial color="#134e4a" emissive="#115e59" emissiveIntensity={0.35} />
      </mesh>

      <group position={[0, 0, 0]}>
        <mesh position={[0, 0.28, 0]}>
          <boxGeometry args={[1.5, 0.1, 1.05]} />
          <meshStandardMaterial color="#1f2937" metalness={0.2} roughness={0.7} />
        </mesh>
        <mesh position={[-0.55, 0.62, 0]}>
          <boxGeometry args={[0.08, 0.7, 0.08]} />
          <meshStandardMaterial color="#5eead4" />
        </mesh>
        <mesh position={[0.55, 0.62, 0]}>
          <boxGeometry args={[0.08, 0.7, 0.08]} />
          <meshStandardMaterial color="#5eead4" />
        </mesh>
        <mesh position={[0, 0.96, 0]}>
          <boxGeometry args={[1.25, 0.07, 0.08]} />
          <meshStandardMaterial color="#5eead4" />
        </mesh>
        <Html position={[0, 1.25, 0]} center distanceFactor={8} zIndexRange={[10, 0]} style={{ pointerEvents: 'none' }}>
          <div className="station-label center-label">
            <strong>CNC cell</strong>
            <span>Drag to orbit. Each stop is a project.</span>
          </div>
        </Html>
      </group>

      {TOUR.map((stop, i) => {
        const pose = stationPose(i)
        const achievement = achievements.find((a) => a.id === stop.id)
        const on = !!unlocked[stop.id]
        return (
          <group key={stop.id} position={pose.position}>
            <mesh position={[0, 0.08, 0]}>
              <cylinderGeometry args={[0.42, 0.48, 0.16, 20]} />
              <meshStandardMaterial color={on ? '#134e4a' : '#111827'} />
            </mesh>
            <mesh position={[0, 0.28, 0]}>
              <cylinderGeometry args={[0.08, 0.1, 0.28, 12]} />
              <meshStandardMaterial color={on ? '#34d399' : '#334155'} />
            </mesh>
            <Glyph id={stop.id} on={on} />
            <Html position={[0, 1.35, 0]} center distanceFactor={8} zIndexRange={[20, 0]} style={{ pointerEvents: 'none' }}>
              <div className={`station-label${on ? ' open' : ''}`}>
                <strong>{i + 1}. {stop.short}</strong>
                <span>{on ? achievement?.title : achievement?.lockedBlurb ?? stop.blurb}</span>
              </div>
            </Html>
          </group>
        )
      })}
    </group>
  )
}
