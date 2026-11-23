// Campo reutilizable con indicador visual: gris = pendiente, verde = correcto, rojo = error.
export default function Field({ form, name, label, options, ...rest }) {
  const { values, errors, touched, onChange } = form
  const err = touched[name] && errors[name]
  const ok = touched[name] && !errors[name]
  const cls = `w-full rounded-lg border px-3 py-2 outline-none focus:ring-2 ${err ? 'border-red-500 focus:ring-red-200' : ok ? 'border-green-500 focus:ring-green-200' : 'border-slate-300 focus:ring-cyan-200'}`
  return (
    <label className="block text-sm">
      <span className="font-medium text-slate-700">{label}</span>
      {options
        ? <select name={name} value={values[name]} onChange={onChange} className={cls}><option value="">Selecciona...</option>{options.map(o => <option key={o}>{o}</option>)}</select>
        : <input name={name} value={values[name]} onChange={onChange} className={cls} {...rest} />}
      {err && <span className="text-red-600 text-xs">{errors[name]}</span>}
    </label>
  )
}
