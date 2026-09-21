import { Suspense, useMemo, useState } from 'react'
import { Canvas } from '@react-three/fiber'
import { ContactShadows, OrbitControls } from '@react-three/drei'
import { Link, Route, Routes, NavLink } from 'react-router-dom'
import { ThreeScene } from './components/ThreeScene'
import CameraPath from './components/CameraPath'
import HintToggle from './components/HintToggle'
import useKeyChallenges from './hooks/useKeyChallenges'
import UnlockedPage from './pages/Unlocked'
import ContactPage from './pages/Contact'
import ResumePage from './pages/Resume'
import CoverLetterPage from './pages/CoverLetter'
import { stationIndexFromTour, stationPose, TOUR, tourValueForIndex } from './scene/stations'

function Stage() {
  const { unlocked, progress, resetAll } = useKeyChallenges()
  const [camT, setCamT] = useState(0)
  const [freeLook, setFreeLook] = useState(false)
  const unlockedCount = useMemo(
    () => Object.values(unlocked).filter(Boolean).length,
    [unlocked],
  )
  const activeIndex = stationIndexFromTour(camT)
  const active = TOUR[activeIndex]
  const opening = stationPose(0)

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

      <nav className="nav">
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
          camera={{ position: [opening.cam.x, opening.cam.y, opening.cam.z], fov: 42 }}
          dpr={[1, 1.75]}
        >
          <color attach="background" args={['#07090f']} />
          <fog attach="fog" args={['#07090f', 10, 24]} />
          <ambientLight intensity={0.55} />
          <directionalLight position={[4, 8, 2]} intensity={1.2} />
          <pointLight position={[0, 3.2, 0]} intensity={8} distance={12} color="#5eead4" />
          <Suspense fallback={null}>
            <ThreeScene unlocked={unlocked} activeId={active.id} />
            <ContactShadows opacity={0.4} scale={14} blur={2.2} far={8} />
          </Suspense>
          <CameraPath t={camT} enabled={!freeLook} />
          <OrbitControls
            enabled={freeLook}
            enablePan={false}
            maxPolarAngle={Math.PI * 0.49}
            minDistance={2.5}
            maxDistance={14}
            target={[0, 0.8, 0]}
          />
        </Canvas>
        <div className="tour-legend">
          {TOUR.map((stop, i) => (
            <button
              key={stop.id}
              type="button"
              className={`tour-stop${i === activeIndex ? ' active' : ''}${unlocked[stop.id] ? ' open' : ''}`}
              onClick={() => {
                setFreeLook(false)
                setCamT(tourValueForIndex(i))
              }}
            >
              <strong>{i + 1}. {stop.short}</strong>
              <span>{stop.blurb}</span>
            </button>
          ))}
        </div>
        <div className="cam-scrub">
          <label htmlFor="cam">Tour · {active.short}</label>
          <input
            id="cam"
            type="range"
            min={0}
            max={1}
            step={0.01}
            value={camT}
            onChange={(e) => {
              setFreeLook(false)
              setCamT(Number(e.target.value))
            }}
          />
          <button type="button" className={`pill${freeLook ? ' active' : ''}`} onClick={() => setFreeLook((v) => !v)}>
            {freeLook ? 'Tour camera' : 'Free orbit'}
          </button>
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
