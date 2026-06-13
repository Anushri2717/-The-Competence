import { useEffect, useState } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AuthProvider } from './store/auth.jsx'
import Navbar from './components/Navbar.jsx'
import Footer from './components/Footer.jsx'
import Cursor from './components/Cursor.jsx'
import Loader from './components/Loader.jsx'
import Home from './pages/Home.jsx'
import Login from './pages/Login.jsx'
import Join from './pages/Join.jsx'
import Domains from './pages/Domains.jsx'
import Events from './pages/Events.jsx'
import Projects from './pages/Projects.jsx'
import Community from './pages/Community.jsx'
import About from './pages/About.jsx'
import Dashboard from './pages/Dashboard.jsx'

const NO_FOOTER = ['/dashboard']

function ScrollTop() {
  const { pathname } = useLocation()
  useEffect(() => window.scrollTo(0, 0), [pathname])
  return null
}

function Fade({ children }) {
  const { pathname } = useLocation()
  const [vis, setVis] = useState(false)
  useEffect(() => {
    setVis(false)
    const t = setTimeout(() => setVis(true), 50)
    return () => clearTimeout(t)
  }, [pathname])
  return <div style={{ opacity: vis ? 1 : 0, transition: 'opacity 0.3s ease' }}>{children}</div>
}

function BackTop() {
  const [show, setShow] = useState(false)
  useEffect(() => {
    const h = () => setShow(window.scrollY > 450)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])
  return <button className={`btt ${show ? 'show' : ''}`} onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>↑</button>
}

function Inner() {
  const { pathname } = useLocation()
  const noFoot = NO_FOOTER.some(p => pathname.startsWith(p))
  return (
    <>
      <Loader />
      <Cursor />
      <BackTop />
      <ScrollTop />
      <Navbar />
      <Fade>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/join" element={<Join />} />
          <Route path="/domains" element={<Domains />} />
          <Route path="/events" element={<Events />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/community" element={<Community />} />
          <Route path="/about" element={<About />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="*" element={
            <div style={{ minHeight:'100vh', display:'flex', alignItems:'center', justifyContent:'center', flexDirection:'column', gap:'1.5rem', textAlign:'center' }}>
              <div style={{ fontSize:'5rem' }}>🧩</div>
              <h1>404 — Lost?</h1>
              <p>This page doesn't exist.</p>
              <a href="/" className="btn btn-gold">Go Home</a>
            </div>
          } />
        </Routes>
      </Fade>
      {!noFoot && <Footer />}
    </>
  )
}

export default function App() {
  return <AuthProvider><Inner /></AuthProvider>
}