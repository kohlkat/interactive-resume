import React, { Suspense, useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { Environment, OrbitControls, ContactShadows } from '@react-three/drei'
import { Link, Route, Routes, NavLink } from 'react-router-dom'
import { ThreeScene } from './components/ThreeScene'
import CameraPath from './components/CameraPath'
import HintToggle from './components/HintToggle'
import useKeyChallenges from './hooks/useKeyChallenges'
import UnlockedPage from './pages/Unlocked'
import ContactPage from './pages/Contact'
import ResumePage from './pages/Resume'
import CoverLetterPage from './pages/CoverLetter'

function Stage() {
  const { unlocked, progress, resetAll } = useKeyChallenges()
  const [camT, setCamT] = useState(0.15)
  const unlockedCount = useMemo(
    () => Object.values(unlocked).filter(Boolean).length,
    [unlocked],
  )

  return (
    <div className="stage">
      <header className="topbar">
        <div className="brand-block">
          <p className="eyebrow">Kohlkat · Interactive Resume v6.3</p>
          <h1>David Kohler</h1>
          <p className="lede">
            Robotics / RS274-NEXT (SAGE-274) · VR teleop · sensor-aware CNC · Pittsburgh
          </p>
        </div>
        <div className="topbar-actions">
          <HintToggle />
          <div className="pill muted">Unlocked {unlockedCount}/7 · {progress}%</div>
          <button type="button" className="pill ghost" onClick={resetAll}>Reset</button>
        </div>
      </header>

      <nav className="nav">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'pill active' : 'pill'}>Scene</NavLink>
        <NavLink to="/resume" className={({ isActive }) => isActive ? 'pill active' : 'pill'}>Resume</NavLink>
        <NavLink to="/cover" className={({ isActive }) => isActive ? 'pill active' : 'pill'}>Cover letter</NavLink>
        <NavLink to="/unlocked" className={({ isActive }) => isActive ? 'pill active' : 'pill'}>Unlocked</NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? 'pill active' : 'pill'}>Contact</NavLink>
        <a className="pill" href="/docs/David%20Kohler%20resume.docx" download>DOCX resume</a>
      </nav>

      <div className="canvas-shell">
        <Canvas camera={{ position: [6, 3, 7], fov: 42 }} dpr={[1, 1.75]}>
          <color attach="background" args={['#07090f']} />
          <ambientLight intensity={0.45} />
          <directionalLight position={[4, 8, 2]} intensity={1.1} />
          <Suspense fallback={null}>
            <Environment preset="city" />
            <ThreeScene unlocked={unlocked} />
            <ContactShadows opacity={0.45} scale={12} blur={2.4} far={8} />
          </Suspense>
          <CameraPath t={camT} />
          <OrbitControls enablePan={false} maxPolarAngle={Math.PI * 0.49} minDistance={3} maxDistance={12} />
        </Canvas>
        <div className="cam-scrub">
          <label htmlFor="cam">Camera path</label>
          <input
            id="cam"
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={camT}
            onChange={(e) => setCamT(Number(e.target.value))}
          />
        </div>
      </div>

      <footer className="foot">
        <span>github.com/kohlkat</span>
        <span>Dkohlkat@gmail.com</span>
        <Link to="/contact">vCard + QR</Link>
      </footer>
    </div>
  )
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Stage />} />
      <Route path="/resume" element={<ResumePage />} />
      <Route path="/cover" element={<CoverLetterPage />} />
      <Route path="/unlocked" element={<UnlockedPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  )
}
