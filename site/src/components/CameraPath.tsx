import { useFrame, useThree } from '@react-three/fiber'
import { useMemo } from 'react'
import * as THREE from 'three'
import { stationPose, TOUR } from '../scene/stations'

export default function CameraPath({ t, enabled }: { t: number; enabled: boolean }) {
  const { camera } = useThree()
  const camPos = useMemo(() => new THREE.Vector3(), [])
  const look = useMemo(() => new THREE.Vector3(), [])

  useFrame(() => {
    if (!enabled) return
    const segments = TOUR.length - 1
    const f = THREE.MathUtils.clamp(t, 0, 1) * segments
    const i = Math.min(segments - 1, Math.floor(f))
    const u = f - i
    const a = stationPose(i)
    const b = stationPose(i + 1)
    camPos.lerpVectors(a.cam, b.cam, u)
    look.lerpVectors(a.look, b.look, u)
    camera.position.lerp(camPos, 0.18)
    camera.lookAt(look)
  })

  return null
}
