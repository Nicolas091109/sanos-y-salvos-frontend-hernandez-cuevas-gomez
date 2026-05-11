import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="bg-transparent backdrop-blur-sm">
      <div className="container mx-auto flex items-center justify-between p-4">
        <Link to="/" className="text-xl font-bold">Sanos y Salvos</Link>
        <nav className="space-x-3">
          <Link to="/reportes" className="text-sm text-neutral-300">Reportes</Link>
          <Link to="/mapa" className="text-sm text-neutral-300">Mapa</Link>
          <Link to="/reportar/perdida" className="px-3 py-2 btn-cta rounded text-sm">Reportar perdida</Link>
        </nav>
      </div>
    </header>
  )
}
