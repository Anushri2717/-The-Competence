import { useState, useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth } from '../store/auth.jsx'
import logo from '../logo.jpeg'

const LINKS = [
  { label: 'Domains', to: '/domains' },
  { label: 'Events', to: '/events' },
  { label: 'Projects', to: '/projects' },
  { label: 'Community', to: '/community' },
  { label: 'About', to: '/about' },
]

export default function Navbar() {
  const [stuck, setStuck] = useState(false)
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth()
  const nav = useNavigate()
  const { pathname } = useLocation()

  useEffect(() => {
    const h = () => setStuck(window.scrollY > 50)
    window.addEventListener('scroll', h)
    return () => window.removeEventListener('scroll', h)
  }, [])

  useEffect(() => { setOpen(false) }, [pathname])

  const go = to => { nav(to); setOpen(false) }

  return (
    <>
      <nav className={`navbar ${stuck ? 'stuck' : ''}`}>
        <div className="wrap nav-inner">
          <button className="nav-brand" onClick={() => go('/')}>
            <img src={logo} alt="logo" />
            <span>The Competence</span>
            <div className="nav-brand-dot" />
          </button>

          <div className="nav-links">
            {LINKS.map(l => (
              <button key={l.to} className={`nav-btn ${pathname === l.to ? 'on' : ''}`} onClick={() => go(l.to)}>
                {l.label}
              </button>
            ))}
          </div>

          <div className="nav-actions">
            {user ? (
              <>
                <button className="btn btn-ghost btn-sm" onClick={() => go('/dashboard')}
                  style={{ display:'flex', alignItems:'center', gap:'0.5rem' }}>
                  <div style={{ width:26, height:26, borderRadius:'50%', background:user.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.6rem', fontWeight:800 }}>
                    {user.avatar}
                  </div>
                  Dashboard
                </button>
                <button className="btn btn-ghost btn-sm" onClick={() => { logout(); nav('/') }}>Logout</button>
              </>
            ) : (
              <>
                <button className="btn btn-ghost btn-sm" onClick={() => go('/login')}>Login</button>
                <button className="btn btn-gold btn-sm" onClick={() => go('/join')}>Join Free</button>
              </>
            )}
            <button className="burger" onClick={() => setOpen(!open)}>
              <span style={{ transform: open ? 'rotate(45deg) translateY(7px)' : '' }} />
              <span style={{ opacity: open ? 0 : 1 }} />
              <span style={{ transform: open ? 'rotate(-45deg) translateY(-7px)' : '' }} />
            </button>
          </div>
        </div>
      </nav>

      <div className={`mob-menu ${open ? 'open' : ''}`}>
        <button className="mob-close" onClick={() => setOpen(false)}>✕</button>
        {LINKS.map(l => (
          <button key={l.to} className="mob-link" onClick={() => go(l.to)}>{l.label}</button>
        ))}
        {user
          ? <button className="mob-link" style={{ color:'var(--gold)' }} onClick={() => go('/dashboard')}>Dashboard</button>
          : <button className="btn btn-gold" onClick={() => go('/join')}>Join Free</button>
        }
      </div>
    </>
  )
}