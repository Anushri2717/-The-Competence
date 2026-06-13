import { useNavigate } from 'react-router-dom'
import { useReveal } from '../hooks/useReveal.js'

const DOMAINS = [
  { id:'fullstack', icon:'💻', name:'Full Stack Development', desc:'Build complete web and mobile apps from frontend to backend. Master React, Node.js, databases and cloud deployment.', skills:['React / Next.js','Node.js','MongoDB','PostgreSQL','Docker','REST APIs'], members:120, color:'#2B6EF5' },
  { id:'aiml', icon:'🤖', name:'AI / Machine Learning', desc:'Deep learning, NLP, computer vision, and AI tools. Build projects using the technologies shaping the future.', skills:['Python','TensorFlow','PyTorch','LangChain','OpenCV','Scikit-learn'], members:85, color:'#7C3AED' },
  { id:'design', icon:'🎨', name:'UI/UX Design', desc:'Create beautiful and usable products. Learn Figma, user research, prototyping, and design systems from scratch.', skills:['Figma','User Research','Prototyping','Design Systems','Framer','Adobe XD'], members:60, color:'#EC4899' },
  { id:'marketing', icon:'📈', name:'Digital Marketing', desc:'Master SEO, content strategy, social media, and paid ads. Work on real campaigns alongside professionals.', skills:['SEO','Content Strategy','Meta Ads','Analytics','Email Marketing','Brand Building'], members:75, color:'#F59E0B' },
  { id:'cyber', icon:'🔐', name:'Cybersecurity', desc:'Ethical hacking, network security, CTF challenges, and penetration testing. Protect the digital world.', skills:['Kali Linux','Ethical Hacking','Network Security','CTF','OWASP','Cryptography'], members:45, color:'#10B981' },
  { id:'finance', icon:'💰', name:'Finance & Fintech', desc:'Stock markets, financial modeling, blockchain, and fintech products for the next generation of finance pros.', skills:['Stock Markets','Financial Modeling','Blockchain','Startup Finance','Python','Investment'], members:55, color:'#14B8A6' },
  { id:'data', icon:'📊', name:'Data Science', desc:'Transform raw data into insights. Data wrangling, visualisation, statistical analysis, and business intelligence.', skills:['Python / R','Pandas','Tableau','SQL','Power BI','Statistics'], members:40, color:'#F97316' },
  { id:'product', icon:'🏗️', name:'Product Management', desc:'Lead product teams from idea to launch. Roadmapping, user stories, Agile, A/B testing, and metrics.', skills:['Product Strategy','User Stories','Agile / Scrum','A/B Testing','Roadmapping','Metrics'], members:35, color:'#8B5CF6' },
]

export default function Domains() {
  const nav = useNavigate()
  useReveal()
  return (
    <main>
      <section className="page-hero">
        <div className="wrap">
          <div className="section-eyebrow" style={{ justifyContent: 'center' }}>8 Domains</div>
          <h1 className="reveal">Choose your <span className="gold">path to mastery</span></h1>
          <p className="reveal d1">Pick what excites you — or join multiple. Each domain has its own group, projects, and community.</p>
          <div className="reveal d2" style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', justifyContent: 'center' }}>
            {[['500+','Members'],['20+','Colleges'],['30+','Projects'],['8','Domains']].map(([n,l]) => (
              <div key={l} style={{ background: 'rgba(245,200,66,0.08)', border: '1px solid rgba(245,200,66,0.18)', borderRadius: 100, padding: '0.45rem 1.1rem', fontSize: '0.84rem', fontWeight: 700 }}>
                <span className="gold">{n}</span> {l}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '2rem' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2,1fr)', gap: '1.5rem' }} className="dom-grid">
            {DOMAINS.map((d, i) => (
              <div key={d.id} className={`card reveal d${(i%2)+1}`} style={{ padding: '2rem', position: 'relative', overflow: 'hidden', cursor: 'none' }}>
                <div style={{ position: 'absolute', top: 0, left: 0, right: 0, height: 3, background: `linear-gradient(90deg,${d.color},var(--cyan))`, opacity: 0, transition: 'opacity 0.3s' }}
                  onMouseEnter={e => e.currentTarget.style.opacity = 1}
                  onMouseLeave={e => e.currentTarget.style.opacity = 0} />
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '1rem' }}>
                  <span style={{ fontSize: '2.2rem' }}>{d.icon}</span>
                  <span className="tag">{d.members}+ members</span>
                </div>
                <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>{d.name}</h3>
                <p style={{ fontSize: '0.87rem', marginBottom: '1.25rem', lineHeight: 1.65 }}>{d.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.35rem', marginBottom: '1.4rem' }}>
                  {d.skills.map(s => <span key={s} style={{ fontSize: '0.7rem', padding: '0.2rem 0.6rem', borderRadius: 100, background: 'var(--bg3)', border: '1px solid var(--border)', color: 'var(--ink2)' }}>{s}</span>)}
                </div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '1rem', borderTop: '1px solid var(--border)' }}>
                  <div style={{ display: 'flex' }}>
                    {['AK','SR','PK'].map((a, ai) => (
                      <div key={ai} style={{ width: 28, height: 28, borderRadius: '50%', background: ['#2B6EF5','#7C3AED','#EC4899'][ai], marginLeft: ai===0?0:-9, border: '2px solid var(--bg2)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.58rem', fontWeight: 800 }}>{a}</div>
                    ))}
                  </div>
                  <button className="btn btn-blue btn-sm" onClick={() => nav('/join')}>Join Domain →</button>
                </div>
              </div>
            ))}
          </div>
          <div className="reveal" style={{ textAlign: 'center', marginTop: '4rem', padding: '3rem', background: 'var(--bg2)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
            <h2 style={{ marginBottom: '0.85rem', fontSize: 'clamp(1.6rem,3vw,2.4rem)' }}>Not sure which domain? <span className="gold">That's okay.</span></h2>
            <p style={{ maxWidth: 480, margin: '0 auto 1.75rem' }}>Join as a general member first, explore, and pick your domain as you go.</p>
            <button className="btn btn-gold" onClick={() => nav('/join')}>Join The Competence →</button>
          </div>
        </div>
        <style>{`@media(max-width:768px){.dom-grid{grid-template-columns:1fr !important}}`}</style>
      </section>
    </main>
  )
}