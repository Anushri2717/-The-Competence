import { createContext, useContext, useState, useEffect } from 'react'

const Ctx = createContext(null)

const USERS = [
  { id:'1', name:'Saanthosh K', email:'admin@thecompetence.in', password:'admin123', role:'admin', college:'The Competence', domain:'Community', type:'founder', avatar:'SK', color:'#2B6EF5', joined:'2024-10-01' },
  { id:'2', name:'Arjun Kumar', email:'student@demo.com', password:'student123', role:'member', college:'CEG, Anna University', domain:'Full Stack Development', type:'student', year:'3rd Year', avatar:'AK', color:'#1A50C8', joined:'2025-01-10' },
]

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    try {
      const saved = localStorage.getItem('tc_user')
      if (saved) setUser(JSON.parse(saved))
    } catch {}
  }, [])

  const login = (email, password) => {
    const found = USERS.find(u => u.email === email && u.password === password)
    if (!found) throw new Error('Invalid email or password')
    const { password: _, ...safe } = found
    localStorage.setItem('tc_user', JSON.stringify(safe))
    setUser(safe)
    return safe
  }

  const register = (data) => {
    if (USERS.find(u => u.email === data.email)) throw new Error('Email already registered')
    const initials = data.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    const colors = ['#2B6EF5','#1A50C8','#3B7CF5','#4A8CF8']
    const newUser = {
      id: String(Date.now()), name: data.name, email: data.email,
      role: 'member', college: data.college, domain: data.domain,
      type: data.type || 'student', year: data.year || '',
      avatar: initials, color: colors[Math.floor(Math.random() * colors.length)],
      joined: new Date().toISOString().split('T')[0]
    }
    localStorage.setItem('tc_user', JSON.stringify(newUser))
    setUser(newUser)
    return newUser
  }

  const logout = () => { localStorage.removeItem('tc_user'); setUser(null) }

  return <Ctx.Provider value={{ user, login, register, logout }}>{children}</Ctx.Provider>
}

export const useAuth = () => useContext(Ctx)