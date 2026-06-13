import { useState, useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal.js'

const MEMBERS = [
  { id:1, av:'SK', color:'#2B6EF5', name:'Saanthosh K', college:'The Competence', domain:'Community', type:'founder', year:'' },
  { id:2, av:'AK', color:'#1A50C8', name:'Arjun Kumar', college:'CEG, Anna University', domain:'Full Stack Development', type:'student', year:'3rd Year' },
  { id:3, av:'SR', color:'#7C3AED', name:'Sneha Rajan', college:'SSN College', domain:'UI/UX Design', type:'student', year:'4th Year' },
  { id:4, av:'PK', color:'#EC4899', name:'Praveen K', college:'PSG Tech', domain:'AI / ML', type:'student', year:'3rd Year' },
  { id:5, av:'MR', color:'#F59E0B', name:'Meera Raj', college:'SRM University', domain:'Digital Marketing', type:'student', year:'2nd Year' },
  { id:6, av:'RV', color:'#10B981', name:'Ravi Varman', college:'TCS', domain:'Full Stack Development', type:'professional', year:'' },
  { id:7, av:'VK', color:'#14B8A6', name:'Vikram K', college:'NIT Trichy', domain:'Cybersecurity', type:'student', year:'3rd Year' },
  { id:8, av:'NK', color:'#F97316', name:'Nithya K', college:'SKCET', domain:'Finance & Fintech', type:'student', year:'4th Year' },
  { id:9, av:'DP', color:'#8B5CF6', name:'Divya Priya', college:'Madras Institute', domain:'UI/UX Design', type:'student', year:'2nd Year' },
  { id:10, av:'KR', color:'#2B6EF5', name:'Karthik R', college:'CEG', domain:'Full Stack Development', type:'student', year:'4th Year' },
]

export default function Community() {
  const nav = useNavigate()
  useReveal()
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('all')
  const [domFilter, setDomFilter] = useState('all')

  const filtered = useMemo(() => MEMBERS.filter(m => {
    const q = search.toLowerCase()
    const matchSearch = !q || m.name.toLowerCase().includes(q) || m.college.toLowerCase().includes(q) || m.domain.toLowerCase().includes(q)
    const matchType = typeFilter === 'all' || m.type === typeFilter
    const matchDom = domFilter === 'all' || m.domain.toLowerCase().includes(domFilter.toLowerCase())
    return matchSearch && matchType && matchDom
  }), [search, typeFilter, domFilter])

  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="section-eyebrow" style={{ justifyContent:'center' }}>Community</div>
          <h1 className="reveal">500+ members. <span className="gold">One direction.</span></h1>
          <p className="reveal d1">Students from 20+ colleges and working professionals — all serious about growing.</p>
        </div>
      </section>

      <section className="section" style={{ paddingTop:'2rem' }}>
        <div className="wrap">
          <div className="reveal" style={{ display:'flex', alignItems:'center', gap:'0.75rem', background:'var(--bg2)', border:'1px solid var(--border)', borderRadius:'var(--radius-sm)', padding:'0.8rem 1.1rem', marginBottom:'1.5rem' }}>
            <span style={{ color:'var(--ink2)' }}>🔍</span>
            <input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by name, college, or domain..."
              style={{ background:'transparent', border:'none', outline:'none', color:'var(--ink)', fontSize:'0.95rem', flex:1, fontFamily:'var(--font)' }} />
            {search && <button onClick={() => setSearch('')} style={{ color:'var(--ink2)', background:'none', border:'none', cursor:'none' }}>✕</button>}
          </div>

          <div className="reveal" style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap', marginBottom:'2rem', alignItems:'center', justifyContent:'space-between' }}>
            <div style={{ display:'flex', gap:'0.5rem', flexWrap:'wrap' }}>
              {[['all','All Members'],['student','🎓 Students'],['professional','💼 Professionals']].map(([v,l]) => (
                <button key={v} className={`chip ${typeFilter===v?'on':''}`} onClick={() => setTypeFilter(v)}>{l}</button>
              ))}
              <div style={{ width:1, background:'var(--border)', margin:'0 0.25rem' }} />
              {['all','Full Stack','AI/ML','Design','Marketing'].map(d => (
                <button key={d} className={`chip ${domFilter===d?'on':''}`} onClick={() => setDomFilter(d)}>{d==='all'?'All Domains':d}</button>
              ))}
            </div>
            <span style={{ fontSize:'0.82rem', color:'var(--ink2)' }}>{filtered.length} members</span>
          </div>

          {filtered.length === 0 ? (
            <div className="empty"><div className="empty-icon">🔍</div><h3>No members found</h3><p>Try a different search or filter</p></div>
          ) : (
            <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.2rem' }} className="mem-grid">
              {filtered.map(m => (
                <div key={m.id} className="card reveal" style={{ padding:'1.65rem', cursor:'none' }}>
                  <div style={{ display:'flex', alignItems:'center', gap:'0.9rem', marginBottom:'1.1rem' }}>
                    <div style={{ width:50, height:50, borderRadius:'50%', background:m.color, display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.9rem', fontWeight:800, flexShrink:0, border:'2px solid var(--border)' }}>{m.av}</div>
                    <div>
                      <div style={{ fontWeight:700, fontSize:'0.95rem' }}>{m.name}</div>
                      <div style={{ fontSize:'0.74rem', color:'var(--ink2)', marginTop:'0.1rem' }}>{m.college}</div>
                      <div style={{ fontSize:'0.7rem', color:'var(--gold)', fontWeight:700, marginTop:'0.15rem' }}>{m.domain}</div>
                    </div>
                  </div>
                  <span style={{ display:'inline-block', fontSize:'0.68rem', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.07em', padding:'0.2rem 0.65rem', borderRadius:100, background:m.type==='professional'?'rgba(0,230,118,0.1)':'rgba(43,110,245,0.1)', color:m.type==='professional'?'var(--green)':'#7EB3FF', border:`1px solid ${m.type==='professional'?'rgba(0,230,118,0.2)':'rgba(43,110,245,0.2)'}`, marginBottom:'0.85rem' }}>
                    {m.type==='professional'?'💼 Professional':`🎓 Student${m.year?` · ${m.year}`:''}`}
                  </span>
                  <button className="btn btn-ghost btn-sm" style={{ width:'100%', justifyContent:'center', fontSize:'0.8rem' }} onClick={() => nav('/join')}>Connect →</button>
                </div>
              ))}
              <div className="card" style={{ border:'1px dashed rgba(245,200,66,0.18)', background:'rgba(245,200,66,0.03)', display:'flex', alignItems:'center', justifyContent:'center', textAlign:'center', padding:'2rem', minHeight:200, cursor:'none' }} onClick={() => nav('/join')}>
                <div>
                  <div style={{ fontSize:'2rem', marginBottom:'0.65rem' }}>👋</div>
                  <h3 style={{ fontSize:'0.95rem', marginBottom:'0.4rem' }}>Your profile here</h3>
                  <p style={{ fontSize:'0.78rem', marginBottom:'1rem' }}>Join 500+ students in the community.</p>
                  <span className="btn btn-gold btn-sm">Join Now →</span>
                </div>
              </div>
            </div>
          )}

          {filtered.length > 0 && (
            <div className="reveal" style={{ textAlign:'center', marginTop:'2.5rem' }}>
              <p style={{ fontSize:'0.86rem', color:'var(--ink2)', marginBottom:'1rem' }}>Showing {filtered.length} of 500+ members · Join to see everyone</p>
              <button className="btn btn-ghost" onClick={() => nav('/join')}>Join to See All Members →</button>
            </div>
          )}
        </div>
        <style>{`@media(max-width:900px){.mem-grid{grid-template-columns:repeat(2,1fr) !important}} @media(max-width:580px){.mem-grid{grid-template-columns:1fr !important}}`}</style>
      </section>
    </main>
  )
}