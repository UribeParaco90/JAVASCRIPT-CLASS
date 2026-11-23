import { useState, useEffect } from 'react'
import Modal from '../../components/Modal'
import api from '../../services/api'
const vacio = { nombre: '', apellido: '', tipo_documento: 'CC', numero_documento: '', direccion: '', telefono: '', email: '', password: '', rol_id: 3, estado: true }
const campos = [['nombre', 'Nombre'], ['apellido', 'Apellido'], ['numero_documento', 'Documento'], ['direccion', 'Dirección'], ['telefono', 'Teléfono'], ['email', 'Correo'], ['password', 'Contraseña']]

export default function Usuarios() {
  const [lista, setLista] = useState([]), [roles, setRoles] = useState([])
  const [sel, setSel] = useState(null), [f, setF] = useState(vacio), [msg, setMsg] = useState(null)
  const cargar = () => api.get('/usuarios').then(r => setLista(r.data)).catch(e => setMsg({ ok: false, t: e.response?.data?.detail || 'Error al consultar' }))
  useEffect(() => { cargar(); api.get('/roles').then(r => setRoles(r.data)) }, [])
  const run = async (fn, ok) => {
    try { await fn(); setMsg({ ok: true, t: ok }); setSel(null); cargar() }
    catch (e) { setMsg({ ok: false, t: typeof e.response?.data?.detail === 'string' ? e.response.data.detail : 'Revisa los datos ingresados' }) }
  }
  const abrir = u => { setF(u ? { ...u, password: '' } : vacio); setSel(u || 'nuevo') }
  const guardar = e => {
    e.preventDefault()
    const d = { ...f, rol_id: +f.rol_id }; if (sel !== 'nuevo' && !d.password) delete d.password
    run(() => sel === 'nuevo' ? api.post('/usuarios', d) : api.put(`/usuarios/${sel.id}`, d), 'Usuario guardado correctamente')
  }
  const borrar = u => window.confirm(`¿Eliminar a ${u.nombre} ${u.apellido}?`) && run(() => api.delete(`/usuarios/${u.id}`), 'Usuario eliminado')
  const alternar = u => run(() => api.put(`/usuarios/${u.id}`, { estado: !u.estado }), 'Estado actualizado')
  return (
    <div>
      <div className="flex justify-between items-center mb-4"><h2 className="font-display text-2xl">Usuarios</h2>
        <button onClick={() => abrir()} className="rounded-lg bg-brand text-white px-4 py-2">Nuevo usuario</button></div>
      {msg && <p className={`mb-3 rounded-lg p-2 text-sm ${msg.ok ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>{msg.t}</p>}
      <div className="overflow-x-auto bg-white rounded-xl">
        <table className="w-full text-sm"><thead className="text-left bg-slate-100"><tr>{['Nombre', 'Correo', 'Rol', 'Estado', 'Acciones'].map(h => <th key={h} className="p-3">{h}</th>)}</tr></thead>
          <tbody>{lista.map(u => (
            <tr key={u.id} className="border-t"><td className="p-3">{u.nombre} {u.apellido}</td><td>{u.email}</td><td>{u.rol}</td>
              <td><button onClick={() => alternar(u)} className={`px-2 rounded-full text-xs ${u.estado ? 'bg-green-100 text-green-800' : 'bg-slate-200'}`}>{u.estado ? 'Activo' : 'Inactivo'}</button></td>
              <td className="space-x-2"><button onClick={() => abrir(u)} className="text-brand">Editar</button><button onClick={() => borrar(u)} className="text-red-600">Eliminar</button></td></tr>))}</tbody></table>
      </div>
      <Modal open={!!sel} onClose={() => setSel(null)} title={sel === 'nuevo' ? 'Nuevo usuario' : 'Editar usuario'}>
        <form onSubmit={guardar} className="grid gap-3 sm:grid-cols-2">
          {campos.map(([k, l]) => <label key={k} className="text-sm">{l}
            <input value={f[k]} type={k === 'password' ? 'password' : 'text'} placeholder={k === 'password' && sel !== 'nuevo' ? 'Sin cambios' : ''} required={k !== 'password' || sel === 'nuevo'}
              onChange={e => setF({ ...f, [k]: e.target.value })} className="w-full border rounded-lg px-3 py-2" /></label>)}
          <label className="text-sm">Rol<select value={f.rol_id} onChange={e => setF({ ...f, rol_id: e.target.value })} className="w-full border rounded-lg px-3 py-2">{roles.map(r => <option key={r.id} value={r.id}>{r.nombre}</option>)}</select></label>
          <label className="text-sm flex items-center gap-2"><input type="checkbox" checked={f.estado} onChange={e => setF({ ...f, estado: e.target.checked })} />Activo</label>
          <button className="sm:col-span-2 rounded-lg bg-brand text-white py-2">Guardar cambios</button>
        </form>
      </Modal>
    </div>
  )
}
