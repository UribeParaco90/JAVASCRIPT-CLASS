import { useState } from 'react'
import { NavLink, Outlet, Link, useNavigate } from 'react-router-dom'
import Logo from '../../components/Logo'
import { useAuth } from '../../hooks/useAuth'
const menu = [['/admin', 'Dashboard', ['Administrador', 'Empleado']], ['/admin/usuarios', 'Usuarios', ['Administrador']]]
export default function AdminLayout() {
  const { user, logout } = useAuth(), nav = useNavigate(), [open, setOpen] = useState(false)
  return (
    <div className="min-h-screen bg-mist">
      <header className="fixed top-0 inset-x-0 h-14 z-30 bg-white border-b flex items-center justify-between px-4">
        <div className="flex items-center gap-3"><button className="md:hidden" aria-label="Menú" onClick={() => setOpen(!open)}>☰</button><Link to="/"><Logo /></Link></div>
        <div className="flex items-center gap-3 text-sm"><span>{user.nombre} · {user.rol}</span>
          <button onClick={() => { logout(); nav('/login') }} className="rounded-lg bg-ink text-white px-3 py-1">Cerrar sesión</button></div>
      </header>
      <aside className={`fixed top-14 bottom-0 left-0 w-56 bg-ink text-slate-200 p-3 z-20 ${open ? 'block' : 'hidden'} md:block`} onClick={() => setOpen(false)}>
        {menu.filter(m => m[2].includes(user.rol)).map(([to, t]) => (
          <NavLink key={to} to={to} end className={({ isActive }) => `block rounded-lg px-3 py-2 mb-1 ${isActive ? 'bg-brand text-white' : 'hover:bg-slate-700'}`}>{t}</NavLink>))}
      </aside>
      <main className="pt-20 md:pl-60 px-4 pb-8"><Outlet /></main>
    </div>
  )
}
