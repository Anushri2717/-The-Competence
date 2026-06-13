import { useNavigate } from 'react-router-dom'
import logo from '../logo.jpeg'

export default function Footer() {
  const nav = useNavigate()
  const go = to => nav(to)
  const cols = [
    { h:'Explore', links:[['Domains','/domains'],['Events','/events'],['Projects','/projects'],['Community','/community']] },
    { h:'Community', links:[['Join Free','/join'],['About Us','/about'],['Our Team','/about'],['Sponsors','/about']] },
    { h:'Connect', links:[['Contact','/about'],['Partner with us','/about'],['Conduct Workshop','/about'],['WhatsApp','/about']] },
  ]
  return (
    <footer style={{ background:'var(--bg2)', borderTop:'1px solid var(--border)', padding:'5rem 0 2.5rem' }}>
      <div className="wrap">
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:'3rem', marginBottom:'3.5rem' }} className="footer-grid">
          <div>
            <button onClick={() => go('/')} style={{ display:'flex', alignItems:'center', gap:'0.7rem', marginBottom:'1rem', background:'none', border:'none', cursor:'none' }}>
              <img src={logo} alt="logo" style={{ width:34, height:34, borderRadius:9, objectFit:'cover' }} />
              <span style={{ fontWeight:800, fontSize:'1.05rem' }}>The Competence</span>
            </button>
            <p style={{ fontSize:'0.86rem', maxWidth:265, lineHeight:1.75, color:'var(--ink2)' }}>
              A community for students & professionals to grow, connect, and build real skills together.
            </p>
            <div style={{ display:'flex', gap:'0.6rem', marginTop:'1.5rem' }}>
              {['📸','💼','💬','🎮'].map((ic, i) => (
                <a key={i} href="#" style={{ width:36, height:36, borderRadius:10, background:'var(--bg3)', border:'1px solid var(--border)', display:'flex', alignItems:'center', justifyContent:'center', fontSize:'0.9rem', transition:'var(--transition)' }}
                  onMouseEnter={e => { e.currentTarget.style.background='var(--blue)'; e.currentTarget.style.borderColor='var(--blue)' }}
                  onMouseLeave={e => { e.currentTarget.style.background='var(--bg3)'; e.currentTarget.style.borderColor='var(--border)' }}>
                  {ic}
                </a>
              ))}
            </div>
          </div>
          {cols.map(col => (
            <div key={col.h}>
              <h5 style={{ fontSize:'0.76rem', fontWeight:800, textTransform:'uppercase', letterSpacing:'0.1em', color:'var(--ink)', marginBottom:'1.1rem' }}>{col.h}</h5>
              {col.links.map(([lbl, to]) => (
                <button key={lbl} onClick={() => go(to)} style={{ display:'block', background:'none', border:'none', cursor:'none', fontSize:'0.86rem', color:'var(--ink2)', marginBottom:'0.5rem', transition:'color 0.2s' }}
                  onMouseEnter={e => e.target.style.color='var(--ink)'}
                  onMouseLeave={e => e.target.style.color='var(--ink2)'}>
                  {lbl}
                </button>
              ))}
            </div>
          ))}
        </div>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:'2rem', borderTop:'1px solid var(--border)', flexWrap:'wrap', gap:'0.5rem' }}>
          <p style={{ fontSize:'0.8rem', color:'var(--ink2)' }}>© 2025 The Competence. Built by Saanthosh & team.</p>
          <p style={{ fontSize:'0.8rem', color:'var(--ink2)' }}>Connecting colleges, one domain at a time.</p>
        </div>
      </div>
      <style>{`@media(max-width:900px){.footer-grid{grid-template-columns:1fr 1fr !important}} @media(max-width:580px){.footer-grid{grid-template-columns:1fr !important}}`}</style>
    </footer>
  )
}