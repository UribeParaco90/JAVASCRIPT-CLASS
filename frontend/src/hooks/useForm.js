import { useState } from 'react'
// Validación en tiempo real: se recalcula en cada render y se muestra al tocar el campo.
export default function useForm(initial, validate) {
  const [values, setValues] = useState(initial)
  const [touched, setTouched] = useState({})
  const errors = validate(values)
  const onChange = e => {
    const { name, type, checked, value } = e.target
    setValues(v => ({ ...v, [name]: type === 'checkbox' ? checked : value }))
    setTouched(t => ({ ...t, [name]: true }))
  }
  const reset = () => { setValues(initial); setTouched({}) }
  return { values, errors, touched, onChange, reset, valid: Object.keys(errors).length === 0 }
}
