import React, { useState } from 'react'
import { useReports } from '../hooks/useReports'

export default function Admin() {
  const { reports, update, remove } = useReports()
  const [loadingId, setLoadingId] = useState(null)

  async function changeState(id, nextState) {
    setLoadingId(id)
    try { await update(id, { status: nextState }) } catch { alert('Error') }
    setLoadingId(null)
  }

  async function onDelete(id) {
    if (!confirm('Eliminar este reporte?')) return
    setLoadingId(id)
    try { await remove(id) } catch { alert('Error') }
    setLoadingId(null)
  }

  const totals = reports.reduce((acc, r) => {
    acc[r.status] = (acc[r.status] || 0) + 1
    acc[r.species] = (acc[r.species] || 0) + 1
    return acc
  }, {})

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Panel de administración</h2>
      <div className="mb-4 grid grid-cols-3 gap-4">
        <div className="p-4 card rounded shadow">Total por estado: {JSON.stringify(Object.fromEntries(Object.entries(totals).filter(([k])=>['active','resolved','archived'].includes(k))))}</div>
        <div className="p-4 card rounded shadow">Total por especie: {JSON.stringify(Object.fromEntries(Object.entries(totals).filter(([k])=>!['active','resolved','archived'].includes(k))))}</div>
        <div className="p-4 card rounded shadow">Reportes totales: {reports.length}</div>
      </div>

      <div className="card rounded shadow overflow-x-auto">
        <table className="min-w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="p-3 text-left">ID</th>
              <th className="p-3 text-left">Tipo</th>
              <th className="p-3 text-left">Especie</th>
              <th className="p-3 text-left">Ubicación</th>
              <th className="p-3 text-left">Estado</th>
              <th className="p-3 text-left">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {reports.map(r => (
              <tr key={r.id} className="border-t">
                <td className="p-3">{r.id}</td>
                <td className="p-3">{r.type}</td>
                <td className="p-3">{r.species}</td>
                <td className="p-3">{r.location}</td>
                <td className="p-3">{r.status}</td>
                <td className="p-3">
                  <div className="flex gap-2">
                    <button onClick={()=>changeState(r.id,'resolved')} disabled={loadingId===r.id} className="px-2 py-1 bg-blue-600 text-white rounded text-sm">Marcar resuelto</button>
                    <button onClick={()=>changeState(r.id,'archived')} disabled={loadingId===r.id} className="px-2 py-1 bg-gray-600 text-white rounded text-sm">Archivar</button>
                    <button onClick={()=>onDelete(r.id)} disabled={loadingId===r.id} className="px-2 py-1 bg-red-600 text-white rounded text-sm">Eliminar</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
