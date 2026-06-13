import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dot = useRef(null)
  const trail = useRef(null)
  let mx = 0, my = 0, tx = 0, ty = 0

  useEffect(() => {
    const move = e => {
      mx = e.clientX; my = e.clientY
      if (dot.current) { dot.current.style.left = mx + 'px'; dot.current.style.top = my + 'px' }
    }
    const animate = () => {
      tx += (mx - tx) * 0.14; ty += (my - ty) * 0.14
      if (trail.current) { trail.current.style.left = tx + 'px'; trail.current.style.top = ty + 'px' }
      requestAnimationFrame(animate)
    }
    document.addEventListener('mousemove', move)
    animate()
    const big = () => { dot.current?.classList.add('big'); trail.current?.classList.add('big') }
    const small = () => { dot.current?.classList.remove('big'); trail.current?.classList.remove('big') }
    const update = () => document.querySelectorAll('a,button,[data-h]').forEach(el => {
      el.addEventListener('mouseenter', big)
      el.addEventListener('mouseleave', small)
    })
    update()
    const obs = new MutationObserver(update)
    obs.observe(document.body, { childList: true, subtree: true })
    return () => { document.removeEventListener('mousemove', move); obs.disconnect() }
  }, [])

  return (
    <>
      <div className="cursor" ref={dot} />
      <div className="cursor-trail" ref={trail} />
    </>
  )
}