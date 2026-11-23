import { createContext, useContext, useState } from 'react'
const Ctx = createContext(null)
export const useAuth = () => useContext(Ctx)
export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user') || sessionStorage.getItem('user') || 'null'))
  const login = (data, remember) => {
    const s = remember ? localStorage : sessionStorage
    s.setItem('token', data.access_token); s.setItem('user', JSON.stringify(data.user)); setUser(data.user)
  }
  const logout = () => { localStorage.clear(); sessionStorage.clear(); setUser(null) }
  return <Ctx.Provider value={{ user, login, logout }}>{children}</Ctx.Provider>
}
