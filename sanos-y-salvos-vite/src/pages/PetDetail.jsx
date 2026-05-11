import React from 'react'
import { useParams } from 'react-router-dom'
import { useReports } from '../hooks/useReports'

function findMatches(target, reports) {
  // buscar por especie, color y raza
  return reports.filter(r => r.id !== target.id && r.species === target.species && (r.color === target.color || r.breed === target.breed)).slice(0,5)
}

export default function PetDetail() {
  const { id } = useParams()
  const { getById, reports } = useReports()
  const report = getById(id)
  if (!report) return <div>No se encontró el reporte</div>

  const matches = findMatches(report, reports)

  return (
    <div className="max-w-3xl mx-auto card p-6 rounded shadow">
      <div className="flex gap-6">
        <img src={report.photo || '/img/placeholder.png'} alt="foto" className="w-48 h-48 object-cover rounded" />
        <div>
          <h2 className="text-2xl font-semibold">{report.name || (report.type==='found'?'Mascota encontrada':'Mascota perdida')}</h2>
          <p className="text-sm text-neutral-400">{report.species} · {report.breed} · {report.color}</p>
          <p className="mt-3">{report.description}</p>
          <p className="mt-3 text-sm text-neutral-400">Ubicación: {report.location}</p>
          <p className="mt-1 text-sm text-neutral-400">Reportado por: {report.ownerName} · {report.phone}</p>
        </div>
      </div>

      <section className="mt-6">
        <h3 className="font-semibold">Posibles coincidencias</h3>
        {matches.length ? (
          <ul className="mt-2 space-y-2">
            {matches.map(m => (
              <li key={m.id} className="p-3 border rounded flex items-center gap-3">
                <img src={m.photo || '/img/placeholder.png'} alt="" className="w-12 h-12 object-cover rounded" />
                <div>
                  <div className="font-medium">{m.name || (m.type==='found'?'Encontrada':'Perdida')}</div>
                  <div className="text-sm text-neutral-300">{m.species} · {m.breed} · {m.location}</div>
                </div>
              </li>
            ))}
          </ul>
        ) : <p className="text-sm text-neutral-400">No hay coincidencias cercanas.</p>}
      </section>

      <div className="mt-6 flex justify-end">
        <a href={`mailto:${report.email}?subject=Consulta sobre mascota ${report.id}`} className="px-4 py-2 bg-green-600 text-white rounded">Contactar</a>
      </div>
    </div>
  )
}
