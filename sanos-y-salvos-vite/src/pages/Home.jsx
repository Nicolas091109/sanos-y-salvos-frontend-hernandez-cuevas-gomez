import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  const subNavLinks = [
    { name: 'Mascotas perdidas', active: true },
    { name: 'Mascotas encontradas', active: false },
    { name: 'Refugios cercanos', active: false },
    { name: 'Clínicas veterinarias', active: false },
  ];

  const stats = [
    { 
      label: 'mascotas recuperadas', 
      value: '2.840', 
      icon: <path d="M12 14c1.66 0 3-1.34 3-3S13.66 8 12 8s-3 1.34-3 3 1.34 3 3 3zm-6-2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm12 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-6-7c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />,
      color: 'text-brand-green',
      bgColor: 'bg-brand-green-light'
    },
    { 
      label: 'tiempo promedio de reencuentro', 
      value: '18 hrs', 
      icon: <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
      color: 'text-brand-amber-dark',
      bgColor: 'bg-brand-amber-light'
    },
    { 
      label: 'organizaciones aliadas', 
      value: '134', 
      icon: <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5" />,
      color: 'text-brand-blue',
      bgColor: 'bg-brand-blue-light'
    },
  ];

  return (
    <div className="bg-white min-h-screen">
      {/* Sub-navigation */}
      <div className="border-b border-gray-100">
        <div className="container mx-auto px-4">
          <div className="flex gap-8">
            {subNavLinks.map((link) => (
              <button
                key={link.name}
                className={`py-4 text-sm font-semibold border-b-2 transition-all ${
                  link.active 
                    ? 'border-brand-green text-brand-green' 
                    : 'border-transparent text-gray-500 hover:text-gray-700'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-white via-brand-green-light/30 to-white py-16 md:py-24">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-12">
            
            {/* Left Content */}
            <div className="flex-1 max-w-2xl">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-brand-green-light text-brand-green rounded-full text-xs font-bold mb-6">
                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
                  <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Plataforma colaborativa
              </div>
              
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
                Encuentra a tu mascota <br />
                <span className="text-brand-green">perdida más rápido</span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-10 leading-relaxed">
                Nuestra plataforma conecta a dueños, ciudadanos comprometidos, 
                refugios y clínicas veterinarias para que cada mascota regrese a su hogar 
                lo antes posible.
              </p>
              
              <div className="flex flex-wrap gap-4">
                <Link
                  to="/reportes"
                  className="flex items-center gap-2 px-8 py-4 bg-brand-green text-white font-bold rounded-xl hover:bg-brand-green-dark shadow-lg shadow-brand-green/20 transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  Buscar mi mascota
                </Link>
                <Link
                  to="/reportar/perdida"
                  className="flex items-center gap-2 px-8 py-4 bg-white text-brand-green border-2 border-brand-green font-bold rounded-xl hover:bg-brand-green-light transition-all"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                    <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                  </svg>
                  Reportar hallazgo
                </Link>
              </div>
            </div>

            {/* Right Content - Stats Cards */}
            <div className="flex-1 w-full max-w-md">
              <div className="flex flex-col gap-6">
                {stats.map((stat, idx) => (
                  <div 
                    key={idx}
                    className="bg-white p-6 rounded-2xl shadow-xl shadow-gray-100 border border-gray-50 flex items-center gap-5 transition-transform hover:scale-[1.02]"
                  >
                    <div className={`w-14 h-14 ${stat.bgColor} ${stat.color} rounded-full flex items-center justify-center`}>
                      <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
                        {stat.icon}
                      </svg>
                    </div>
                    <div>
                      <div className="text-3xl font-black text-gray-900 leading-none">{stat.value}</div>
                      <div className="text-sm text-gray-500 font-medium mt-1">{stat.label}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Footer Label */}
      <div className="py-8 text-center text-gray-400 text-xs font-medium tracking-wide">
        Prompt visual — menú principal · Sanos y Salvos
      </div>
    </div>
  )
}
