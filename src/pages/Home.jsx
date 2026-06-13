import { useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { useReveal, useCounter } from '../hooks/useReveal.js'

const DOMAINS = [
  { icon: '💻', name: 'Full Stack Dev', desc: 'React, Node, databases & deployment.', count: 120 },
  { icon: '🤖', name: 'AI / ML', desc: 'Deep learning, NLP & AI tools.', count: 85 },
  { icon: '🎨', name: 'UI/UX Design', desc: 'Figma, user research & design systems.', count: 60 },
  { icon: '📈', name: 'Digital Marketing', desc: 'SEO, content & social strategy.', count: 75 },
  { icon: '🔐', name: 'Cybersecurity', desc: 'Ethical hacking & CTF challenges.', count: 45 },
  { icon: '💰', name: 'Finance & Fintech', desc: 'Markets, modeling & blockchain.', count: 55 },
  { icon: '📊', name: 'Data Science', desc: 'Analytics, SQL & visualisation.', count: 40 },
  { icon: '🏗️', name: 'Product Mgmt', desc: 'Roadmaps, Agile & user stories.', count: 35 },
]

const MEMBERS = [
  { av: 'AK', color: '#2B6EF5', name: 'Arjun Kumar', college: 'CEG Chennai', domain: 'Full Stack' },
  { av: 'SR', color: '#7C3AED', name: 'Sneha Rajan', college: 'SSN College', domain: 'UI/UX Design' },
  { av: 'PK', color: '#EC4899', name: 'Praveen K', college: 'PSG Tech', domain: 'AI / ML' },
  { av: 'MR', color: '#F59E0B', name: 'Meera Raj', college: 'SRM University', domain: 'Marketing' },
  { av: 'RV', color: '#10B981', name: 'Ravi Varman', college: 'TCS (Working)', domain: 'Full Stack' },
  { av: 'VK', color: '#14B8A6', name: 'Vikram K', college: 'NIT Trichy', domain: 'Cybersecurity' },
  { av: 'NK', color: '#F97316', name: 'Nithya K', college: 'SKCET', domain: 'Finance' },
  { av: 'SK', color: '#8B5CF6', name: 'Saanthosh K', college: 'Founder', domain: 'Community' },
]

const EVENTS = [
  { title: 'Marketing Strategy Workshop', org: 'Wyntrix', date: 'Feb 2025', mode: 'Online', status: 'Completed', color: 'linear-gradient(135deg,#003d99,#2B6EF5)', tags: ['Marketing','Branding'] },
  { title: 'Full Stack Dev Bootcamp', org: 'The Competence', date: 'Apr 2025', mode: 'Hybrid', status: 'Upcoming', color: 'linear-gradient(135deg,#005533,#00875A)', tags: ['React','Node.js'] },
  { title: 'SRM Hackfest 2025', org: 'SRM University', date: 'May 3–4', mode: 'In-Person', status: 'Open', color: 'linear-gradient(135deg,#5B2D8E,#7C3AED)', tags: ['Hackathon','Rs1L prize'] },
]

const UPDATES = [
  { cat: 'AI & Tech', title: 'Google releases Gemini 2.0 with native multimodal capabilities', time: '2h ago' },
  { cat: 'Hackathon', title: 'Smart India Hackathon 2025 — Problem statements released', time: '1d ago' },
  { cat: 'Career', title: 'Infosys opens campus recruitment for 2025 batch — 50,000 seats', time: '2d ago' },
  { cat: 'Learning', title: 'AWS offers free cloud practitioner certification prep for students', time: '3d ago' },
]

function StatNum({ n, suffix = '' }) {
  const ref = useRef(null)
  useCounter(n, ref)
  return <span ref={ref}>0</span>
}

export default function Home() {
  const nav = useNavigate()
  useReveal()
  const dbl = [...MEMBERS, ...MEMBERS]

  return (
    <main>
      {/* HERO */}
      <section className="hero">
        <div className="hero-bg" />
        <div className="hero-grid-bg" />
        <div className="wrap hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Now open for all colleges in Tamil Nadu
          </div>
          <h1>Where <em>students</em><br />level up — together</h1>
          <p className="hero-sub">
            The Competence connects <strong style={{ color: 'var(--ink)' }}>students & professionals</strong> across colleges.
            Pick your domain, find your people, build real things.
          </p>
          <div className="hero-cta">
            <button className="btn btn-gold" onClick={() => nav('/join')}>Join for Free →</button>
            <button className="btn btn-ghost" onClick={() => nav('/domains')}>Explore Domains</button>
          </div>
          <div className="hero-stats">
            {[{ n:500, s:'+', l:'Members' },{ n:22, s:'+', l:'Colleges' },{ n:8, s:'', l:'Domains' },{ n:5, s:'+', l:'Workshops' }].map(({ n, s, l }) => (
              <div key={l} className="stat-box">
                <div className="stat-num"><StatNum n={n} />{s}</div>
                <div className="stat-lbl">{l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* DOMAINS */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="wrap">
          <div className="reveal">
            <div className="section-eyebrow">Domains</div>
            <h2 className="section-title">Choose your <span className="gold">field of growth</span></h2>
            <p className="section-desc">Pick what excites you — or join multiple. Each domain has its own group, projects, and community.</p>
          </div>
          <div className="domains-grid">
            {DOMAINS.map((d, i) => (
              <button key={d.name} className={`card domain-card reveal d${(i % 4) + 1}`}
                onClick={() => nav('/domains')} style={{ textAlign: 'left', width: '100%', cursor: 'none' }}>
                <div className="domain-icon-wrap">{d.icon}</div>
                <h3>{d.name}</h3>
                <p>{d.desc}</p>
                <span className="domain-count">→ {d.count}+ members</span>
              </button>
            ))}
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* HOW IT WORKS */}
      <section className="section" style={{ background: 'var(--bg2)' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }} className="hiw-grid">
            <div className="reveal-l">
              <div className="section-eyebrow">How it works</div>
              <h2 style={{ marginBottom: '2.5rem' }}>From <span className="gold">"I want to improve"</span> to "I'm building it"</h2>
              {[
                { icon: '🎯', title: 'Pick your domain', desc: 'Choose from 8 domains. Get added to your domain group with students from 20+ colleges.' },
                { icon: '🤝', title: 'Connect across colleges', desc: 'Meet peers and working professionals who share your goals — beyond your campus.' },
                { icon: '🚀', title: 'Build real projects', desc: 'Post ideas, find collaborators, ship products that go on your portfolio and GitHub.' },
                { icon: '📡', title: 'Stay ahead', desc: 'Hackathon alerts, workshops, job leads, and tech updates — curated daily for you.' },
              ].map((f, i) => (
                <div key={f.title} className={`reveal d${i + 1}`}
                  style={{ display: 'flex', gap: '1.25rem', padding: '1.25rem', borderRadius: 'var(--radius-sm)', transition: 'var(--transition)', marginBottom: '0.4rem', cursor: 'none' }}
                  onMouseEnter={e => e.currentTarget.style.background = 'rgba(43,110,245,0.07)'}
                  onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                  <div style={{ width: 48, height: 48, borderRadius: 14, background: 'var(--bg3)', border: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.3rem', flexShrink: 0 }}>{f.icon}</div>
                  <div>
                    <h3 style={{ fontSize: '1rem', marginBottom: '0.3rem' }}>{f.title}</h3>
                    <p style={{ fontSize: '0.85rem' }}>{f.desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <div className="reveal-r" style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '100%', maxWidth: 320, background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 28, padding: '1.75rem', boxShadow: '0 40px 80px rgba(0,0,0,0.5)', animation: 'float 6s ease-in-out infinite' }}>
                <div style={{ width: 60, height: 5, background: 'var(--bg3)', borderRadius: 3, margin: '0 auto 1.5rem' }} />
                <div style={{ fontSize: '0.68rem', color: 'var(--ink2)', marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.08em', fontWeight: 700 }}>Live Community Feed</div>
                {[
                  { dot: 'var(--cyan)', text: 'Karthik posted a new project in Full Stack' },
                  { dot: 'var(--gold)', text: 'Full Stack Bootcamp — April 2025, register now' },
                  { dot: 'var(--blue)', text: 'AI Domain — 3 members looking for collaborators' },
                  { dot: 'var(--cyan)', text: 'SRM Hackfest 2025 — Rs1L prize, May 3-4' },
                  { dot: 'var(--gold)', text: 'Priya from SSN joined UI/UX Design domain' },
                ].map((f, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.7rem', background: 'var(--bg2)', borderRadius: 10, padding: '0.7rem', border: '1px solid var(--border)', marginBottom: '0.6rem' }}>
                    <div style={{ width: 7, height: 7, borderRadius: '50%', background: f.dot, flexShrink: 0 }} />
                    <div style={{ fontSize: '0.75rem', color: 'var(--ink2)', lineHeight: 1.4 }}>{f.text}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <style>{`@keyframes float{0%,100%{transform:translateY(0)}50%{transform:translateY(-12px)}} @media(max-width:900px){.hiw-grid{grid-template-columns:1fr !important}}`}</style>
      </section>

      <div className="divider" />

      {/* EVENTS */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="wrap">
          <div className="reveal">
            <div className="section-eyebrow">Events</div>
            <h2 className="section-title">Workshops, hackathons & <span className="gold">tech fests</span></h2>
            <p className="section-desc">From our own workshops to hackathons at colleges near you — never miss an opportunity.</p>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', gap: '1.25rem' }} className="ev-grid">
            {EVENTS.map((e, i) => (
              <div key={e.title} className={`card event-card reveal d${i + 1}`}>
                <div className="event-top" style={{ background: e.color }}>
                  <div className="event-status">{e.status === 'Completed' ? '✅' : e.status === 'Open' ? '📢' : '🔜'} {e.status}</div>
                  <h3>{e.title}</h3>
                  <div style={{ marginTop: '0.6rem' }}>
                    <span className="event-pill">📅 {e.date}</span>
                    <span className="event-pill">🌐 {e.mode}</span>
                  </div>
                </div>
                <div className="event-body">
                  <div style={{ fontSize: '0.78rem', color: 'var(--ink2)', marginBottom: '0.75rem', fontWeight: 600 }}>by {e.org}</div>
                  <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                    {e.tags.map(t => <span key={t} className="tag">{t}</span>)}
                  </div>
                  <button className="btn btn-blue btn-sm" style={{ marginTop: '1.1rem', width: '100%', justifyContent: 'center' }} onClick={() => nav('/events')}>
                    {e.status === 'Completed' ? 'View Details' : 'Register →'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: '2.5rem' }} className="reveal">
            <button className="btn btn-ghost" onClick={() => nav('/events')}>View all events →</button>
          </div>
        </div>
        <style>{`@media(max-width:900px){.ev-grid{grid-template-columns:1fr !important}}`}</style>
      </section>

      <div className="divider" />

      {/* MARQUEE */}
      <section className="section-sm" style={{ background: 'var(--bg2)' }}>
        <div className="wrap" style={{ marginBottom: '2.5rem', textAlign: 'center' }}>
          <div className="reveal">
            <div className="section-eyebrow" style={{ justifyContent: 'center' }}>Community</div>
            <h2>500+ members. <span className="gold">One direction.</span></h2>
          </div>
        </div>
        <div className="marquee-wrap">
          <div className="marquee-track">
            {dbl.map((m, i) => (
              <div key={i} className="member-pill">
                <div className="mem-av" style={{ background: m.color }}>{m.av}</div>
                <div>
                  <div className="mem-name">{m.name}</div>
                  <div className="mem-college">{m.college} · {m.domain}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="wrap" style={{ marginTop: '3rem' }}>
          <div className="reveal" style={{ textAlign: 'center', padding: '3rem', background: 'var(--bg)', border: '1px solid var(--border)', borderRadius: 'var(--radius-lg)' }}>
            <h2 style={{ marginBottom: '0.85rem' }}>Ready to find <span className="gold">your people?</span></h2>
            <p style={{ maxWidth: 480, margin: '0 auto 2rem' }}>Join a community where your growth is everyone's goal.</p>
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
              <button className="btn btn-gold" onClick={() => nav('/join')}>Join for Free →</button>
              <button className="btn btn-ghost" onClick={() => nav('/community')}>Browse Members</button>
            </div>
          </div>
        </div>
      </section>

      <div className="divider" />

      {/* UPDATES */}
      <section className="section" style={{ background: 'var(--bg)' }}>
        <div className="wrap">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem', alignItems: 'start' }} className="up-grid">
            <div className="reveal-l">
              <div className="section-eyebrow">Tech Updates</div>
              <h2 style={{ marginBottom: '1.25rem' }}>Stay ahead of the <span className="gold">curve</span></h2>
              <p style={{ marginBottom: '2rem' }}>Curated tech news, hackathon alerts, and career opportunities — always informed.</p>
              <button className="btn btn-blue" onClick={() => nav('/community')}>Join Community →</button>
            </div>
            <div className="reveal">
              {UPDATES.map((u, i) => (
                <div key={i} className="update-row">
                  <div className="update-meta">
                    <span className="update-cat">{u.cat}</span>
                    <span className="update-time">{u.time}</span>
                  </div>
                  <h4>{u.title}</h4>
                </div>
              ))}
            </div>
          </div>
        </div>
        <style>{`@media(max-width:768px){.up-grid{grid-template-columns:1fr !important}}`}</style>
      </section>
    </main>
  )
}