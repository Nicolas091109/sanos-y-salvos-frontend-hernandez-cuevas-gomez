import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { clearSession, getCurrentUser } from '../services/authService'

export default function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkUser = () => {
      setUser(getCurrentUser());
    };

    checkUser();
    // Escuchar cambios en el localStorage
    window.addEventListener('storage', checkUser);
    return () => window.removeEventListener('storage', checkUser);
  }, [location]);

  const handleLogout = () => {
    clearSession();
    setUser(null);
    navigate('/login');
  };
  
  const navLinks = [
    { name: 'Inicio', path: '/', icon: <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" /> },
    { name: 'Buscar mascota', path: '/reportes', icon: <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /> },
    { name: 'Reportar', path: '/reportar/perdida', icon: <path d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /> },
    { name: 'Mapa', path: '/mapa', icon: <><path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></> },
    { name: 'Organizaciones', path: '/organizaciones', icon: <path d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5" /> },
    ...(user?.role === 'ADMIN' ? [{ name: 'Panel Admin', path: '/admin', icon: <path d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" /> }] : []),
  ];

  return (
    <header className="bg-white border-b border-gray-100 sticky top-0 z-50">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        {/* Logo Section */}
        <Link to="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-brand-green rounded-full flex items-center justify-center">
            <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 14c1.66 0 3-1.34 3-3S13.66 8 12 8s-3 1.34-3 3 1.34 3 3 3zm-6-2c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm12 0c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-6-7c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zM7 18c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2zm10 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
            </svg>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold text-gray-900 leading-none">Sanos y Salvos</span>
            <span className="text-xs text-brand-green font-medium mt-1">Recuperación de mascotas</span>
          </div>
        </Link>

        {/* Navigation Links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.name}
                to={link.path}
                className={`flex items-center gap-2 text-sm font-medium transition-colors ${
                  isActive ? 'text-brand-green' : 'text-gray-500 hover:text-brand-green'
                }`}
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  {link.icon}
                </svg>
                {link.name}
              </Link>
            );
          })}
        </nav>

        {/* Action Buttons */}
        <div className="flex items-center gap-3">
          {user ? (
            <button
              onClick={handleLogout}
              className="px-4 py-2 border-2 border-red-500 text-red-500 text-sm font-bold rounded-lg hover:bg-red-500 hover:text-white transition-all"
            >
              Cerrar sesión
            </button>
          ) : (
            <Link
              to="/login"
              className="hidden sm:block px-4 py-2 border-2 border-brand-green text-brand-green text-sm font-bold rounded-lg hover:bg-brand-green hover:text-white transition-all"
            >
              Iniciar sesión
            </Link>
          )}
          <Link
            to="/reportar/perdida"
            className="flex items-center gap-2 px-5 py-2 bg-brand-green text-white text-sm font-bold rounded-lg hover:bg-brand-green-dark shadow-md shadow-brand-green/20 transition-all"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24">
              <path d="M12 4v16m8-8H4" />
            </svg>
            Publicar aviso
          </Link>
        </div>
      </div>
    </header>
  )
}
