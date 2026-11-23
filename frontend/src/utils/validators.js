export const rx = {
  email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/,
  nombre: /^[A-Za-zÁÉÍÓÚáéíóúÑñ ]{2,40}$/,
  doc: /^[0-9]{6,12}$/,
  tel: /^3[0-9]{9}$/,
}
export const pwdRules = (p, n = '', a = '') => {
  const low = p.toLowerCase()
  return [
    ['Mínimo 10 caracteres', p.length >= 10],
    ['Una letra mayúscula', /[A-Z]/.test(p)],
    ['Una letra minúscula', /[a-z]/.test(p)],
    ['Un número', /\d/.test(p)],
    ['Un carácter especial', /[^A-Za-z0-9]/.test(p)],
    ['No incluye tu nombre ni apellido', !((n && low.includes(n.toLowerCase())) || (a && low.includes(a.toLowerCase())))],
  ]
}
export const validateLogin = v => {
  const e = {}
  if (!v.email) e.email = 'El correo es obligatorio'
  else if (!rx.email.test(v.email)) e.email = 'Escribe un correo válido'
  if (!v.password) e.password = 'La contraseña es obligatoria'
  else if (pwdRules(v.password).some(r => !r[1])) e.password = 'La contraseña no cumple los criterios'
  return e
}
export const validateRecover = v => {
  const e = {}
  if (!v.email) e.email = 'El correo es obligatorio'
  else if (!rx.email.test(v.email)) e.email = 'Escribe un correo válido'
  return e
}
export const validateRegister = v => {
  const e = {}
  if (!rx.nombre.test(v.nombre)) e.nombre = 'Solo letras, de 2 a 40 caracteres'
  if (!rx.nombre.test(v.apellido)) e.apellido = 'Solo letras, de 2 a 40 caracteres'
  if (!v.tipo_documento) e.tipo_documento = 'Selecciona un tipo de documento'
  if (!rx.doc.test(v.numero_documento)) e.numero_documento = 'Solo números, de 6 a 12 dígitos'
  if (v.direccion.trim().length < 5) e.direccion = 'Escribe tu dirección (mínimo 5 caracteres)'
  if (!rx.tel.test(v.telefono)) e.telefono = '10 dígitos y empieza por 3'
  if (!rx.email.test(v.email)) e.email = 'Escribe un correo válido'
  if (pwdRules(v.password, v.nombre, v.apellido).some(r => !r[1])) e.password = 'La contraseña no cumple los requisitos'
  if (!v.confirm || v.confirm !== v.password) e.confirm = 'Las contraseñas no coinciden'
  if (!v.acepta) e.acepta = 'Debes aceptar el tratamiento de datos'
  return e
}
