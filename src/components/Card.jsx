export function Card({ children, style = {}, onClick, className = '' }) {
  return <div className={`card ${className}`} style={style} onClick={onClick}>{children}</div>
}

export function StatCard({ icon, value, label, color }) {
  return (
    <div className="card" style={{ padding: '1.5rem', textAlign: 'center' }}>
      <div style={{ fontSize: '1.75rem', marginBottom: '0.4rem' }}>{icon}</div>
      <div style={{ fontSize: '1.6rem', fontWeight: 900, color: color || 'var(--ink)', lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: '0.72rem', color: 'var(--ink2)', marginTop: '0.3rem', textTransform: 'uppercase', letterSpacing: '0.06em', fontWeight: 700 }}>{label}</div>
    </div>
  )
}

export function EmptyState({ icon = '📭', title, desc, action }) {
  return (
    <div className="empty">
      <div className="empty-icon">{icon}</div>
      <h3>{title}</h3>
      {desc && <p>{desc}</p>}
      {action}
    </div>
  )
}

export function Spinner({ size = 28 }) {
  return <div className="spin" style={{ width: size, height: size }} />
}

export function Modal({ open, onClose, title, children }) {
  if (!open) return null
  return (
    <div className="modal-bg" onClick={e => e.target === e.currentTarget && onClose()}>
      <div className="modal-box">
        <div className="modal-head">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        {children}
      </div>
    </div>
  )
}