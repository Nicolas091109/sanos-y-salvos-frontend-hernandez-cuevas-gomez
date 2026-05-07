import React, { useMemo } from 'react'
import { Link, useParams } from 'react-router-dom'

const formatCLP = (n) => `$${Number(n || 0).toLocaleString('es-CL')}`

export default function BoletaDetalle() {
  const { orderId } = useParams()
  const order = useMemo(() => {
    try {
      const raw = localStorage.getItem('orders')
      const list = raw ? JSON.parse(raw) : []
      const found = Array.isArray(list) ? list.find(o => String(o.id) === String(orderId)) : null
      return found || null
    } catch { return null }
  }, [orderId])

  const items = useMemo(() => order?.items || [], [order])
  const subTotal = order?.totals?.subTotal || items.reduce((t, it) => t + (it.precio * it.cantidad), 0)
  const taxRate = order?.totals?.taxRate ?? 0.19
  const taxAmount = order?.totals?.taxAmount ?? Math.round(subTotal * taxRate)
  const grandTotal = order?.totals?.grandTotal ?? (subTotal + taxAmount)

  if (!order) {
    return (
      <div className="container" style={{ marginTop: '20px' }}>
        <div className="alert alert-warning">No encontramos la boleta {orderId}.</div>
        <Link to="/mis-pedidos" className="btn btn-primary">Volver a Mis Pedidos</Link>
      </div>
    )
  }

  return (
    <div className="container" style={{ marginTop: '20px' }}>
      <h1 className="h4">Boleta {order.id}</h1>
      <p className="text-muted">Fecha: {new Date(order.date).toLocaleString()}</p>

      <div className="table-responsive">
        <table className="table">
          <thead>
            <tr>
              <th>Producto</th>
              <th className="text-center">Cantidad</th>
              <th className="text-end">Precio</th>
              <th className="text-end">Total</th>
            </tr>
          </thead>
          <tbody>
            {items.map((it, idx) => (
              <tr key={`${it.nombre}-${idx}`}>
                <td>{it.nombre}</td>
                <td className="text-center">{it.cantidad}</td>
                <td className="text-end">{formatCLP(it.precio)}</td>
                <td className="text-end">{formatCLP(it.precio * it.cantidad)}</td>
              </tr>
            ))}
          </tbody>
          <tfoot>
            <tr>
              <td colSpan={3} className="text-end">Subtotal</td>
              <td className="text-end">{formatCLP(subTotal)}</td>
            </tr>
            <tr>
              <td colSpan={3} className="text-end">IVA ({Math.round(taxRate * 100)}%)</td>
              <td className="text-end">{formatCLP(taxAmount)}</td>
            </tr>
            <tr>
              <td colSpan={3} className="text-end fw-bold">Total</td>
              <td className="text-end fw-bold">{formatCLP(grandTotal)}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="d-flex gap-2">
        <Link to="/mis-pedidos" className="btn btn-outline-primary">Volver a Mis Pedidos</Link>
        <Link to="/productos" className="btn btn-success">Seguir comprando</Link>
      </div>
    </div>
  )
}