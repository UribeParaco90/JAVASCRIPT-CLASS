import { useEffect } from 'react'
export default function Modal({ open, onClose, title, children }) {
  useEffect(() => {
    if (!open) return
    const esc = e => e.key === 'Escape' && onClose()
    document.body.style.overflow = 'hidden'   // evita que la página de fondo se desplace
    window.addEventListener('keydown', esc)
    return () => { document.body.style.overflow = ''; window.removeEventListener('keydown', esc) }
  }, [open, onClose])
  if (!open) return null
  return (
    <div className="fixed inset-0 z-50 bg-black/60 flex items-start sm:items-center justify-center p-3 overflow-y-auto" onClick={onClose}>
      <div role="dialog" aria-modal="true" className="bg-white rounded-xl w-full max-w-2xl p-5 my-4" onClick={e => e.stopPropagation()}>
        <div className="flex justify-between items-center mb-4">
          <h2 className="font-display text-xl">{title}</h2>
          <button onClick={onClose} aria-label="Cerrar" className="text-2xl leading-none">×</button>
        </div>
        {children}
      </div>
    </div>
  )
}
