import React, { useEffect, useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useCart } from '../context/useCart'
import { getCurrentUser, clearSession, refreshMe } from '../services/auth'

export default function Header() {
  const { totalCount } = useCart()
  const navigate = useNavigate()
  const [user, setUser] = useState(() => getCurrentUser())

  useEffect(() => {
    const refresh = () => setUser(getCurrentUser())
    // 'storage' se dispara en otras pestañas; añadimos un evento propio para esta pestaña
    window.addEventListener('storage', refresh)
    window.addEventListener('session-updated', refresh)
    return () => {
      window.removeEventListener('storage', refresh)
      window.removeEventListener('session-updated', refresh)
    }
  }, [])

  useEffect(() => {
    if (user && !user?.nombre && !user?.name) {
      try { refreshMe().then(() => setUser(getCurrentUser())) } catch { }
    }
  }, [user?.email])

  const handleLogout = () => {
    clearSession()
    setUser(null)
    alert('Sesión cerrada')
    navigate('/')
  }
  return (
    <header>
      <div className="container text-center" style={{ marginTop: '20px' }}>
        <Link className="navbar-brand" to="/">
          <img src="/img/LogoCC.jpg" alt="Logo" style={{ height: '100px' }} />
        </Link>
      </div>

      <div className="container-fluid" style={{ marginTop: '20px' }}>
        <nav className="navbar navbar-expand-sm rounded navbar-borde mt-1 mb-1">
          <div className="container-fluid justify-content-between align-items-center">
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavbar">
              <img src="/img/menuuuu.png" alt="Menu" style={{ width: '30px', height: '30px' }} />
            </button>

            <div className="collapse navbar-collapse" id="collapsibleNavbar">
              <ul className="navbar-nav">
                <li className="nav-item mx-2">
                  <NavLink className="nav-link" to="/">Home</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/productos">Productos</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/nosotros">Nosotros</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/blogs">Blogs</NavLink>
                </li>
                <li className="nav-item">
                  <NavLink className="nav-link" to="/contacto">Contacto</NavLink>
                </li>
              </ul>
            </div>

            <div>
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <NavLink className="nav-link" to="/carrito">
                    <img src="/img/Carrito.png" alt="Carrito" style={{ width: '30px', height: '30px' }} />
                    {' '} Carrito ({totalCount})
                  </NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
      </div>

      <div className="container text-end">
        <ul className="nav justify-content-end" style={{ marginTop: '10px' }}>
          {user ? (
            <>
              <li className="nav-item d-flex align-items-center">
                <NavLink className="nav-link" to="/perfil"><small>¡¡¡Hola, {(user?.nombre || user?.name || (user?.email ? user.email.split('@')[0] : 'Usuario'))}!!!</small></NavLink>
              </li>
              <li className="nav-item">
                <button className="nav-link btn btn-link p-0" onClick={handleLogout}><small>Cerrar sesión</small></button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <NavLink className="nav-link" to="/login"><small>Iniciar Sesión</small></NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" to="/register"><small>Registrarse</small></NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </header>
  )
}
