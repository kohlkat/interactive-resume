import { Route, Routes } from 'react-router-dom'
import BryceWorld from './scene/BryceWorld'
import Briefing from './pages/Briefing'
import ResumePage from './pages/Resume'
import CoverLetterPage from './pages/CoverLetter'
import ContactPage from './pages/Contact'

export default function App() {
  return (
    <div className="site">
      <div className="banner">
        <BryceWorld />
      </div>
      <div className="desk">
        <Routes>
          <Route path="/" element={<Briefing />} />
          <Route path="/resume" element={<ResumePage />} />
          <Route path="/cover" element={<CoverLetterPage />} />
          <Route path="/contact" element={<ContactPage />} />
        </Routes>
      </div>
    </div>
  )
}
