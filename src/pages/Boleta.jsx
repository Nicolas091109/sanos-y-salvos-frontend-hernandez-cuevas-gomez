import React, { useMemo } from 'react'
import { Link, useNavigate, useLocation } from 'react-router-dom'
 
 

// Utilidad simple para CLP
const formatCLP = (n) => `$${Number(n || 0).toLocaleString('es-CL')}`

export default function Boleta() {
  
  const navigate = useNavigate()
  const location = useLocation()

  const order = useMemo(() => {
    const fromState = location.state?.order || null
    try {
      if (fromState) {
        localStorage.setItem('lastOrder', JSON.stringify(fromState))
        return fromState
      }
      const raw = localStorage.getItem('lastOrder')
      if (raw) return JSON.parse(raw)
      return null
    } catch { return null }
  }, [location.state])

  const issuer = useMemo(() => ({
    nombre: import.meta.env.VITE_STORE_NAME || 'Color Creativo',
    rut: import.meta.env.VITE_STORE_RUT || '—',
    giro: import.meta.env.VITE_STORE_GIRO || 'Servicios y Venta de productos',
  }), [])

  

  if (!order) {
    return (
      <div className="container" style={{ marginTop: '20px' }}>
        <div className="alert alert-warning">No hay boleta disponible.</div>
        <div className="d-flex gap-2">
          <button className="btn btn-outline-secondary" onClick={() => navigate('/carrito')}>Volver al carrito</button>
          <Link className="btn btn-primary" to="/productos">Ir a productos</Link>
        </div>
      </div>
    )
  }

  const { id, date, user, items, totals } = order
  const shipping = order.shipping || {}
  const { subTotal, taxAmount, grandTotal, taxRate } = totals
  const buildMailto = () => {
    const to = user?.email || ''
    const subject = encodeURIComponent(`Boleta de compra ${id}`)
    const header = `Gracias por tu compra.\n\nComprobante: ${id}\nFecha: ${new Date(date).toLocaleString('es-CL')}\nTotal pagado: ${formatCLP(grandTotal)}\n\n`;
    const addr = `Dirección de entrega:\nCalle: ${shipping.calle || '-'}\nDepartamento: ${shipping.departamento || '-'}\nRegión: ${shipping.region || '-'}\nComuna: ${shipping.comuna || '-'}\nIndicaciones: ${shipping.indicaciones || '-'}\n\n`;
    const lines = (items || []).map(it => `- ${it.nombre} x${it.cantidad} = ${formatCLP(it.precio * it.cantidad)}`).join('\n')
    const body = encodeURIComponent(`${header}${addr}Detalle de la compra:\n${lines}\n\nSubtotal: ${formatCLP(subTotal)}\nIVA (${Math.round(taxRate*100)}%): ${formatCLP(taxAmount)}\nTotal: ${formatCLP(grandTotal)}`)
    return `mailto:${to}?subject=${subject}&body=${body}`
  }

  return (
    <div className="container" style={{ marginTop: '20px', maxWidth: '1000px' }}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <div>
          <h5 className="mb-0">✅ Se ha realizado la compra. nro #{id}</h5>
          <div className="text-muted small">Fecha: {new Date(date).toLocaleDateString('es-CL')}</div>
        </div>
        <div className="text-end">
          <div className="text-muted small">Código order: {id}</div>
          <div className="mt-2">
            <button className="btn btn-danger btn-sm me-2" onClick={() => window.print()}>Imprimir boleta en PDF</button>
            <a className="btn btn-success btn-sm me-2" href={buildMailto()}>Enviar boleta por email</a>
            <Link className="btn btn-outline-primary btn-sm" to="/productos">Seguir comprando</Link>
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-body">
          <div className="row">
            <div className="col-md-8">
              <h5 className="fw-bold mb-1">{issuer.nombre}</h5>
              <div className="small text-muted">RUT: {issuer.rut}</div>
              <div className="small text-muted">Giro: {issuer.giro}</div>
            </div>
            <div className="col-md-4 text-end">
              <span className="badge bg-primary">Total pagado: {formatCLP(grandTotal)}</span>
            </div>
          </div>

          <hr />

          <div className="row mb-3">
            <div className="col-md-6">
              <div className="fw-semibold">Datos del Cliente</div>
              <div className="small">Nombre: {user?.nombre || user?.name || 'Cliente'} {user?.apellidos || ''}</div>
              {user?.email && <div className="small">Email: {user.email}</div>}
            </div>
            <div className="col-md-6">
              <div className="fw-semibold">Dirección de entrega</div>
              <div className="small">Calle: {shipping.calle || '-'}</div>
              <div className="small">Departamento: {shipping.departamento || '-'}</div>
              <div className="small">Región: {shipping.region || '-'}</div>
              <div className="small">Comuna: {shipping.comuna || '-'}</div>
              {shipping.indicaciones && <div className="small">Indicaciones: {shipping.indicaciones}</div>}
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-sm align-middle">
              <thead>
                <tr>
                  <th>Imagen</th>
                  <th>Nombre</th>
                  <th className="text-end">Precio</th>
                  <th className="text-center">Cantidad</th>
                  <th className="text-end">Subtotal</th>
                </tr>
              </thead>
              <tbody>
                {items.map((it) => (
                  <tr key={`${it.nombre}-${it.precio}`}>
                    <td style={{ width: 80 }}>
                      <img src={it.foto} alt={it.nombre} style={{ width: 60, height: 60, objectFit: 'cover' }} />
                    </td>
                    <td>{it.nombre}</td>
                    <td className="text-end">{formatCLP(it.precio)}</td>
                    <td className="text-center">{it.cantidad}</td>
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

          <div className="small text-muted">
            Esta boleta es un comprobante de compra. Los costos de envío y personalización se coordinan con el vendedor.
          </div>
        </div>
      </div>
    </div>
  )
}