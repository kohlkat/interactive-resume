// Example gltfjsx-style component (replace with your converted TSX)
// You can generate a real one via:
//   npx gltfjsx public/models/rs274.glb -o src/models/rs274.tsx --transform
import * as THREE from 'three'
import React from 'react'

export default function Rs274() {
  return (
    <mesh>
      <boxGeometry args={[0.4, 0.2, 0.6]} />
      <meshStandardMaterial color="#3b82f6" metalness={0.2} roughness={0.3} />
    </mesh>
  )
}
