import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import Logo from './Logo'
import { useAuth } from '../hooks/useAuth'
export default function Navbar() {
  const [open, setOpen] = useState(false)
  const { user, logout } = useAuth(); const nav = useNavigate()
  const link = ({ isActive }) => `block py-2 md:py-0 hover:text-brand ${isActive ? 'text-brand font-medium' : 'text-slate-600'}`
  return (
    <header className="fixed top-0 inset-x-0 z-40 bg-white/95 backdrop-blur border-b border-slate-200">
      <nav className="max-w-6xl mx-auto h-16 px-4 flex items-center justify-between">
        <Link to="/"><Logo /></Link>
        <button className="md:hidden p-2" aria-label="Menú" onClick={() => setOpen(!open)}>☰</button>
        <ul className={`${open ? 'flex' : 'hidden'} md:flex absolute md:static top-16 inset-x-0 bg-white md:bg-transparent flex-col md:flex-row gap-1 md:gap-6 p-4 md:p-0 border-b md:border-0 items-start md:items-center`} onClick={() => setOpen(false)}>
          <li><NavLink to="/" className={link} end>Inicio</NavLink></li>
          <li><NavLink to="/quienes-somos" className={link}>¿Quiénes somos?</NavLink></li>
          <li><NavLink to="/contacto" className={link}>Contacto</NavLink></li>
          {user && user.rol !== 'Cliente' && <li><NavLink to="/admin" className={link}>Panel</NavLink></li>}
          <li>{user
            ? <button onClick={() => { logout(); nav('/') }} className="rounded-lg bg-ink text-white px-4 py-2">Cerrar sesión</button>
            : <Link to="/login" className="rounded-lg bg-brand text-white px-4 py-2">Iniciar sesión</Link>}</li>
        </ul>
      </nav>
    </header>
  )
}
