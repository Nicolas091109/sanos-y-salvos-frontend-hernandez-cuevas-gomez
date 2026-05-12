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
    <div className="bg-brand-gray-light min-h-screen py-12">
      <div className="container mx-auto px-4">
        {/* Header Section */}
        <div className="mb-12">
          <h2 className="text-5xl font-black text-gray-900 mb-8 tracking-tight">
            Listado de reportes
          </h2>
          
          {/* Filters Bar */}
          <div className="flex flex-wrap gap-4 items-center">
            <div className="relative">
              <select 
                onChange={e=>setFilter(f=>({...f,species:e.target.value}))} 
                value={filter.species} 
                className="appearance-none bg-white border border-gray-200 text-gray-700 py-3 px-6 pr-12 rounded-xl font-bold focus:outline-none focus:border-brand-green transition-all shadow-sm cursor-pointer"
              >
                <option value="">Todas las especies</option>
                <option value="perro">Perro</option>
                <option value="gato">Gato</option>
                <option value="otro">Otro</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-green">
                <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>

            <div className="relative">
              <select 
                onChange={e=>setFilter(f=>({...f,type:e.target.value}))} 
                value={filter.type} 
                className="appearance-none bg-white border border-gray-200 text-gray-700 py-3 px-6 pr-12 rounded-xl font-bold focus:outline-none focus:border-brand-green transition-all shadow-sm cursor-pointer"
              >
                <option value="">Todos</option>
                <option value="lost">Perdidos</option>
                <option value="found">Encontrados</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-green">
                <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>

            <div className="relative">
              <select 
                onChange={e=>setFilter(f=>({...f,status:e.target.value}))} 
                value={filter.status} 
                className="appearance-none bg-white border border-gray-200 text-gray-700 py-3 px-6 pr-12 rounded-xl font-bold focus:outline-none focus:border-brand-green transition-all shadow-sm cursor-pointer"
              >
                <option value="">Cualquier estado</option>
                <option value="active">Activo</option>
                <option value="resolved">Resuelto</option>
                <option value="archived">Archivado</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-brand-green">
                <svg className="fill-current h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                  <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
                </svg>
              </div>
            </div>

            <div className="ml-auto">
              <p className="text-sm font-bold text-gray-400">
                Mostrando <span className="text-brand-green">{filtered.length}</span> reportes
              </p>
            </div>
          </div>
        </div>

        {/* Reports Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map(r => (
            <div key={r.id} className="animate-fade-in">
              <PetCard report={r} />
            </div>
          ))}
        </div>

        {/* Empty State */}
        {filtered.length === 0 && (
          <div className="text-center py-24">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-gray-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No se encontraron reportes</h3>
            <p className="text-gray-500">Intenta ajustar los filtros de búsqueda.</p>
          </div>
        )}
      </div>
    </div>
  )
}
