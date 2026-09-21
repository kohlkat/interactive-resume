import { stationPose, TOUR } from '../scene/stations'

type Props = {
  unlocked: Record<string, boolean>
}

const steel = { color: '#9aa8bc', metalness: 0.82, roughness: 0.22 }

export function ThreeScene({ unlocked }: Props) {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.04, 0]}>
        <circleGeometry args={[5.1, 80]} />
        <meshStandardMaterial color="#0b0f16" metalness={0.25} roughness={0.86} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.02, 0]}>
        <ringGeometry args={[3.28, 3.36, 96]} />
        <meshStandardMaterial color="#1c3f45" emissive="#134e4a" emissiveIntensity={0.18} />
      </mesh>

      <group>
        <mesh position={[0, 0.08, 0]}>
          <cylinderGeometry args={[0.42, 0.42, 0.04, 40]} />
          <meshStandardMaterial {...steel} />
        </mesh>
        <mesh position={[0, 0.42, 0]}>
          <cylinderGeometry args={[0.01, 0.01, 0.64, 12]} />
          <meshStandardMaterial color="#5eead4" metalness={0.4} roughness={0.25} emissive="#115e59" emissiveIntensity={0.35} />
        </mesh>
      </group>

      {TOUR.map((stop, i) => {
        const pose = stationPose(i)
        const on = !!unlocked[stop.id]
        return (
          <group key={stop.id} position={pose.position}>
            <mesh position={[0, 0.05, 0]}>
              <cylinderGeometry args={[0.16, 0.18, 0.06, 24]} />
              <meshStandardMaterial color="#121820" metalness={0.5} roughness={0.45} />
            </mesh>
            <mesh position={[0, 0.28, 0]}>
              <cylinderGeometry args={[0.012, 0.016, 0.4, 12]} />
              <meshStandardMaterial {...steel} />
            </mesh>
            <mesh position={[0, 0.5, 0]}>
              <sphereGeometry args={[0.045, 24, 24]} />
              <meshStandardMaterial
                color={on ? '#5eead4' : '#7c8aa0'}
                metalness={0.35}
                roughness={0.2}
                emissive={on ? '#0f766e' : '#1e293b'}
                emissiveIntensity={on ? 0.7 : 0.15}
              />
            </mesh>
          </group>
        )
      })}
    </group>
  )
}
