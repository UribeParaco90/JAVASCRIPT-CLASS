import { useState, useEffect } from 'react'
// Reemplaza `src` por tus 10 imágenes de src/assets/images (import o ruta) del primer avance.
const slides = [
  ['Portátiles', 'Potencia para trabajar y estudiar'], ['Celulares', 'Las últimas gamas al mejor precio'],
  ['Audio', 'Sonido que se siente'], ['Gaming', 'Equipos listos para jugar'], ['Monitores', 'Color y nitidez para tu escritorio'],
  ['Redes', 'Conexión estable en todo el hogar'], ['Impresoras', 'Imprime sin complicaciones'], ['Accesorios', 'Todo lo que tu equipo necesita'],
  ['Almacenamiento', 'Tus datos, siempre a la mano'], ['Smart Home', 'Automatiza tu casa'],
].map(([title, desc], i) => ({ title, desc, src: `https://picsum.photos/seed/incognito${i + 1}/1400/560` }))

export default function Carousel() {
  const [i, setI] = useState(0)
  const go = d => setI(x => (x + d + slides.length) % slides.length)
  useEffect(() => { const t = setInterval(() => go(1), 5000); return () => clearInterval(t) }, [])
  return (
    <section className="relative overflow-hidden h-72 sm:h-96 md:h-[28rem] bg-ink" aria-label="Carrusel">
      {slides.map((s, k) => (
        <figure key={k} className={`absolute inset-0 transition-opacity duration-700 ${k === i ? 'opacity-100' : 'opacity-0'}`} aria-hidden={k !== i}>
          <img src={s.src} alt={s.title} className="w-full h-full object-cover" />
          <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/80 p-5 pb-10 text-white">
            <h2 className="font-display text-2xl md:text-4xl">{s.title}</h2><p className="text-sm md:text-lg">{s.desc}</p>
          </figcaption>
        </figure>
      ))}
      <button onClick={() => go(-1)} aria-label="Anterior" className="absolute left-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 hover:bg-white">‹</button>
      <button onClick={() => go(1)} aria-label="Siguiente" className="absolute right-2 top-1/2 -translate-y-1/2 h-10 w-10 rounded-full bg-white/80 hover:bg-white">›</button>
      <div className="absolute bottom-3 inset-x-0 flex justify-center gap-2">
        {slides.map((_, k) => <button key={k} onClick={() => setI(k)} aria-label={`Imagen ${k + 1}`} className={`h-2 rounded-full transition-all ${k === i ? 'w-6 bg-accent' : 'w-2 bg-white/70'}`} />)}
      </div>
    </section>
  )
}
