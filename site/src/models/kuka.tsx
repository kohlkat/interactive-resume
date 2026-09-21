import * as THREE from 'three'
import React, { useMemo, useRef } from 'react'
import { useFrame } from '@react-three/fiber'

function lerp(a:number,b:number,t:number){return a+(b-a)*t}
function clamp01(x:number){return Math.max(0,Math.min(1,x))}
function ease(t:number){return t} // keep it raw "not motioned well"

function noisy(t:number, amp:number=0.02){ return (Math.sin(t*3.1)+Math.cos(t*2.2))*0.5*amp }

export default function KukaPowerOfOne(){
  // timeline (seconds)
  // 0-3   : approach stock with spindle/extruder
  // 3-10  : "fabricate" simple pass; stock shrinks; part appears
  // 10-13 : move to tool rack; swap to gripper
  // 13-18 : move to part; pick; lift
  // 18-20 : idle/hold
  const start = useRef<number>(0)
  const tRef = useRef<number>(0)
  const joints = useRef<number[]>([0,0,0,0,0])
  const gripper = useRef<number>(0.4) // opening width
  const showGripper = useRef<boolean>(false)

  // static geo/materials (low poly)
  const mats = useMemo(()=> ({
    robot: new THREE.MeshStandardMaterial({ color:'#f0ad4e', metalness:0.1, roughness:0.6 }),
    dark: new THREE.MeshStandardMaterial({ color:'#374151', metalness:0.2, roughness:0.8 }),
    steel: new THREE.MeshStandardMaterial({ color:'#9ca3af', metalness:0.6, roughness:0.4 }),
    table: new THREE.MeshStandardMaterial({ color:'#1f2937', metalness:0.0, roughness:0.95 }),
    stock: new THREE.MeshStandardMaterial({ color:'#b45309', metalness:0.0, roughness:0.8 }),
    part: new THREE.MeshStandardMaterial({ color:'#60a5fa', metalness:0.2, roughness:0.5 }),
  }),[])

  const baseRef = useRef<THREE.Group>(null!)
  const j1Ref = useRef<THREE.Group>(null!)
  const j2Ref = useRef<THREE.Group>(null!)
  const j3Ref = useRef<THREE.Group>(null!)
  const j4Ref = useRef<THREE.Group>(null!)
  const eeRef = useRef<THREE.Group>(null!)
  const spindleRef = useRef<THREE.Mesh>(null!)
  const gripL = useRef<THREE.Mesh>(null!)
  const gripR = useRef<THREE.Mesh>(null!)
  const stockRef = useRef<THREE.Mesh>(null!)
  const partRef = useRef<THREE.Mesh>(null!)

  useFrame(({clock})=>{
    if(!start.current) start.current = clock.getElapsedTime()
    const t = clock.getElapsedTime() - start.current
    tRef.current = t

    // simple keyframes
    // base/j1 rotates toward stock (x=0.6,z=0.2 area)
    const phaseA = clamp01((t-0)/3)
    const phaseB = clamp01((t-3)/7)
    const phaseC = clamp01((t-10)/3)
    const phaseD = clamp01((t-13)/5)

    // Plan rough angles
    const baseYaw = lerp(0.0, -0.5, phaseA) + noisy(t)
    const shldr = lerp(0.0, 0.6, phaseA) + (phaseB>0? lerp(0, -0.3, phaseB):0) + noisy(t)
    const elbow = lerp(0.0, -0.8, phaseA) + (phaseB>0? lerp(0, 0.6, phaseB):0) + noisy(t)
    const wrist = lerp(0.0, 0.5, phaseA) + (phaseB>0? lerp(0, -0.4, phaseB):0) + noisy(t)

    // Move to rack for tool change
    const toRack = phaseC
    const baseRack = lerp(baseYaw, 0.9, toRack)
    const shldrRack = lerp(shldr, 0.2, toRack)
    const elbowRack = lerp(elbow, -0.2, toRack)
    const wristRack = lerp(wrist, -0.2, toRack)

    // Move to pick
    const toPick = phaseD
    const basePick = lerp(baseRack, -0.3, toPick)
    const shldrPick = lerp(shldrRack, 0.55, toPick)
    const elbowPick = lerp(elbowRack, -0.65, toPick)
    const wristPick = lerp(wristRack, 0.35, toPick)

    joints.current = [basePick, shldrPick, elbowPick, wristPick, 0]

    // Tool visibility
    showGripper.current = t > 12.5
    if (spindleRef.current) spindleRef.current.visible = !showGripper.current
    if (gripL.current && gripR.current) {
      gripL.current.visible = showGripper.current
      gripR.current.visible = showGripper.current
    }

    // Gripper open/close
    gripper.current = t > 16 ? lerp(0.4, 0.06, clamp01((t-16)/0.8)) : 0.4
    if (gripL.current && gripR.current) {
      gripL.current.position.x = -gripper.current/2
      gripR.current.position.x =  gripper.current/2
    }

    // "Fabricate": shrink stock height, reveal part
    if (stockRef.current && partRef.current) {
      const cut = phaseB
      const h = lerp(0.25, 0.12, cut)
      stockRef.current.scale.set(0.35, h/0.25, 0.35)
      stockRef.current.position.y = 0.51 + h/2
      partRef.current.visible = t > 8.0
      if (partRef.current.visible) {
        const up = clamp01((t-8)/2)
        partRef.current.position.y = 0.52 + 0.06*up
      }
    }

    // Apply FK
    if (baseRef.current) baseRef.current.rotation.y = joints.current[0]
    if (j1Ref.current) j1Ref.current.rotation.z = joints.current[1]
    if (j2Ref.current) j2Ref.current.rotation.z = joints.current[2]
    if (j3Ref.current) j3Ref.current.rotation.z = joints.current[3]
  })

  return (
    <group>
      {/* table */}
      <mesh position={[0,0.35,0]}>
        <boxGeometry args={[3, 0.7, 2]} />
        <meshStandardMaterial color={'#111827'} metalness={0.1} roughness={0.95} />
      </mesh>

      {/* simple rack for tool */}
      <group position={[1.2,0.7,-0.6]}>
        <mesh position={[0,0,0]}>
          <boxGeometry args={[0.3, 0.3, 0.3]} />
          <meshStandardMaterial color={'#4b5563'} metalness={0.2} roughness={0.7} />
        </mesh>
        {/* parked spindle when swapped */}
        <mesh ref={spindleRef} visible={false} position={[0,0.25,0]}>
          <cylinderGeometry args={[0.03, 0.03, 0.12, 16]} />
          <meshStandardMaterial color={'#9ca3af'} metalness={0.6} roughness={0.4} />
        </mesh>
      </group>

      {/* stock */}
      <mesh ref={stockRef} position={[0.6,0.51,0.2]}>
        <boxGeometry args={[0.35, 0.25, 0.35]} />
        <meshStandardMaterial color={'#b45309'} />
      </mesh>

      {/* "fabricated" part */}
      <mesh ref={partRef} position={[0.6,0.52,0.2]} visible={false}>
        <cylinderGeometry args={[0.12, 0.12, 0.06, 16]} />
        <meshStandardMaterial color={'#60a5fa'} />
      </mesh>

      {/* base */}
      <group ref={baseRef} position={[ -0.4, 0.7, -0.1 ]}>
        <mesh>
          <cylinderGeometry args={[0.18,0.18,0.2, 24]} />
          <meshStandardMaterial color={'#374151'} metalness={0.3} roughness={0.8} />
        </mesh>

        {/* shoulder */}
        <group ref={j1Ref} position={[0,0.1,0]}>
          <mesh position={[0,0.25,0]}>
            <boxGeometry args={[0.18,0.5,0.18]} />
            <meshStandardMaterial color={'#f0ad4e'} />
          </mesh>

          {/* elbow */}
          <group ref={j2Ref} position={[0,0.5,0]}>
            <mesh position={[0,0.22,0]}>
              <boxGeometry args={[0.14,0.44,0.14]} />
              <meshStandardMaterial color={'#f0ad4e'} />
            </mesh>

            {/* wrist */}
            <group ref={j3Ref} position={[0,0.44,0]}>
              <mesh position={[0,0.12,0]}>
                <boxGeometry args={[0.12,0.24,0.12]} />
                <meshStandardMaterial color={'#f0ad4e'} />
              </mesh>

              {/* end effector mount */}
              <group ref={eeRef} position={[0,0.24,0]}>
                {/* spindle/extruder */}
                <mesh position={[0,0.08,0]} visible ref={spindleRef}>
                  <cylinderGeometry args={[0.03, 0.03, 0.16, 16]} />
                  <meshStandardMaterial color={'#9ca3af'} metalness={0.6} roughness={0.4} />
                </mesh>

                {/* gripper */}
                <group visible={false}>
                  <mesh ref={gripL} position={[-0.2,0.05,0]}>
                    <boxGeometry args={[0.04,0.12,0.02]} />
                    <meshStandardMaterial color={'#9ca3af'} />
                  </mesh>
                  <mesh ref={gripR} position={[0.2,0.05,0]}>
                    <boxGeometry args={[0.04,0.12,0.02]} />
                    <meshStandardMaterial color={'#9ca3af'} />
                  </mesh>
                </group>
              </group>
            </group>
          </group>
        </group>
      </group>
    </group>
  )
}
