import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal.js'

const EVENTS = [
  { id:1, title:'Marketing Strategy Workshop', type:'workshop', status:'completed', org:'Wyntrix', orgType:'Official Partner', date:'February 2025', mode:'Online', attended:80, seats:100, desc:'An intensive 2-day online workshop covering digital marketing strategy, brand positioning, content marketing, and social media growth.', highlights:['Live case studies','Hands-on strategy building','Q&A with professionals','Certificate of participation'], tags:['Marketing','Branding','Growth'], color:'linear-gradient(135deg,#003d99,#2B6EF5)' },
  { id:2, title:'Full Stack Dev Bootcamp', type:'workshop', status:'upcoming', org:'The Competence', orgType:'Internal Event', date:'April 2025', mode:'Hybrid', attended:0, seats:50, desc:'3-day intensive bootcamp covering React, Node.js, databases, and cloud deployment. Every participant builds and deploys a real project.', highlights:['Build & deploy a real project','1:1 code review','Add to portfolio & GitHub','Network with professionals'], tags:['React','Node.js','Projects'], color:'linear-gradient(135deg,#005533,#00875A)' },
  { id:3, title:'SRM Hackfest 2025', type:'hackathon', status:'open', org:'SRM University', orgType:'External Event', date:'May 3–4, 2025', mode:'In-Person', attended:0, seats:500, desc:'36-hour hackathon with themes in AI, sustainability, smart cities, and HealthTech. Form your team through The Competence project board.', highlights:['Cross-college teams','Mentors from top companies','AI & Health themes','Rs1,00,000 prize pool'], tags:['Hackathon','AI','Rs1L Prize'], color:'linear-gradient(135deg,#5B2D8E,#7C3AED)' },
  { id:4, title:'AI & Generative Models Workshop', type:'workshop', status:'planning', org:'The Competence', orgType:'Internal Event', date:'June 2025', mode:'Online', attended:0, seats:100, desc:'Workshop on Generative AI, LLMs, prompt engineering, and building AI-powered apps. Looking for sponsors to make this happen.', highlights:['Hands-on with LangChain & OpenAI','Build an AI app from scratch','Industry mentors','Subject to funding'], tags:['AI','LLMs','Generative AI'], color:'linear-gradient(135deg,#0D2E5C,#2B6EF5)' },
]

const STATUS_LABEL = { completed:'✅ Completed', upcoming:'🔜 Upcoming', open:'📢 Open Registration', planning:'💡 Planning' }
const FILTERS = [
  { v:'all', l:'All Events' }, { v:'workshop', l:'🛠 Workshops' },
  { v:'hackathon', l:'💻 Hackathons' }, { v:'upcoming', l:'🔜 Upcoming' }, { v:'completed', l:'✅ Completed' }
]

export default function Events() {
  const nav = useNavigate()
  const [filter, setFilter] = useState('all')
  useReveal()

  const events = EVENTS.filter(e => filter==='all' ? true : filter==='workshop'||filter==='hackathon' ? e.type===filter : e.status===filter)

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>Events</div>
          <h1 className="reveal">Workshops, hackathons & <span className="gold">tech fests</span></h1>
          <p className="reveal d1">Never miss an opportunity to learn, compete, and win.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="wrap">
          <div className="chips reveal">
            {FILTERS.map(f => <button key={f.v} className={`chip ${filter===f.v?'on':''}`} onClick={() => setFilter(f.v)}>{f.l}</button>)}
          </div>

          {events.length === 0 ? (
            <div className="empty"><div className="empty-icon">📭</div><h3>No events found</h3><p>Try a different filter</p></div>
          ) : (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1.75rem' }} className="ev-full-grid">
              {events.map((e, i) => (
                <div key={e.id} className={`card reveal d${(i%2)+1}`} style={{ overflow: 'hidden' }}>
                  <div style={{ background: e.color, padding: '2.25rem 2rem', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: 'absolute', top:'-30%', right:'-15%', width:170, height:170, borderRadius:'50%', background:'rgba(255,255,255,0.055)' }} />
                    <div style={{ fontSize:'0.68rem', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.09em', color:'rgba(255,255,255,0.75)', marginBottom:'0.55rem' }}>{STATUS_LABEL[e.status]}</div>
                    <h3 style={{ fontSize:'1.3rem', color:'#fff', marginBottom:'0.75rem' }}>{e.title}</h3>
                    <div>
                      <span className="event-pill">📅 {e.date}</span>
                      <span className="event-pill">🌐 {e.mode}</span>
                      {e.attended>0 && <span className="event-pill">👥 {e.attended}+ attended</span>}
                      {e.seats>0 && e.status!=='completed' && <span className="event-pill">🎯 {e.seats} seats</span>}
                    </div>
                  </div>
                  <div style={{ padding: '1.75rem 2rem' }}>
                    <div style={{ display:'flex', alignItems:'center', gap:'0.75rem', marginBottom:'1.25rem', padding:'0.85rem', background:'var(--bg3)', borderRadius:'var(--radius-sm)' }}>
                      <div style={{ width:38, height:38, borderRadius:'50%', background:'var(--blue)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.72rem', fontWeight:800, flexShrink:0 }}>{e.org.slice(0,2).toUpperCase()}</div>
                      <div>
                        <div style={{ fontSize:'0.88rem', fontWeight:700 }}>{e.org}</div>
                        <div style={{ fontSize:'0.73rem', color:'var(--ink2)' }}>{e.orgType}</div>
                      </div>
                    </div>
                    <p style={{ fontSize:'0.87rem', marginBottom:'1.15rem', lineHeight:1.7 }}>{e.desc}</p>
                    <div style={{ display:'flex', flexDirection:'column', gap:'0.38rem', marginBottom:'1.4rem' }}>
                      {e.highlights.map((h,hi) => (
                        <div key={hi} style={{ display:'flex', alignItems:'center', gap:'0.6rem', fontSize:'0.84rem', color:'var(--ink2)' }}>
                          <span style={{ color:'var(--cyan)', fontWeight:800, flexShrink:0 }}>✓</span> {h}
                        </div>
                      ))}
                    </div>
                    <div style={{ display:'flex', flexWrap:'wrap', gap:'0.4rem', marginBottom:'1.4rem' }}>
                      {e.tags.map(t => <span key={t} className="tag">{t}</span>)}
                    </div>
                    <div style={{ display:'flex', gap:'0.75rem' }}>
                      {e.status==='completed' ? <button className="btn btn-ghost btn-sm">View Recording</button>
                       : e.status==='planning' ? <button className="btn btn-gold btn-sm" onClick={() => nav('/about')}>Become Sponsor →</button>
                       : <button className="btn btn-blue btn-sm" onClick={() => nav('/join')}>Register Now →</button>}
                      {e.status==='open' && <button className="btn btn-ghost btn-sm" onClick={() => nav('/projects')}>Find Teammates</button>}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <div className="reveal" style={{ marginTop:'3.5rem', padding:'2.5rem', background:'var(--bg2)', border:'1px dashed var(--border)', borderRadius:'var(--radius-lg)', textAlign:'center' }}>
            <h3 style={{ marginBottom:'0.5rem' }}>Know about a hackathon or tech fest?</h3>
            <p style={{ maxWidth:460, margin:'0 auto 1.5rem', fontSize:'0.88rem' }}>Share it with the community. We'll feature it here and help members form teams.</p>
            <button className="btn btn-ghost" onClick={() => nav('/about')}>Submit an Event →</button>
          </div>
        </div>
        <style>{`@media(max-width:800px){.ev-full-grid{grid-template-columns:1fr !important}}`}</style>
      </section>
    </main>
  )
}