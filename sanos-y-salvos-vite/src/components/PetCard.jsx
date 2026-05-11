import React from 'react'
import { Link } from 'react-router-dom'

export default function PetCard({ report }) {
  return (
    <article className="flex flex-col border rounded shadow-sm overflow-hidden card">
      <div className="h-48 bg-gray-100 flex items-center justify-center">
        <img src={report.photo || '/img/placeholder.png'} alt={report.name || report.species} className="h-full w-full object-cover" />
      </div>
      <div className="p-4">
        <h3 className="text-lg font-semibold">{report.name || (report.type === 'found' ? 'Mascota encontrada' : 'Mascota sin nombre')}</h3>
        <p className="text-sm text-neutral-400">{report.species} · {report.breed} · {report.color}</p>
        <p className="mt-2 text-sm text-neutral-300">{report.location} · {new Date(report.date).toLocaleDateString()}</p>
        <div className="mt-4 flex justify-end">
          <Link to={`/reportes/${report.id}`} className="text-sm text-blue-600">Ver detalle</Link>
        </div>
      </div>
    </article>
  )
}
