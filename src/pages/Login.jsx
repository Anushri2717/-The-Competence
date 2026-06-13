import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth.jsx'

export default function Login() {
  const { login } = useAuth()
  const nav = useNavigate()
  const [form, setForm] = useState({ email: '', password: '' })
  const [err, setErr] = useState('')
  const [loading, setLoading] = useState(false)
  const set = (k, v) => setForm(f => ({ ...f, [k]: v }))

  const handleSubmit = e => {
    e.preventDefault(); setErr(''); setLoading(true)
    try { const u = login(form.email, form.password); nav('/dashboard') }
    catch (e) { setErr(e.message) }
    finally { setLoading(false) }
  }

  const demo = type => {
    if (type === 'admin') setForm({ email: 'admin@thecompetence.in', password: 'admin123' })
    else setForm({ email: 'student@demo.com', password: 'student123' })
  }

  return (
    <div className="auth-wrap">
      <div className="auth-bg" />
      <div className="wrap" style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <div className="auth-box">
          <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '0.5rem' }}>👋</div>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '0.35rem' }}>Welcome back</h2>
            <p style={{ fontSize: '0.88rem' }}>Login to your Competence account</p>
          </div>

          <div style={{ background: 'rgba(245,200,66,0.07)', border: '1px solid rgba(245,200,66,0.18)', borderRadius: 'var(--radius-sm)', padding: '1rem', marginBottom: '1.5rem' }}>
            <p style={{ fontSize: '0.78rem', color: 'var(--ink2)', marginBottom: '0.6rem', fontWeight: 700 }}>🧪 Demo accounts:</p>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <button className="btn btn-ghost btn-sm" style={{ flex: 1, fontSize: '0.75rem' }} onClick={() => demo('admin')}>Admin</button>
              <button className="btn btn-ghost btn-sm" style={{ flex: 1, fontSize: '0.75rem' }} onClick={() => demo('student')}>Student</button>
            </div>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Email</label>
              <input className="form-input" type="email" placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input className="form-input" type="password" placeholder="Your password" value={form.password} onChange={e => set('password', e.target.value)} required />
            </div>
            {err && <div style={{ background: 'rgba(255,68,88,0.1)', border: '1px solid rgba(255,68,88,0.25)', borderRadius: 'var(--radius-sm)', padding: '0.75rem 1rem', marginBottom: '1rem', fontSize: '0.84rem', color: 'var(--red)' }}>⚠ {err}</div>}
            <button className="btn btn-gold" type="submit" disabled={loading} style={{ width: '100%', justifyContent: 'center', opacity: loading ? 0.7 : 1 }}>
              {loading ? 'Logging in...' : 'Login →'}
            </button>
          </form>

          <div style={{ textAlign: 'center', marginTop: '1.5rem' }}>
            <p style={{ fontSize: '0.86rem', color: 'var(--ink2)' }}>
              No account?{' '}
              <button onClick={() => nav('/join')} style={{ color: 'var(--gold)', fontWeight: 700, background: 'none', border: 'none', cursor: 'none' }}>Join free →</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}