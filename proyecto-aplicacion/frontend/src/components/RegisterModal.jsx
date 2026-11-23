import { useState } from 'react'
import Modal from './Modal'
import Field from './Field'
import useForm from '../hooks/useForm'
import api from '../services/api'
import { validateRegister, pwdRules } from '../utils/validators'

const init = { nombre: '', apellido: '', tipo_documento: '', numero_documento: '', direccion: '', telefono: '', email: '', password: '', confirm: '', acepta: false }

export default function RegisterModal({ open, onClose, onSuccess }) {
  const form = useForm(init, validateRegister)
  const [msg, setMsg] = useState('')
  const v = form.values
  const close = () => { form.reset(); setMsg(''); onClose() }
  const submit = async e => {
    e.preventDefault(); if (!form.valid) return
    try {
      const { confirm, acepta, ...payload } = v
      await api.post('/auth/register', payload)
      form.reset(); setMsg(''); onSuccess('Cuenta creada. Ya puedes iniciar sesión.')
    } catch (x) { setMsg(x.response?.data?.detail || 'No se pudo completar el registro') }
  }
  return (
    <Modal open={open} onClose={close} title="Crear una cuenta">
      <form onSubmit={submit} className="grid gap-3 sm:grid-cols-2" noValidate>
        <Field form={form} name="nombre" label="Nombre" maxLength={40} />
        <Field form={form} name="apellido" label="Apellido" maxLength={40} />
        <Field form={form} name="tipo_documento" label="Tipo de documento" options={['CC', 'CE', 'TI', 'Pasaporte']} />
        <Field form={form} name="numero_documento" label="Número de documento" maxLength={12} inputMode="numeric" />
        <Field form={form} name="direccion" label="Dirección" maxLength={120} />
        <Field form={form} name="telefono" label="Teléfono" maxLength={10} inputMode="numeric" />
        <div className="sm:col-span-2"><Field form={form} name="email" label="Correo electrónico" type="email" maxLength={120} /></div>
        <Field form={form} name="password" label="Contraseña" type="password" maxLength={64} />
        <Field form={form} name="confirm" label="Confirmar contraseña" type="password" maxLength={64} />
        <ul className="sm:col-span-2 grid grid-cols-2 gap-x-3 text-xs">
          {pwdRules(v.password, v.nombre, v.apellido).map(([t, ok]) => <li key={t} className={ok ? 'text-green-600' : 'text-slate-400'}>{ok ? '✔' : '○'} {t}</li>)}
        </ul>
        <label className="sm:col-span-2 text-sm flex gap-2 items-start">
          <input type="checkbox" name="acepta" checked={v.acepta} onChange={form.onChange} className="mt-1" />
          <span>Acepto la política de tratamiento de datos personales.{form.touched.acepta && form.errors.acepta && <b className="block text-red-600 text-xs font-normal">{form.errors.acepta}</b>}</span>
        </label>
        {msg && <p className="sm:col-span-2 text-red-600 text-sm">{msg}</p>}
        <div className="sm:col-span-2 flex gap-2 justify-end">
          <button type="button" onClick={close} className="px-4 py-2 rounded-lg border">Cancelar</button>
          <button disabled={!form.valid} className="px-4 py-2 rounded-lg bg-brand text-white disabled:opacity-40">Crear cuenta</button>
        </div>
      </form>
    </Modal>
  )
}
