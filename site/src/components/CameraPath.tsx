import { useFrame, useThree } from '@react-three/fiber'
import React, { useMemo } from 'react'
import * as THREE from 'three'

export default function CameraPath({ t }: { t: number }) {
  const { camera } = useThree()
  const curve = useMemo(() => {
    const pts = [
      new THREE.Vector3(7, 3, 8),
      new THREE.Vector3(5, 2.5, 4),
      new THREE.Vector3(3, 2.2, 2),
      new THREE.Vector3(1.5, 2.0, 1.2),
      new THREE.Vector3(0, 1.8, 0),
      new THREE.Vector3(-1.5, 1.9, -0.8),
      new THREE.Vector3(-3, 2.2, -1.6),
    ]
    return new THREE.CatmullRomCurve3(pts, false, 'catmullrom', 0.2)
  }, [])

  useFrame(() => {
    const pos = new THREE.Vector3()
    curve.getPointAt(THREE.MathUtils.clamp(t, 0, 1), pos)
    camera.position.lerp(pos, 0.12)
    camera.lookAt(0, 1.6, 0)
  })

  return null
}
