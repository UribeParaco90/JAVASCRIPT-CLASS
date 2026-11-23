import { Link } from 'react-router-dom'
import Logo from './Logo'
export default function Footer() {
  return (
    <footer className="bg-ink text-slate-300 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-4">
        <div><Logo light /><p className="mt-3 text-sm">Tecnología al mejor precio, con soporte real.</p></div>
        <div><h3 className="text-white font-medium mb-2">Enlaces</h3>
          <ul className="space-y-1 text-sm"><li><Link to="/">Inicio</Link></li><li><Link to="/quienes-somos">¿Quiénes somos?</Link></li><li><Link to="/contacto">Contacto</Link></li><li><Link to="/login">Iniciar sesión</Link></li></ul></div>
        <div><h3 className="text-white font-medium mb-2">Contacto</h3>
          <ul className="space-y-1 text-sm"><li>contacto@incognitotech.com</li><li>+57 300 000 0000</li><li>Bogotá, Colombia</li></ul>
          <div className="flex gap-3 mt-3 text-sm"><a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a><a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a><a href="https://x.com" target="_blank" rel="noreferrer">X</a></div></div>
        <iframe title="Ubicación" className="w-full h-40 rounded-lg border-0" loading="lazy"
          src="https://www.google.com/maps?q=Bogot%C3%A1%2C%20Colombia&output=embed" />
      </div>
      <p className="text-center text-xs py-4 border-t border-slate-700">© 2026 IncognitoTech. Todos los derechos reservados. Marca, logotipo y contenidos protegidos por propiedad intelectual.</p>
    </footer>
  )
}
