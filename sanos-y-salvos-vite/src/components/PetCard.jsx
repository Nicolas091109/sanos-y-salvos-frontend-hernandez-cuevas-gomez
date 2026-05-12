import React from 'react'
import { Link } from 'react-router-dom'

export default function PetCard({ report }) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-soft hover:shadow-xl transition-all border border-gray-100 group">
      {/* Image Area */}
      <div className="relative h-56 bg-gray-100 overflow-hidden">
        <img 
          src={report.photo || 'https://via.placeholder.com/400x300?text=' + report.species} 
          alt={report.name || report.species} 
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        
        {/* Species Badge on top left of image */}
        <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
          <span className="text-xs font-bold text-brand-green uppercase tracking-wider">
            {report.species} {report.name && `· ${report.name}`}
          </span>
        </div>

        {/* Status Badge on top right of image */}
        <div className="absolute top-4 right-4">
          <span className={`text-[10px] font-black uppercase tracking-widest px-2.5 py-1 rounded-lg shadow-sm ${
            report.type === 'lost' ? 'bg-red-500 text-white' : 'bg-brand-green text-white'
          }`}>
            {report.type === 'lost' ? 'Perdido' : 'Encontrado'}
          </span>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-1 leading-tight">
          {report.name || (report.type === 'found' ? 'Encontrado' : 'Sin nombre')}
        </h3>
        
        <p className="text-sm font-medium text-gray-500 mb-4">
          {report.species} · {report.breed} · {report.color}
        </p>
        
        <div className="flex items-center gap-2 text-gray-400 mb-6">
          <svg className="w-4 h-4 text-brand-green" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          <span className="text-xs font-medium truncate">
            {report.location} · {report.date}
          </span>
        </div>

        <div className="flex justify-end pt-2 border-t border-gray-50">
          <Link 
            to={`/reportes/${report.id}`} 
            className="inline-flex items-center gap-1.5 text-sm font-bold text-brand-green hover:text-brand-green-dark transition-colors"
          >
            Ver detalle
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>
    </article>
  )
}
