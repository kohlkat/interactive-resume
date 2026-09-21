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
          <span className="quiet">{unlockedCount}/7 unlocked · {progress}%</span>
          <button type="button" className="text-btn" onClick={resetAll}>Reset</button>
        </div>
      </header>

      <nav className="nav" aria-label="Sections">
        <NavLink to="/" end className={({ isActive }) => isActive ? 'pill active' : 'pill'}>Scene</NavLink>
        <NavLink to="/resume" className={({ isActive }) => isActive ? 'pill active' : 'pill'}>Resume</NavLink>
        <NavLink to="/cover" className={({ isActive }) => isActive ? 'pill active' : 'pill'}>Letter</NavLink>
        <NavLink to="/unlocked" className={({ isActive }) => isActive ? 'pill active' : 'pill'}>Unlocked</NavLink>
        <NavLink to="/contact" className={({ isActive }) => isActive ? 'pill active' : 'pill'}>Contact</NavLink>
      </nav>

      <div className="canvas-shell">
        <Canvas
          camera={{ position: [0, 4.6, 8.4], fov: 36 }}
          dpr={[1, 1.5]}
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
            minDistance={5.5}
            maxDistance={14}
            target={[0, 0.45, 0]}
          />
        </Canvas>
      </div>

      <p className="station-line">
        {TOUR.map((stop) => (
          <span key={stop.id} className={unlocked[stop.id] ? 'open' : ''}>{stop.short}</span>
        ))}
      </p>

      <footer className="foot">
        <a href="https://github.com/kohlkat" target="_blank" rel="noreferrer">GitHub</a>
        <a href="mailto:Dkohlkat@gmail.com">Email</a>
        <a href="/docs/David%20Kohler%20resume.docx" download>Resume</a>
        <a href="/docs/David%20Kohler%20cover%20letter.docx" download>Cover letter</a>
        <Link to="/contact">vCard</Link>
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
