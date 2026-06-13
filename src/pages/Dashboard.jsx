import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../store/auth.jsx'

const DOMAIN_INFO = {
  'Full Stack Development': { icon:'💻', skills:['React','Node.js','MongoDB','Docker'] },
  'AI / Machine Learning':  { icon:'🤖', skills:['Python','TensorFlow','LangChain','OpenCV'] },
  'UI/UX Design':           { icon:'🎨', skills:['Figma','User Research','Prototyping','Framer'] },
  'Digital Marketing':      { icon:'📈', skills:['SEO','Meta Ads','Analytics','Content'] },
  'Cybersecurity':          { icon:'🔐', skills:['Kali Linux','OWASP','CTF','Network Security'] },
  'Finance & Fintech':      { icon:'💰', skills:['Stocks','Modeling','Blockchain','Investment'] },
  'Data Science':           { icon:'📊', skills:['Python','Pandas','Tableau','SQL'] },
  'Product Management':     { icon:'🏗️', skills:['Agile','Roadmapping','A/B Testing','Metrics'] },
}

const OPEN_PROJECTS = [
  { id:1, title:'CampusConnect', domains:['Full Stack','UI/UX'], team:3, max:6, by:'Arjun Kumar' },
  { id:2, title:'StudyBot — AI Assistant', domains:['AI/ML','Python'], team:1, max:4, by:'Praveen K' },
  { id:3, title:'SplitEase App', domains:['Full Stack','Finance'], team:2, max:5, by:'Karthik R' },
  { id:4, title:'PlacementInsight', domains:['Data Science'], team:1, max:3, by:'Sneha Rajan' },
]

const UPCOMING_EVENTS = [
  { id:1, title:'Full Stack Dev Bootcamp', date:'April 2025', mode:'Hybrid', color:'#00875A', icon:'🛠' },
  { id:2, title:'SRM Hackfest 2025', date:'May 3–4, 2025', mode:'In-Person', color:'#7C3AED', icon:'💻' },
  { id:3, title:'AI & Generative Models Workshop', date:'June 2025', mode:'Online', color:'#2B6EF5', icon:'🤖' },
]

const STATS = [
  { icon:'👥', value:'500+', label:'Community Members' },
  { icon:'🚀', value:'6', label:'Active Projects' },
  { icon:'🏫', value:'22+', label:'Colleges' },
  { icon:'📅', value:'3', label:'Upcoming Events' },
]

const TABS = [
  { id:'overview', icon:'🏠', label:'Overview' },
  { id:'projects', icon:'🚀', label:'Projects' },
  { id:'events', icon:'📅', label:'Events' },
  { id:'profile', icon:'👤', label:'Profile' },
]

export default function Dashboard() {
  const { user, logout } = useAuth()
  const nav = useNavigate()
  const [tab, setTab] = useState('overview')
  const [saved, setSaved] = useState(false)
  const [profile, setProfile] = useState({ college:user?.college||'', year:user?.year||'', domain:user?.domain||'', bio:'' })
  const setP = (k, v) => setProfile(p => ({ ...p, [k]: v }))

  if (!user) { nav('/login'); return null }

  const domain = DOMAIN_INFO[user.domain]

  const saveProfile = e => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div style={{ minHeight:'100vh', background:'var(--bg)', paddingTop:'5rem' }}>
      <div className="wrap" style={{ paddingTop:'1.5rem', paddingBottom:'4rem' }}>
        <div className="dash-wrap">
          <div className="sidebar">
            <div className="sidebar-av">
              <div className="av" style={{ background:user.color||'#2B6EF5' }}>{user.avatar}</div>
              <div className="sidebar-name">{user.name}</div>
              <div className="sidebar-role">{user.role==='admin'?'⭐ Admin':user.type}</div>
              <div className="sidebar-college">{user.college}</div>
            </div>
            <nav>
              {TABS.map(t => (
                <button key={t.id} className={`side-btn ${tab===t.id?'on':''}`} onClick={() => setTab(t.id)}>
                  <span className="side-ico">{t.icon}</span>{t.label}
                </button>
              ))}
              <div style={{ height:1, background:'var(--border)', margin:'0.75rem 0' }} />
              <button className="side-btn" onClick={() => nav('/community')}><span className="side-ico">👥</span>Community</button>
              <button className="side-btn" onClick={() => nav('/projects')}><span className="side-ico">💡</span>Post a Project</button>
              <div style={{ height:1, background:'var(--border)', margin:'0.75rem 0' }} />
              <button className="side-btn" onClick={() => { logout(); nav('/') }} style={{ color:'var(--red)' }}><span className="side-ico">🚪</span>Logout</button>
            </nav>
          </div>

          <div>
            {tab === 'overview' && (
              <div>
                <h2 style={{ marginBottom:'0.4rem' }}>Welcome back, <span className="gold">{user.name.split(' ')[0]}</span> 👋</h2>
                <p style={{ marginBottom:'2rem', fontSize:'0.9rem' }}>Here's what's happening in your community today.</p>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1rem', marginBottom:'2rem' }} className="stat-cards">
                  {STATS.map(s => (
                    <div key={s.label} className="card" style={{ padding:'1.25rem', textAlign:'center' }}>
                      <div style={{ fontSize:'1.75rem', marginBottom:'0.4rem' }}>{s.icon}</div>
                      <div style={{ fontSize:'1.6rem', fontWeight:900, color:'var(--ink)' }}>{s.value}</div>
                      <div style={{ fontSize:'0.72rem', color:'var(--ink2)', marginTop:'0.2rem', textTransform:'uppercase', letterSpacing:'0.05em', fontWeight:700 }}>{s.label}</div>
                    </div>
                  ))}
                </div>
                {domain && (
                  <div className="card" style={{ padding:'1.75rem', marginBottom:'1.5rem', position:'relative', overflow:'hidden' }}>
                    <div style={{ position:'absolute', top:-20, right:-20, fontSize:'6rem', opacity:0.06 }}>{domain.icon}</div>
                    <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'0.85rem' }}>
                      <span style={{ fontSize:'1.75rem' }}>{domain.icon}</span>
                      <div>
                        <div style={{ fontSize:'0.7rem', color:'var(--gold)', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.08em' }}>Your Domain</div>
                        <h3 style={{ fontSize:'1.1rem' }}>{user.domain}</h3>
                      </div>
                    </div>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:'0.35rem' }}>
                      {domain.skills.map(s => <span key={s} style={{ fontSize:'0.7rem', padding:'0.2rem 0.65rem', borderRadius:100, background:'var(--bg3)', border:'1px solid var(--border)', color:'var(--ink2)' }}>{s}</span>)}
                    </div>
                  </div>
                )}
                <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'0.85rem' }} className="quick-grid">
                  {[
                    { icon:'💡', title:'Post a Project', desc:'Share your idea', to:'/projects' },
                    { icon:'📅', title:'Browse Events', desc:'Find hackathons', to:'/events' },
                    { icon:'👥', title:'Find Members', desc:'Connect across colleges', to:'/community' },
                  ].map(q => (
                    <button key={q.title} className="card" onClick={() => nav(q.to)} style={{ padding:'1.25rem', textAlign:'center', cursor:'none', width:'100%' }}>
                      <div style={{ fontSize:'1.6rem', marginBottom:'0.4rem' }}>{q.icon}</div>
                      <div style={{ fontWeight:700, fontSize:'0.9rem', marginBottom:'0.15rem' }}>{q.title}</div>
                      <div style={{ fontSize:'0.76rem', color:'var(--ink2)' }}>{q.desc}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {tab === 'projects' && (
              <div>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1.75rem' }}>
                  <h2>Open Projects</h2>
                  <button className="btn btn-gold btn-sm" onClick={() => nav('/projects')}>Post a Project</button>
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'repeat(2,1fr)', gap:'1.1rem' }} className="dp-grid">
                  {OPEN_PROJECTS.map(p => (
                    <div key={p.id} className="card proj-card" style={{ padding:'1.5rem', cursor:'none' }}>
                      <span className="proj-status open">● Recruiting</span>
                      <div style={{ display:'flex', flexWrap:'wrap', gap:'0.3rem', marginBottom:'0.65rem' }}>
                        {p.domains.map(d => <span key={d} className="tag">{d}</span>)}
                      </div>
                      <h3 style={{ fontSize:'0.95rem', marginBottom:'0.4rem' }}>{p.title}</h3>
                      <div className="proj-foot">
                        <span className="proj-team">👤 {p.team}/{p.max} · by {p.by}</span>
                        <button className="proj-link" onClick={() => nav('/projects')}>Join →</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'events' && (
              <div>
                <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', marginBottom:'1.75rem' }}>
                  <h2>Upcoming Events</h2>
                  <button className="btn btn-ghost btn-sm" onClick={() => nav('/events')}>View All</button>
                </div>
                <div style={{ display:'flex', flexDirection:'column', gap:'1rem' }}>
                  {UPCOMING_EVENTS.map(e => (
                    <div key={e.id} className="card" style={{ display:'flex', alignItems:'center', gap:'1.25rem', padding:'1.25rem', cursor:'none' }}>
                      <div style={{ width:52, height:52, borderRadius:14, background:e.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.4rem', flexShrink:0 }}>{e.icon}</div>
                      <div style={{ flex:1 }}>
                        <div style={{ fontWeight:700, fontSize:'0.95rem', marginBottom:'0.2rem' }}>{e.title}</div>
                        <div style={{ fontSize:'0.76rem', color:'var(--ink2)' }}>📅 {e.date} · 🌐 {e.mode}</div>
                      </div>
                      <button className="btn btn-blue btn-sm" onClick={() => nav('/events')}>View →</button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'profile' && (
              <div>
                <h2 style={{ marginBottom:'1.75rem' }}>Edit Profile</h2>
                <div className="card" style={{ padding:'2rem', marginBottom:'1.5rem' }}>
                  <form onSubmit={saveProfile}>
                    <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'1rem' }} className="pf-grid">
                      <div className="form-group"><label className="form-label">College / Company</label><input className="form-input" value={profile.college} onChange={e => setP('college', e.target.value)} /></div>
                      <div className="form-group"><label className="form-label">Year</label>
                        <select className="form-select" value={profile.year} onChange={e => setP('year', e.target.value)}>
                          <option value="">Select year</option>
                          {['1st Year','2nd Year','3rd Year','4th Year','PG / Masters','Working'].map(y => <option key={y}>{y}</option>)}
                        </select>
                      </div>
                    </div>
                    <div className="form-group"><label className="form-label">Domain</label>
                      <select className="form-select" value={profile.domain} onChange={e => setP('domain', e.target.value)}>
                        {Object.keys(DOMAIN_INFO).map(d => <option key={d}>{d}</option>)}
                      </select>
                    </div>
                    <div className="form-group"><label className="form-label">Bio</label><textarea className="form-textarea" placeholder="Tell the community about yourself..." value={profile.bio} onChange={e => setP('bio', e.target.value)} /></div>
                    <button type="submit" className="btn btn-gold">{saved ? '✓ Saved!' : 'Save Changes'}</button>
                  </form>
                </div>
                <div className="card" style={{ padding:'1.75rem' }}>
                  <h3 style={{ fontSize:'1rem', marginBottom:'0.35rem' }}>Account Info</h3>
                  <p style={{ fontSize:'0.82rem', color:'var(--ink2)', marginBottom:'1rem' }}>This cannot be changed.</p>
                  {[['Name',user.name],['Email',user.email],['Role',user.role],['Joined',user.joined]].map(([k,v]) => (
                    <div key={k} style={{ display:'flex', justifyContent:'space-between', padding:'0.6rem 0', borderBottom:'1px solid var(--border)', fontSize:'0.86rem' }}>
                      <span style={{ color:'var(--ink2)' }}>{k}</span>
                      <span style={{ fontWeight:600 }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <style>{`@media(max-width:1024px){.stat-cards{grid-template-columns:repeat(2,1fr) !important}.quick-grid{grid-template-columns:1fr 1fr !important}.dp-grid{grid-template-columns:1fr !important}.pf-grid{grid-template-columns:1fr !important}}`}</style>
    </div>
  )
}
