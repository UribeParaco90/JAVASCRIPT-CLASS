import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Field from '../components/Field'
import RegisterModal from '../components/RegisterModal'
import RecoverPassword from '../components/RecoverPassword'
import useForm from '../hooks/useForm'
import { useAuth } from '../hooks/useAuth'
import api from '../services/api'
import { validateLogin } from '../utils/validators'

export default function Login() {
  const form = useForm({ email: '', password: '', remember: false }, validateLogin)
  const [err, setErr] = useState(''), [ok, setOk] = useState('')
  const [modal, setModal] = useState(false), [recover, setRecover] = useState(false)
  const { login } = useAuth(), nav = useNavigate()
  const submit = async e => {
    e.preventDefault(); if (!form.valid) return
    try {
      const { data } = await api.post('/auth/login', { email: form.values.email, password: form.values.password })
      login(data, form.values.remember)
      nav(data.user.rol === 'Cliente' ? '/' : '/admin')
    } catch (x) { setErr(x.response?.data?.detail || 'No se pudo conectar con el servidor') }
  }
  return (
    <div className="max-w-md mx-auto my-10 px-4">
      <div className="bg-white rounded-2xl shadow-lg p-6">
        {recover ? <RecoverPassword onBack={() => setRecover(false)} /> : (
          <form onSubmit={submit} className="space-y-4" noValidate>
            <h1 className="font-display text-2xl">Iniciar sesión</h1>
            <Field form={form} name="email" label="Correo electrónico" type="email" maxLength={120} />
            <Field form={form} name="password" label="Contraseña" type="password" maxLength={64} />
            <label className="flex items-center gap-2 text-sm"><input type="checkbox" name="remember" checked={form.values.remember} onChange={form.onChange} />Recordarme</label>
            {err && <p className="text-red-600 text-sm" role="alert">{err}</p>}
            {ok && <p className="text-green-600 text-sm">{ok}</p>}
            <button disabled={!form.valid} className="w-full rounded-lg bg-brand text-white py-2 disabled:opacity-40">Iniciar sesión</button>
            <div className="flex justify-between text-sm text-brand">
              <button type="button" onClick={() => setRecover(true)}>¿Olvidaste tu contraseña?</button>
              <button type="button" onClick={() => setModal(true)}>Crear una cuenta</button>
            </div>
          </form>
        )}
      </div>
      <RegisterModal open={modal} onClose={() => setModal(false)} onSuccess={m => { setModal(false); setOk(m) }} />
    </div>
  )
}
