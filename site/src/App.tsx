import { Suspense, useMemo } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, OrbitControls } from '@react-three/drei'
import { Link, Route, Routes, NavLink } from 'react-router-dom'
import { ThreeScene } from './components/ThreeScene'
import HintToggle from './components/HintToggle'
import useKeyChallenges from './hooks/useKeyChallenges'
import UnlockedPage from './pages/Unlocked'
import ContactPage from './pages/Contact'
import ResumePage from './pages/Resume'
import CoverLetterPage from './pages/CoverLetter'
import { TOUR } from './scene/stations'

function Stage() {
  const { unlocked, progress, resetAll } = useKeyChallenges()
  const unlockedCount = useMemo(
    () => Object.values(unlocked).filter(Boolean).length,
    [unlocked],
  )

  return (
    <div className="stage">
      <header className="topbar">
        <div className="brand-block">
          <p className="eyebrow">Kohlkat · Interactive Resume</p>
          <h1>David Kohler</h1>
          <p className="lede">
            Robotics software, sensor-aware CNC, and full-stack work · Pittsburgh
          </p>
        </div>
        <div className="topbar-actions">
          <HintToggle />
          <div className="pill muted">Unlocked {unlockedCount}/7 · {progress}%</div>
          <button type="button" className="pill ghost" onClick={resetAll}>Reset</button>
        </div>
      </header>

      <nav className="nav" aria-label="Sections">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'pill active' : 'pill'}>Scene</NavLink>
        <NavLink to="/resume" className={({ isActive }) => isActive ? 'pill active' : 'pill'}>Resume</NavLink>
        <NavLink to="/cover" className={({ isActive }) => isActive ? 'pill active' : 'pill'}>Cover letter</NavLink>
        <NavLink to="/unlocked" className={({ isActive }) => isActive ? 'pill active' : 'pill'}>Unlocked</NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? 'pill active' : 'pill'}>Contact</NavLink>
        <a className="pill" href="/docs/David%20Kohler%20resume.docx" download>Download resume</a>
        <a className="pill" href="/docs/David%20Kohler%20cover%20letter.docx" download>Download cover letter</a>
      </nav>

      <div className="canvas-shell">
        <Canvas
          camera={{ position: [0, 5.2, 9.2], fov: 48 }}
          dpr={[1, 1.75]}
        >
          <color attach="background" args={['#07090f']} />
          <fog attach="fog" args={['#07090f', 10, 24]} />
          <ambientLight intensity={0.55} />
          <directionalLight position={[4, 8, 2]} intensity={1.2} />
          <pointLight position={[0, 3.2, 0]} intensity={8} distance={12} color="#5eead4" />
          <Suspense fallback={null}>
            <ThreeScene unlocked={unlocked} />
            <ContactShadows opacity={0.4} scale={14} blur={2.2} far={8} />
          </Suspense>
          <OrbitControls
            makeDefault
            enablePan={false}
            enableDamping
            dampingFactor={0.08}
            maxPolarAngle={Math.PI * 0.49}
            minDistance={3}
            maxDistance={16}
            target={[0, 0.8, 0]}
          />
        </Canvas>
      </div>

      <div className="orbit-note">
        <p>Drag to orbit. Pinch or scroll to zoom.</p>
        <ul className="station-key">
          {TOUR.map((stop, i) => (
            <li key={stop.id} className={unlocked[stop.id] ? 'open' : ''}>
              {i + 1}. {stop.short}
            </li>
          ))}
        </ul>
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
