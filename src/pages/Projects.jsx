import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth.jsx'
import { useReveal } from '../hooks/useReveal.js'

const INIT_PROJECTS = [
  { id:1, title:'CampusConnect — College Social Platform', desc:'A social platform for students to share notes, form study groups, and find project partners across colleges.', domains:['Full Stack','UI/UX'], status:'open', team:3, max:6, by:'Arjun Kumar', stack:['React','Node.js','MongoDB'] },
  { id:2, title:'StudyBot — AI Study Assistant', desc:'A chatbot that helps students understand difficult concepts and create personalised study plans using LLMs.', domains:['AI/ML','Python'], status:'open', team:1, max:4, by:'Praveen K', stack:['Python','LangChain','FastAPI'] },
  { id:3, title:'Brand Workshop — College Startup Kit', desc:'A branding and marketing starter kit for college startups — templates, guidelines, and strategy playbook.', domains:['Marketing','Design'], status:'active', team:4, max:4, by:'Meera Raj', stack:['Figma','Notion'] },
  { id:4, title:'SplitEase — Expense Splitting App', desc:'Split bills, track shared expenses, and settle payments instantly using UPI integration.', domains:['Full Stack','Finance'], status:'open', team:2, max:5, by:'Karthik R', stack:['React Native','Node.js','Razorpay'] },
  { id:5, title:'VaultScan — Security Auditor', desc:'Scans web applications for common vulnerabilities and generates actionable security reports.', domains:['Cybersecurity','Python'], status:'active', team:3, max:4, by:'Vikram K', stack:['Python','Kali','OWASP'] },
  { id:6, title:'PlacementInsight — Campus Analytics', desc:'A dashboard aggregating placement data across Tamil Nadu colleges to help students make better career decisions.', domains:['Data Science','Analytics'], status:'open', team:1, max:3, by:'Sneha Rajan', stack:['React','Python','Tableau'] },
]

const STATUS_LABEL = { open:'Recruiting', active:'Active', done:'Completed' }

export default function Projects() {
  const { user } = useAuth()
  const nav = useNavigate()
  useReveal()
  const [projects, setProjects] = useState(INIT_PROJECTS)
  const [domFilter, setDomFilter] = useState('all')
  const [statusFilter, setStatusFilter] = useState('all')
  const [showModal, setShowModal] = useState(false)
  const [toast, setToast] = useState('')
  const [form, setForm] = useState({ title:'', desc:'', domains:'', stack:'', max:4 })
  const set = k => e => setForm(f => ({ ...f, [k]: e.target.value }))

  const filtered = projects.filter(p => {
    const dm = domFilter === 'all' || p.domains.some(d => d.toLowerCase().includes(domFilter.toLowerCase()))
    const st = statusFilter === 'all' || p.status === statusFilter
    return dm && st
  })

  const showToast = msg => { setToast(msg); setTimeout(() => setToast(''), 3000) }

  const postProject = e => {
    e.preventDefault()
    if (!user) { nav('/login'); return }
    if (!form.title || !form.desc || !form.domains) { showToast('Fill all required fields'); return }
    setProjects(prev => [{
      id: Date.now(), title: form.title, desc: form.desc,
      domains: form.domains.split(',').map(s => s.trim()),
      status: 'open', team: 1, max: Number(form.max), by: user.name,
      stack: form.stack.split(',').map(s => s.trim()).filter(Boolean)
    }, ...prev])
    setForm({ title:'', desc:'', domains:'', stack:'', max:4 })
    setShowModal(false)
    showToast('Project posted! 🚀')
  }

  return (
    <main>
      {toast && <div className="toast-wrap"><div className="toast toast-ok">✓ {toast}</div></div>}

      {showModal && (
        <div className="modal-bg" onClick={e => e.target === e.currentTarget && setShowModal(false)}>
          <div className="modal-box">
            <div className="modal-head">
              <h3>Post a Project 💡</h3>
              <button className="modal-close" onClick={() => setShowModal(false)}>✕</button>
            </div>
            <form onSubmit={postProject}>
              <div className="form-group"><label className="form-label">Project Name *</label><input className="form-input" placeholder="e.g. StudyBot — AI Study Assistant" value={form.title} onChange={set('title')} /></div>
              <div className="form-group"><label className="form-label">Description *</label><textarea className="form-textarea" placeholder="What are you building?" value={form.desc} onChange={set('desc')} /></div>
              <div className="form-group"><label className="form-label">Domains * (comma separated)</label><input className="form-input" placeholder="e.g. Full Stack, UI/UX" value={form.domains} onChange={set('domains')} /></div>
              <div className="form-group"><label className="form-label">Tech Stack (comma separated)</label><input className="form-input" placeholder="e.g. React, Node.js, MongoDB" value={form.stack} onChange={set('stack')} /></div>
              <div className="form-group"><label className="form-label">Team Size Needed</label>
                <select className="form-select" value={form.max} onChange={set('max')}>
                  {[2,3,4,5,6,8].map(n => <option key={n} value={n}>{n} people</option>)}
                </select>
              </div>
              <button type="submit" className="btn btn-gold" style={{ width:'100%', justifyContent:'center' }}>Post Project →</button>
            </form>
          </div>
        </div>
      )}

      <section className="page-hero">
        <div className="wrap">
          <div className="section-eyebrow" style={{ justifyContent:'center' }}>Project Board</div>
          <h1 className="reveal">Ideas find their <span className="gold">teams here</span></h1>
          <p className="reveal d1">Post a project idea, recruit collaborators from different colleges, and build something real.</p>
          <div className="reveal d2" style={{ marginTop:'1.5rem' }}>
            <button className="btn btn-gold" onClick={() => user ? setShowModal(true) : nav('/login')}>+ Post a Project</button>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop:'2rem' }}>
        <div className="wrap">
          <div style={{ display:'grid', gridTemplateColumns:'220px 1fr', gap:'2.5rem', alignItems:'start' }} className="proj-layout">
            <div style={{ position:'sticky', top:'6.5rem', background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--radius)', padding:'1.4rem' }}>
              <p style={{ fontSize:'0.72rem', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.1em', color:'var(--ink2)', marginBottom:'0.6rem' }}>Status</p>
              {[['all','All Projects'],['open','Recruiting'],['active','Active'],['done','Completed']].map(([v,l]) => (
                <button key={v} onClick={() => setStatusFilter(v)}
                  style={{ display:'block', width:'100%', textAlign:'left', padding:'0.55rem 0.85rem', borderRadius:'var(--radius-sm)', border:'none', color:statusFilter===v?'var(--ink)':'var(--ink2)', background:statusFilter===v?'rgba(43,110,245,0.1)':'transparent', fontSize:'0.86rem', fontWeight:statusFilter===v?700:500, cursor:'none', transition:'var(--transition)', marginBottom:'0.25rem' }}>
                  {l}
                </button>
              ))}
              <p style={{ fontSize:'0.72rem', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.1em', color:'var(--ink2)', marginBottom:'0.6rem', marginTop:'1.25rem' }}>Domain</p>
              {['all','Full Stack','AI/ML','Design','Marketing','Cybersecurity','Finance','Data Science'].map(d => (
                <button key={d} onClick={() => setDomFilter(d)}
                  style={{ display:'block', width:'100%', textAlign:'left', padding:'0.55rem 0.85rem', borderRadius:'var(--radius-sm)', border:'none', color:domFilter===d?'var(--ink)':'var(--ink2)', background:domFilter===d?'rgba(43,110,245,0.1)':'transparent', fontSize:'0.84rem', fontWeight:domFilter===d?700:500, cursor:'none', transition:'var(--transition)', marginBottom:'0.25rem' }}>
                  {d === 'all' ? 'All Domains' : d}
                </button>
              ))}
              <div style={{ marginTop:'1.5rem', padding:'1.15rem', background:'rgba(245,200,66,0.06)', border:'1px solid rgba(245,200,66,0.15)', borderRadius:'var(--radius-sm)', textAlign:'center' }}>
                <div style={{ fontSize:'1.5rem', marginBottom:'0.5rem' }}>💡</div>
                <p style={{ fontSize:'0.78rem', marginBottom:'1rem' }}>Have an idea? Post it!</p>
                <button className="btn btn-gold btn-sm" style={{ width:'100%', justifyContent:'center' }} onClick={() => user ? setShowModal(true) : nav('/login')}>Post a Project</button>
              </div>
            </div>

            <div>
              {filtered.length === 0 ? (
                <div className="empty"><div className="empty-icon">📭</div><h3>No projects found</h3><p>Try a different filter or post your own idea!</p></div>
              ) : (
                <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'1.2rem' }} className="proj-cards">
                  {filtered.map(p => (
                    <div key={p.id} className="card proj-card reveal">
                      <span className={`proj-status ${p.status}`}>● {STATUS_LABEL[p.status]}</span>
                      <div style={{ display:'flex', flexWrap:'wrap', gap:'0.35rem', marginBottom:'0.7rem' }}>
                        {p.domains.map(d => <span key={d} className="tag">{d}</span>)}
                      </div>
                      <h3>{p.title}</h3>
                      <p>{p.desc}</p>
                      {p.stack?.length > 0 && (
                        <div style={{ display:'flex', flexWrap:'wrap', gap:'0.3rem', marginBottom:'0.7rem' }}>
                          {p.stack.map(t => <span key={t} style={{ fontSize:'0.68rem', padding:'0.18rem 0.55rem', borderRadius:100, background:'var(--bg3)', color:'var(--ink2)', border:'1px solid var(--border)' }}>{t}</span>)}
                        </div>
                      )}
                      <div className="proj-foot">
                        <span className="proj-team">👤 {p.team}/{p.max} · by {p.by}</span>
                        <button className="proj-link" onClick={() => nav('/join')}>{p.status==='open'?'Join →':'View →'}</button>
                      </div>
                    </div>
                  ))}
                  <div className="card" style={{ border:'1px dashed rgba(245,200,66,0.2)', background:'rgba(245,200,66,0.03)', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'2rem', minHeight:200, cursor:'none' }}
                    onClick={() => user ? setShowModal(true) : nav('/login')}>
                    <div>
                      <div style={{ fontSize:'2.2rem', marginBottom:'0.6rem' }}>💡</div>
                      <h3 style={{ fontSize:'0.95rem', marginBottom:'0.4rem' }}>Got a project idea?</h3>
                      <p style={{ fontSize:'0.8rem', marginBottom:'1rem' }}>Find collaborators from across colleges.</p>
                      <span className="btn btn-gold btn-sm">Post a Project</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <style>{`@media(max-width:900px){.proj-layout{grid-template-columns:1fr !important}} @media(max-width:600px){.proj-cards{grid-template-columns:1fr !important}}`}</style>
      </section>
    </main>
  )
}