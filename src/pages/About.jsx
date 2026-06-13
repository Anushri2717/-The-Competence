import { useNavigate } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal.js'

const TIMELINE = [
  { date:'Late 2024', title:'The idea begins 💡', desc:'Saanthosh starts The Competence as a WhatsApp community for students who want to grow beyond their campus.' },
  { date:'Jan 2025', title:'First 100 members 🎉', desc:'Community grows to 100+ students from 10+ colleges across Tamil Nadu. Domains are structured and groups created.' },
  { date:'Feb 2025', title:'Wyntrix Partnership ✅', desc:'First official workshop — Marketing Strategy Workshop by Wyntrix. 80+ attendees, excellent feedback.' },
  { date:'Mar 2025', title:'Website Launch 🌐', desc:'The Competence goes fully online with project board, event listings, and member profiles.' },
  { date:'Future 🚀', title:'Hackathons & beyond', desc:'Planning our own hackathon, more workshops, and expanding across Tamil Nadu.' },
]

const VALUES = [
  { icon:'🤝', title:'Connection over competition', desc:'Students from different colleges are stronger together. Collaborate, not compete.' },
  { icon:'🚀', title:"Build, don't just learn", desc:'Real growth comes from doing. Build real projects, ship real products, create real portfolios.' },
  { icon:'🎯', title:'Direction over confusion', desc:'We help students find clarity — which domain, what to learn, how to grow.' },
  { icon:'📡', title:'Always informed', desc:'Tech moves fast. We curate what matters — hackathons, opportunities, and resources.' },
  { icon:'🌱', title:'Grow together', desc:'Your growth is our success. Accountability, support, and celebration — always.' },
  { icon:'🔓', title:'Open to everyone', desc:'No CGPA cutoff. No tier-1 filter. Just genuine people who want to grow.' },
]

const TEAM = [
  { name:'Saanthosh', role:'Founder & Community Lead', college:'The Competence', av:'SK', color:'rgba(43,110,245,0.25)' },
  { name:'Karthik R', role:'Tech Lead', college:'CEG, Anna University', av:'KR', color:'rgba(0,212,255,0.15)' },
  { name:'Priya M', role:'Design & Content', college:'SSN College', av:'PM', color:'rgba(245,200,66,0.15)' },
  { name:'Arjun K', role:'Events & Outreach', college:'SRM University', av:'AK', color:'rgba(0,230,118,0.15)' },
]

export default function About() {
  const nav = useNavigate()
  useReveal()
  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="section-eyebrow" style={{ justifyContent:'center' }}>Our Story</div>
          <h1 className="reveal">Built by students, <span className="gold">for students</span></h1>
          <p className="reveal d1">The Competence started with one question: why aren't students from different colleges talking to each other?</p>
        </div>
      </section>

      <section className="section">
        <div className="wrap">
          <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'5rem', alignItems:'start' }} className="abt-grid">
            <div className="reveal-l">
              <div className="section-eyebrow">The Mission</div>
              <h2 style={{ margin:'0.75rem 0 1.25rem', fontSize:'clamp(1.7rem,3vw,2.6rem)' }}>From <span className="gold">"I want to improve"</span> to "I'm doing it"</h2>
              <p style={{ marginBottom:'1rem', fontSize:'0.93rem' }}>Most students want to grow — but don't know where to start, who to learn from, or how to find like-minded people outside their college bubble.</p>
              <p style={{ marginBottom:'1rem', fontSize:'0.93rem' }}>The Competence connects students from different colleges and working professionals to collaborate and stay ahead.</p>
              <p style={{ fontSize:'0.93rem', marginBottom:'2rem' }}>The best learning happens when you're surrounded by people serious about growing alongside you.</p>
              <button className="btn btn-gold" onClick={() => nav('/join')}>Join the Community →</button>
            </div>
            <div className="reveal-r">
              <div style={{ position:'relative', paddingLeft:'2rem' }}>
                <div style={{ position:'absolute', left:0, top:0, bottom:0, width:2, background:'linear-gradient(180deg,var(--blue),var(--cyan),transparent)' }} />
                {TIMELINE.map((t, i) => (
                  <div key={i} style={{ position:'relative', paddingBottom:i<TIMELINE.length-1?'2.2rem':0 }}>
                    <div style={{ position:'absolute', left:'-2.3rem', top:'0.25rem', width:11, height:11, borderRadius:'50%', background:'var(--blue)', border:'2px solid var(--bg)', boxShadow:'0 0 0 4px rgba(43,110,245,0.2)' }} />
                    <div style={{ fontSize:'0.72rem', fontWeight:800, color:'var(--gold)', textTransform:'uppercase', letterSpacing:'0.08em', marginBottom:'0.3rem' }}>{t.date}</div>
                    <div style={{ fontWeight:800, fontSize:'0.98rem', marginBottom:'0.3rem' }}>{t.title}</div>
                    <div style={{ fontSize:'0.82rem', color:'var(--ink2)', lineHeight:1.65 }}>{t.desc}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <style>{`@media(max-width:900px){.abt-grid{grid-template-columns:1fr !important}}`}</style>
      </section>

      <section className="section" style={{ background:'var(--bg2)' }}>
        <div className="wrap">
          <div className="reveal" style={{ textAlign:'center', marginBottom:'3rem' }}>
            <div className="section-eyebrow" style={{ justifyContent:'center' }}>Our Values</div>
            <h2>What we stand for</h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.25rem' }} className="val-grid">
            {VALUES.map((v, i) => (
              <div key={i} className={`card reveal d${(i%3)+1}`} style={{ padding:'1.75rem', cursor:'none' }}>
                <span style={{ fontSize:'2rem', display:'block', marginBottom:'0.75rem' }}>{v.icon}</span>
                <h3 style={{ fontSize:'1.02rem', marginBottom:'0.4rem' }}>{v.title}</h3>
                <p style={{ fontSize:'0.84rem' }}>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:900px){.val-grid{grid-template-columns:repeat(2,1fr) !important}} @media(max-width:580px){.val-grid{grid-template-columns:1fr !important}}`}</style>
      </section>

      <section className="section">
        <div className="wrap">
          <div className="reveal" style={{ textAlign:'center', marginBottom:'3rem' }}>
            <div className="section-eyebrow" style={{ justifyContent:'center' }}>The Team</div>
            <h2>The people <span className="gold">building this for you</span></h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(4,1fr)', gap:'1.2rem' }} className="team-grid">
            {TEAM.map((t, i) => (
              <div key={i} className={`card reveal d${i+1}`} style={{ padding:'1.75rem', textAlign:'center', cursor:'none' }}>
                <div style={{ width:64, height:64, borderRadius:'50%', background:t.color, margin:'0 auto 0.9rem', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem', fontWeight:800, border:'2px solid var(--border)' }}>{t.av}</div>
                <h4 style={{ fontSize:'1rem', fontWeight:800, marginBottom:'0.25rem' }}>{t.name}</h4>
                <div style={{ fontSize:'0.74rem', color:'var(--gold)', fontWeight:700, marginBottom:'0.2rem' }}>{t.role}</div>
                <div style={{ fontSize:'0.72rem', color:'var(--ink2)' }}>{t.college}</div>
              </div>
            ))}
          </div>
          <div className="reveal" style={{ textAlign:'center', marginTop:'2.5rem' }}>
            <button className="btn btn-ghost" onClick={() => nav('/join')}>Apply to Join the Team →</button>
          </div>
        </div>
        <style>{`@media(max-width:900px){.team-grid{grid-template-columns:repeat(2,1fr) !important}} @media(max-width:480px){.team-grid{grid-template-columns:1fr !important}}`}</style>
      </section>

      <section className="section" style={{ background:'var(--bg2)' }}>
        <div className="wrap">
          <div className="reveal" style={{ textAlign:'center', marginBottom:'3rem' }}>
            <div className="section-eyebrow" style={{ justifyContent:'center' }}>Partners & Sponsors</div>
            <h2>Who's backing <span className="gold">our mission</span></h2>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(3,1fr)', gap:'1.5rem' }} className="sp-grid">
            <div className="card reveal d1" style={{ padding:'2rem', textAlign:'center', cursor:'none' }}>
              <div style={{ width:60, height:60, borderRadius:'50%', background:'var(--blue)', margin:'0 auto 1rem', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'1.2rem', fontWeight:900 }}>W</div>
              <div style={{ fontSize:'0.7rem', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.08em', color:'var(--gold)', marginBottom:'0.4rem' }}>Official Partner</div>
              <h4 style={{ marginBottom:'0.5rem' }}>Wyntrix</h4>
              <p style={{ fontSize:'0.82rem' }}>Conducted our first Marketing Strategy Workshop with 80+ attendees.</p>
            </div>
            {[
              { icon:'🤝', title:'Become a Partner', desc:'Conduct workshops, mentor our members. Reach 500+ motivated students.', cta:'Get in Touch →' },
              { icon:'💰', title:'Fund Our Hackathon', desc:'Help us run our first community hackathon. Your brand reaches 500+ students.', cta:'Sponsor Us →' }
            ].map((s, i) => (
              <div key={i} className={`reveal d${i+2}`} style={{ border:'1px dashed var(--border)', borderRadius:'var(--radius)', padding:'2rem', textAlign:'center', cursor:'none', transition:'var(--transition)' }}
                onMouseEnter={e => e.currentTarget.style.borderColor='rgba(245,200,66,0.3)'}
                onMouseLeave={e => e.currentTarget.style.borderColor='var(--border)'}>
                <div style={{ fontSize:'2rem', marginBottom:'0.75rem' }}>{s.icon}</div>
                <h4 style={{ fontSize:'1rem', marginBottom:'0.5rem' }}>{s.title}</h4>
                <p style={{ fontSize:'0.82rem', marginBottom:'1.25rem' }}>{s.desc}</p>
                <button className="btn btn-ghost btn-sm" onClick={() => nav('/join')}>{s.cta}</button>
              </div>
            ))}
          </div>
        </div>
        <style>{`@media(max-width:768px){.sp-grid{grid-template-columns:1fr !important}}`}</style>
      </section>
    </main>
  )
}