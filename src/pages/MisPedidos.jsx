import React, { useState } from 'react'
import { Link } from 'react-router-dom'

export default function MisPedidos() {
  const [orders] = useState(() => {
    try {
      const raw = localStorage.getItem('orders')
      const list = raw ? JSON.parse(raw) : []
      return Array.isArray(list) ? list : []
    } catch { return [] }
  })

  return (
    <div className="container" style={{ marginTop: '20px' }}>
      <h1 className="h4 mb-3">Mis Pedidos</h1>
      {orders.length === 0 ? (
        <div className="alert alert-info">Aún no tienes boletas registradas.</div>
      ) : (
        <div className="table-responsive">
          <table className="table align-middle">
            <thead>
              <tr>
                <th>Boleta</th>
                <th>Fecha</th>
                <th>Items</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((o) => {
                const itemCount = Array.isArray(o.items) ? o.items.reduce((t, i) => t + Number(i.cantidad || 0), 0) : 0
                const total = o?.totals?.grandTotal ?? 0
                return (
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{new Date(o.date).toLocaleString()}</td>
                    <td>{itemCount}</td>
                    <td>${Number(total).toLocaleString('es-CL')}</td>
                    <td className="text-end">
                      <Link to={`/boleta/${encodeURIComponent(o.id)}`} className="btn btn-sm btn-outline-primary">Ver detalle</Link>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      )}

      <div className="mt-3">
        <Link to="/productos" className="btn btn-outline-success">Seguir comprando</Link>
      </div>
    </div>
  )
}