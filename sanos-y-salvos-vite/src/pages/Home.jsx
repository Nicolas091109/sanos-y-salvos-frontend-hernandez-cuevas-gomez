import React from 'react'
import { Link } from 'react-router-dom'
import { mockReports } from '../mock/mockData'

export default function Home() {
  const total = mockReports.length
  const lost = mockReports.filter(r => r.type === 'lost').length
  const found = mockReports.filter(r => r.type === 'found').length

  return (
    <div>
      <section className="rounded-lg card p-8 shadow mb-6">
        <h1 className="text-3xl font-bold">Sanos y Salvos</h1>
        <p className="mt-2 text-neutral-300">Encuentra y ayuda a recuperar mascotas perdidas en tu comuna.</p>
        <div className="mt-6 flex gap-3">
          <Link to="/reportar/perdida" className="px-4 py-2 btn-cta rounded">Reportar mascota perdida</Link>
          <Link to="/reportar/encontrada" className="px-4 py-2 btn-ghost rounded">Encontré una mascota</Link>
        </div>
      </section>

      <section className="grid grid-cols-3 gap-4 mb-6">
        <div className="rounded-lg card p-6 shadow">
          <p className="text-sm text-neutral-400">Mascotas reportadas</p>
          <p className="text-2xl font-bold">{total}</p>
        </div>
        <div className="rounded-lg card p-6 shadow">
          <p className="text-sm text-neutral-400">Perdidas</p>
          <p className="text-2xl font-bold">{lost}</p>
        </div>
        <div className="rounded-lg card p-6 shadow">
          <p className="text-sm text-neutral-400">Encontradas</p>
          <p className="text-2xl font-bold">{found}</p>
        </div>
      </section>

      <section className="rounded-lg card p-6 shadow">
        <h2 className="text-xl font-semibold mb-2">Cómo funciona</h2>
        <div className="grid grid-cols-3 gap-4">
          <div className="p-4">
            <h3 className="font-semibold">1. Reporta</h3>
            <p className="text-sm text-neutral-400">Completa el formulario con los datos y una foto.</p>
          </div>
          <div className="p-4">
            <h3 className="font-semibold">2. Mapa y matches</h3>
            <p className="text-sm text-neutral-400">Visualiza reportes y recibe posibles coincidencias.</p>
          </div>
          <div className="p-4">
            <h3 className="font-semibold">3. Contacta</h3>
            <p className="text-sm text-neutral-400">Contacta al reportante para coordinar la devolución.</p>
          </div>
        </div>
      </section>
    </div>
  )
}
