import React, { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { getCurrentUser } from '../services/auth'

export default function Perfil() {
  const [user, setUser] = useState(() => getCurrentUser())
  const [lastOrder, setLastOrder] = useState(null)

  useEffect(() => {
    const onStorage = () => {
      try {
        setUser(getCurrentUser())
        const rawOrder = localStorage.getItem('lastOrder')
        setLastOrder(rawOrder ? JSON.parse(rawOrder) : null)
      } catch { setLastOrder(null) }
    }
    window.addEventListener('storage', onStorage)
    onStorage()
    return () => window.removeEventListener('storage', onStorage)
  }, [])

  const nombre = useMemo(() => user?.nombre || user?.email || 'Cliente', [user])
  const email = useMemo(() => user?.email || '', [user])
  const isAdmin = useMemo(() => {
    const r = String(user?.role || '').toLowerCase()
    return r === 'admin' || r === 'administrador'
  }, [user])

  return (
    <div className="container" style={{ marginTop: '20px' }}>
      <div className="mb-3">
        <h3 className="mb-1">Mi cuenta</h3>
        <p className="text-muted mb-0">Bienvenido, <strong>{nombre}</strong>{email ? ` · ${email}` : ''}</p>
      </div>

      <div className="row g-3 mb-4">
        <div className="col-6 col-md-3">
          <Link to="/perfil" className="card h-100 p-3 text-decoration-none">
            <div className="fw-semibold">Inicio</div>
            <span className="d-block text-muted small">Panel del Cliente</span>
          </Link>
        </div>
        <div className="col-6 col-md-3">
          <Link to="/mis-pedidos" className="card h-100 p-3 text-decoration-none">
            <div className="fw-semibold">Mis Pedidos</div>
            <span className="d-block text-muted small">Ver historial de boletas</span>
          </Link>
        </div>
        <div className="col-6 col-md-3">
          <Link to="/perfil/editar" className="card h-100 p-3 text-decoration-none">
            <div className="fw-semibold">Mi Perfil</div>
            <span className="d-block text-muted small">Actualizar mis datos</span>
          </Link>
        </div>
        {isAdmin && (
          <div className="col-6 col-md-3">
            <Link to="/admin" className="card h-100 p-3 text-decoration-none">
              <div className="fw-semibold">Administrador</div>
              <span className="d-block text-muted small">Panel del administrador</span>
            </Link>
          </div>
        )}
        {/* Tarjeta de Notificar Pago eliminada */}
      </div>

      <div className="row">
        <div className="col-md-8 mb-3">
          <div className="card">
            <div className="card-header">Resumen de mi última orden</div>
            <div className="card-body">
              {!lastOrder ? (
                <div className="text-muted">Aún no tienes una orden registrada.</div>
              ) : (
                <div>
                  <p className="mb-1">Número de Orden: <strong>{lastOrder.id}</strong></p>
                  <p className="mb-1">Fecha: {new Date(lastOrder.date).toLocaleString()}</p>
                  <ul className="list-group mb-3">
                    {lastOrder.items.map((it, idx) => (
                      <li key={`${it.nombre}-${idx}`} className="list-group-item d-flex justify-content-between align-items-center">
                        <span>{it.nombre} × {it.cantidad}</span>
                        <span>${(it.precio * it.cantidad).toLocaleString('es-CL')}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="d-flex gap-2">
                    <Link className="btn btn-outline-primary" to="/boleta">Ver Boleta</Link>
                    <Link className="btn btn-success" to="/pago">Proceder al Pago</Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card h-100">
            <div className="card-header">Accesos rápidos</div>
            <div className="card-body">
              <ul className="list-unstyled mb-0">
                <li><Link to="/carrito">Mi Carrito</Link></li>
                <li><Link to="/productos">Seguir comprando</Link></li>
                <li><Link to="/contacto">Contacto y Ayuda</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
