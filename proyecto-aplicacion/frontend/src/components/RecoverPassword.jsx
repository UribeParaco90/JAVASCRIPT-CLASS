import { useState } from 'react'
import Field from './Field'
import useForm from '../hooks/useForm'
import api from '../services/api'
import { validateRecover } from '../utils/validators'
export default function RecoverPassword({ onBack }) {
  const form = useForm({ email: '' }, validateRecover)
  const [res, setRes] = useState(null)
  const submit = async e => {
    e.preventDefault(); if (!form.valid) return
    try { const { data } = await api.post('/auth/recover', form.values); setRes({ ok: true, t: data.mensaje }) }
    catch { setRes({ ok: false, t: 'No se pudo enviar la solicitud. Inténtalo de nuevo.' }) }
  }
  return (
    <form onSubmit={submit} className="space-y-4" noValidate>
      <h2 className="font-display text-xl">Recuperar contraseña</h2>
      <Field form={form} name="email" label="Correo electrónico" type="email" maxLength={120} />
      {res && <p className={res.ok ? 'text-green-600 text-sm' : 'text-red-600 text-sm'}>{res.t}</p>}
      <button disabled={!form.valid} className="w-full rounded-lg bg-brand text-white py-2 disabled:opacity-40">Recuperar contraseña</button>
      <button type="button" onClick={onBack} className="w-full text-sm text-brand">Volver a iniciar sesión</button>
    </form>
  )
}
