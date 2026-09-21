import * as THREE from 'three'

export const TOUR = [
  { id: 'sage274', short: 'SAGE-274', blurb: 'Sensor-aware G-code on the cell' },
  { id: 'sim', short: 'Simulation', blurb: 'Isaac / OpenUSD training scenes' },
  { id: 'kuka', short: 'KUKA', blurb: 'Make a part, then pick it up' },
  { id: 'xrpl', short: 'XRPL', blurb: 'Market infrastructure' },
  { id: 'pipeline', short: 'Pipeline', blurb: 'Chat export to a knowledge graph' },
  { id: 'vaguely', short: 'Vaguely', blurb: 'Full-stack booking platform' },
  { id: 'hcp', short: 'HCP', blurb: 'Homebrew compute cluster' },
] as const

export type StationId = (typeof TOUR)[number]['id']

const RING = 3.55

export function stationPosition(index: number) {
  const a = (index / TOUR.length) * Math.PI * 2 - Math.PI / 2
  return new THREE.Vector3(Math.cos(a) * RING, 0, Math.sin(a) * RING)
}

export function stationPose(index: number) {
  const p = stationPosition(index)
  const outward = p.clone().normalize()
  const cam = p.clone().add(outward.multiplyScalar(3.5))
  cam.y = 2.15
  const look = p.clone()
  look.y = 1.05
  return { position: p, cam, look }
}
