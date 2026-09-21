import React from 'react'
import { useGLTF } from '@react-three/drei'

function SceneLoaderInner({
  src,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: {
  src: string
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
}) {
  const { scene } = useGLTF(src)
  const clone = scene.clone(true)
  clone.position.set(position[0], position[1], position[2])
  clone.rotation.set(rotation[0], rotation[1], rotation[2])
  clone.scale.setScalar(scale)
  return <primitive object={clone} />
}

export function SceneLoader({
  src,
  position = [0, 0, 0],
  rotation = [0, 0, 0],
  scale = 1,
}: {
  src: string
  position?: [number, number, number]
  rotation?: [number, number, number]
  scale?: number
}) {
  const allow = import.meta.env.VITE_USE_MODELS === '1' && !!src
  if (!allow) return null
  return <SceneLoaderInner src={src} position={position} rotation={rotation} scale={scale} />
}
