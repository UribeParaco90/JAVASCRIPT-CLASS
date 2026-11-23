import Carousel from '../components/Carousel'
const items = [['Envío rápido', 'Recibe tu pedido en 48 horas.'], ['Garantía real', 'Soporte técnico en cada compra.'], ['Pago seguro', 'Protegemos tus datos y tus pagos.']]
export default function Inicio() {
  return (<>
    <Carousel />
    <section className="max-w-6xl mx-auto px-4 py-12">
      <h1 className="font-display text-3xl md:text-4xl mb-2">Tu tecnología, sin vueltas</h1>
      <p className="text-slate-600 mb-8 max-w-xl">Computadores, celulares y accesorios con asesoría de personas que sí usan lo que venden.</p>
      <div className="grid gap-4 sm:grid-cols-3">
        {items.map(([t, d]) => <div key={t} className="rounded-xl bg-mist p-5"><h3 className="font-display text-lg">{t}</h3><p className="text-sm text-slate-600">{d}</p></div>)}
      </div>
    </section>
  </>)
}
