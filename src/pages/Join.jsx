import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth.jsx'

const DOMAINS = ['Full Stack Development','AI / Machine Learning','UI/UX Design','Digital Marketing','Cybersecurity','Finance & Fintech','Data Science','Product Management']

export default function Join() {
  const { register } = useAuth()
  const nav = useNavigate()
  const [step, setStep] = useState(1)
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)
  const [err, setErr] = useState('')
  const [form, setForm] = useState({ name:'', email:'', password:'', confirm:'', college:'', domain:'', type:'student', year:'' })
  const set = (k, v) => { setForm(f => ({ ...f, [k]: v })); setErr('') }

  const step1OK = () => {
    if (!form.name.trim()) return 'Name is required'
    if (!form.email.includes('@')) return 'Valid email required'
    if (form.password.length < 6) return 'Password min 6 characters'
    if (form.password !== form.confirm) return 'Passwords do not match'
    return null
  }

  const next = () => { const e = step1OK(); if (e) { setErr(e); return }; setStep(2) }

  const submit = e => {
    e.preventDefault()
    if (!form.college.trim()) { setErr('College is required'); return }
    if (!form.domain) { setErr('Please pick a domain'); return }
    setLoading(true); setErr('')
    try { register(form); setDone(true); setTimeout(() => nav('/dashboard'), 2000) }
    catch (e) { setErr(e.message) }
    finally { setLoading(false) }
  }

  if (done) return (
    <div className="auth-wrap">
      <div className="auth-bg" />
      <div className="wrap" style={{ display: 'flex', justifyContent: 'center', position: 'relative', zIndex: 1 }}>
        <div className="auth-box" style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '3.5rem', marginBottom: '1rem' }}>🎉</div>
          <h2 style={{ marginBottom: '0.5rem' }}>You're in!</h2>
          <p>Welcome, {form.name.split(' ')[0]}! Redirecting to dashboard...</p>
          <div style={{ marginTop: '1.5rem', display: 'flex', justifyContent: 'center' }}><div className="spin" /></div>
        </div>
      </div>
    </div>
  )

  return (
    <div style={{ minHeight: '100vh', position: 'relative', overflow: 'hidden', paddingTop: '8rem', paddingBottom: '4rem' }}>
      <div className="auth-bg" style={{ position: 'fixed', inset: 0 }} />
      <div className="wrap" style={{ position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'start', maxWidth: 980, margin: '0 auto' }} className="join-grid">
          <div>
            <div className="section-eyebrow">Join The Competence</div>
            <h1 style={{ fontSize: 'clamp(2rem,4vw,3rem)', margin: '0.75rem 0 1rem' }}>Start your <span className="gold">growth journey</span></h1>
            <p style={{ marginBottom: '2.5rem' }}>100% free. No CGPA cutoff. Just bring your ambition.</p>
            {[
              { icon:'🎯', t:'Pick your domain', d:'Join your domain group — Tech, Design, Marketing, AI, and more.' },
              { icon:'🤝', t:'Connect across 20+ colleges', d:'Meet peers and professionals who share your goals.' },
              { icon:'🚀', t:'Build real projects', d:'Find collaborators and ship portfolio-worthy work.' },
              { icon:'🏆', t:'Exclusive workshops', d:'First access to our industry workshops and events.' },
            ].map((p, i) => (
              <div key={i} style={{ display: 'flex', gap: '1rem', marginBottom: '1.2rem' }}>
                <div style={{ width: 38, height: 38, borderRadius: 10, background: 'var(--bg3)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1rem', flexShrink: 0 }}>{p.icon}</div>
                <div>
                  <h4 style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.15rem' }}>{p.t}</h4>
                  <p style={{ fontSize: '0.8rem', color: 'var(--ink2)' }}>{p.d}</p>
                </div>
              </div>
            ))}
          </div>

          <div>
            <div className="auth-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.75rem' }}>
                {[1,2].map(s => (
                  <div key={s} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flex: s < 2 ? 1 : 'none' }}>
                    <div style={{ width: 28, height: 28, borderRadius: '50%', background: step >= s ? 'var(--blue)' : 'var(--bg3)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 800, flexShrink: 0, transition: 'var(--transition)' }}>{s}</div>
                    <span style={{ fontSize: '0.78rem', color: step >= s ? 'var(--ink)' : 'var(--ink2)', fontWeight: step === s ? 700 : 400 }}>{s === 1 ? 'Account' : 'Profile'}</span>
                    {s < 2 && <div style={{ flex: 1, height: 1, background: step > s ? 'var(--blue)' : 'var(--border)', transition: 'background 0.3s' }} />}
                  </div>
                ))}
              </div>

              {step === 1 ? (
                <div>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>Create account</h3>
                  <div className="form-group"><label className="form-label">Full Name *</label><input className="form-input" placeholder="e.g. Arjun Kumar" value={form.name} onChange={e => set('name', e.target.value)} /></div>
                  <div className="form-group"><label className="form-label">Email *</label><input className="form-input" type="email" placeholder="you@example.com" value={form.email} onChange={e => set('email', e.target.value)} /></div>
                  <div className="form-group"><label className="form-label">Password *</label><input className="form-input" type="password" placeholder="Min 6 characters" value={form.password} onChange={e => set('password', e.target.value)} /></div>
                  <div className="form-group"><label className="form-label">Confirm Password *</label><input className="form-input" type="password" placeholder="Repeat password" value={form.confirm} onChange={e => set('confirm', e.target.value)} /></div>
                  {err && <p className="form-err" style={{ marginBottom: '1rem' }}>⚠ {err}</p>}
                  <button className="btn btn-gold" onClick={next} style={{ width: '100%', justifyContent: 'center' }}>Next →</button>
                </div>
              ) : (
                <form onSubmit={submit}>
                  <h3 style={{ fontSize: '1.3rem', marginBottom: '1.5rem' }}>Your profile</h3>
                  <div className="form-group">
                    <label className="form-label">I am a...</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.65rem' }}>
                      {[{v:'student',i:'🎓',l:'Student'},{v:'professional',i:'💼',l:'Professional'}].map(t => (
                        <button key={t.v} type="button" onClick={() => set('type', t.v)}
                          style={{ padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: `1.5px solid ${form.type===t.v?'var(--blue)':'var(--border)'}`, background: form.type===t.v?'rgba(43,110,245,0.1)':'var(--bg3)', cursor: 'none', transition: 'var(--transition)', textAlign: 'center' }}>
                          <div style={{ fontSize: '1.4rem' }}>{t.i}</div>
                          <div style={{ fontSize: '0.82rem', fontWeight: 700 }}>{t.l}</div>
                        </button>
                      ))}
                    </div>
                  </div>
                  <div className="form-group"><label className="form-label">{form.type==='student'?'College *':'Company *'}</label><input className="form-input" placeholder={form.type==='student'?'e.g. CEG, Anna University':'e.g. TCS, Infosys'} value={form.college} onChange={e => set('college', e.target.value)} /></div>
                  {form.type==='student' && <div className="form-group"><label className="form-label">Year</label><select className="form-select" value={form.year} onChange={e => set('year', e.target.value)}><option value="">Select year</option>{['1st Year','2nd Year','3rd Year','4th Year','PG/Masters'].map(y=><option key={y}>{y}</option>)}</select></div>}
                  <div className="form-group"><label className="form-label">Your Domain *</label><select className="form-select" value={form.domain} onChange={e => set('domain', e.target.value)}><option value="">Select a domain</option>{DOMAINS.map(d=><option key={d}>{d}</option>)}</select></div>
                  {err && <p className="form-err" style={{ marginBottom: '1rem' }}>⚠ {err}</p>}
                  <div style={{ display: 'flex', gap: '0.65rem' }}>
                    <button type="button" className="btn btn-ghost btn-sm" onClick={() => setStep(1)}>← Back</button>
                    <button type="submit" className="btn btn-gold" disabled={loading} style={{ flex: 1, justifyContent: 'center' }}>{loading ? 'Creating...' : 'Join The Competence →'}</button>
                  </div>
                </form>
              )}

              <p style={{ textAlign: 'center', fontSize: '0.84rem', color: 'var(--ink2)', marginTop: '1.25rem' }}>
                Already a member?{' '}
                <button onClick={() => nav('/login')} style={{ color: 'var(--gold)', fontWeight: 700, background: 'none', border: 'none', cursor: 'none' }}>Login →</button>
              </p>
            </div>
          </div>
        </div>
      </div>
      <style>{`@media(max-width:900px){.join-grid{grid-template-columns:1fr !important}}`}</style>
    </div>
  )
}