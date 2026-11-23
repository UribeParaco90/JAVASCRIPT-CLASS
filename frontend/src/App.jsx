import { Routes, Route, Navigate, Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import { useAuth } from './hooks/useAuth'
import Inicio from './pages/Inicio'
import { QuienesSomos, Contacto } from './pages/Estaticas'
import Login from './pages/Login'
import AdminLayout from './pages/admin/AdminLayout'
import Usuarios from './pages/admin/Usuarios'

const Publico = () => (<><Navbar /><main className="pt-16 min-h-screen"><Outlet /></main><Footer /><WhatsAppButton /></>)
function Guard({ roles }) { const { user } = useAuth(); return user && roles.includes(user.rol) ? <Outlet /> : <Navigate to="/login" replace /> }
const Dashboard = () => { const { user } = useAuth(); return <h2 className="text-2xl font-display">Hola, {user.nombre}. Rol: {user.rol}</h2> }

export default function App() {
  return (
    <Routes>
      <Route element={<Publico />}>
        <Route path="/" element={<Inicio />} />
        <Route path="/quienes-somos" element={<QuienesSomos />} />
        <Route path="/contacto" element={<Contacto />} />
        <Route path="/login" element={<Login />} />
      </Route>
      <Route element={<Guard roles={['Administrador', 'Empleado']} />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route element={<Guard roles={['Administrador']} />}><Route path="usuarios" element={<Usuarios />} /></Route>
        </Route>
      </Route>
    </Routes>
  )
}
