export const QuienesSomos = () => (
  <section className="max-w-3xl mx-auto px-4 py-12">
    <h1 className="font-display text-3xl mb-4">¿Quiénes somos?</h1>
    <p className="text-slate-600 mb-3">IncognitoTech es una tienda de tecnología creada para que comprar un equipo sea simple y confiable.</p>
    <p className="text-slate-600"><b>Misión:</b> acercar la mejor tecnología a cada hogar. <b>Visión:</b> ser la tienda tecnológica de referencia del país.</p>
  </section>)
export const Contacto = () => (
  <section className="max-w-xl mx-auto px-4 py-12">
    <h1 className="font-display text-3xl mb-4">Contacto</h1>
    <form className="space-y-3" onSubmit={e => { e.preventDefault(); alert('Mensaje enviado') }}>
      <input required placeholder="Nombre" className="w-full border rounded-lg px-3 py-2" />
      <input required type="email" placeholder="Correo" className="w-full border rounded-lg px-3 py-2" />
      <textarea required rows="4" placeholder="Mensaje" className="w-full border rounded-lg px-3 py-2" />
      <button className="rounded-lg bg-brand text-white px-5 py-2">Enviar mensaje</button>
    </form>
  </section>)
