import React, { useMemo, useState } from 'react'
import { useReports } from '../hooks/useReports'
import PetCard from '../components/PetCard'

export default function ReportsList() {
  const { reports } = useReports()
  const [filter, setFilter] = useState({ species: '', type: '', status: '' })

  const filtered = useMemo(() => reports.filter(r => {
    if (filter.species && r.species !== filter.species) return false
    if (filter.type && r.type !== filter.type) return false
    if (filter.status && r.status !== filter.status) return false
    return true
  }), [reports, filter])

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Listado de reportes</h2>
      <div className="mb-4 flex gap-2">
        <select onChange={e=>setFilter(f=>({...f,species:e.target.value}))} value={filter.species} className="p-2 border">
          <option value="">Todas las especies</option>
          <option value="perro">Perro</option>
          <option value="gato">Gato</option>
          <option value="otro">Otro</option>
        </select>
        <select onChange={e=>setFilter(f=>({...f,type:e.target.value}))} value={filter.type} className="p-2 border">
          <option value="">Todos</option>
          <option value="lost">Perdidos</option>
          <option value="found">Encontrados</option>
        </select>
        <select onChange={e=>setFilter(f=>({...f,status:e.target.value}))} value={filter.status} className="p-2 border">
          <option value="">Cualquier estado</option>
          <option value="active">Activo</option>
          <option value="resolved">Resuelto</option>
          <option value="archived">Archivado</option>
        </select>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {filtered.map(r => <PetCard key={r.id} report={r} />)}
      </div>
    </div>
  )
}
