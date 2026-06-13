import { useState, useEffect } from 'react'

export default function Loader() {
  const [done, setDone] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setDone(true), 1800)
    return () => clearTimeout(t)
  }, [])
  return (
    <div className={`loader ${done ? 'done' : ''}`}>
      <div className="loader-logo">The <span>Competence</span></div>
      <div className="loader-bar-wrap"><div className="loader-bar" /></div>
    </div>
  )
}