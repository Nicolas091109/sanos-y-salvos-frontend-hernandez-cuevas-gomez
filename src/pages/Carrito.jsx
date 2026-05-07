import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/useCart'
import { getToken, getCurrentUser } from '../services/auth'
// import de cart/orders removidos porque no se usan en esta vista

export default function Carrito() {
  const { items, updateQuantity, removeItem, totalPrice } = useCart()
  const [accept, setAccept] = useState(false)
  const navigate = useNavigate()
  // Consideramos sesión iniciada aunque no haya token (modo local/admin)
  const isLogged = Boolean(getToken()) || Boolean(getCurrentUser())
  const taxRate = 0.19
  // El total ya incluye IVA; extraemos el componente IVA y mostramos desglose
  const taxAmount = Math.round(totalPrice * (taxRate / (1 + taxRate)))
  const subTotal = Math.max(0, totalPrice - taxAmount)
  const grandTotal = totalPrice

  const handleGoToCheckout = () => {
    if (!accept || items.length === 0) return
    if (!isLogged) {
      alert('Debes iniciar sesión para realizar la compra.')
      navigate('/login?redirect=/carrito')
      return
    }
    navigate('/checkout')
  }

  return (
    <div className="container" style={{ marginTop: '20px' }}>
      <div className="row">
        <div className="col-lg-8">
          <h5 className="mb-3">Producto Cantidad Precio Total Eliminar</h5>

          <div className="table-responsive">
            <table className="table align-middle">
              <tbody id="productos">
                {items.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="text-center">
                      <p>Tu carrito está vacío</p>
                      <Link to="/productos" className="btn btn-primary">Seguir comprando</Link>
                    </td>
                  </tr>
                ) : (
                  items.map(item => {
                    
                    const reliableStock = Number.isFinite(Number(item?.stock)) ? Number(item.stock) : undefined
                    const maxQty = typeof reliableStock === 'number' ? reliableStock : undefined
                    const disablePlus = typeof reliableStock === 'number' ? (item.cantidad >= reliableStock) : false
                    return (
                    <tr key={item.nombre}>
                      <td>
                        <div className="d-flex align-items-center">
                          <img src={item.foto} alt={item.nombre} style={{ width: '60px', height: '60px', objectFit: 'cover', marginRight: '15px' }} />
                          <div>
                            <h6 className="mb-0">{item.nombre}</h6>
                            <small className="text-muted">{(item.descripcion || '').substring(0, 50)}...</small>
                          </div>
                        </div>
                      </td>
                      <td className="text-center">
                        <div className="input-group" style={{ width: '180px', margin: '0 auto' }}>
                          <button className="btn btn-outline-secondary btn-sm" type="button" disabled={item.cantidad <= 1} onClick={() => updateQuantity(item.nombre, item.cantidad - 1)}>-</button>
                          <input
                            type="number"
                            className="form-control form-control-sm text-center"
                            value={item.cantidad}
                            min={1}
                            max={maxQty}
                            onChange={e => {
                              const next = parseInt(e.target.value || '1', 10)
                              const max = maxQty
                              const clamped = typeof max === 'number' ? Math.min(Math.max(next, 1), max) : Math.max(next, 1)
                              updateQuantity(item.nombre, clamped)
                            }}
                          />
                          <button className="btn btn-outline-secondary btn-sm" type="button" disabled={disablePlus} onClick={() => updateQuantity(item.nombre, item.cantidad + 1)}>+</button>
                        </div>
                        {typeof reliableStock === 'number' && (
                          <small className="text-muted d-block mt-1">Stock: {reliableStock}</small>
                        )}
                      </td>
                      <td className="text-center">${item.precio.toLocaleString()}</td>
                      <td className="text-center">${(item.precio * item.cantidad).toLocaleString()}</td>
                      <td className="text-center">
                        <button className="btn btn-outline-danger btn-sm" onClick={() => removeItem(item.nombre)}>Eliminar</button>
                      </td>
                    </tr>
                  )})
                )}
              </tbody>
            </table>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title">Resumen del Carrito</h5>
              <p className="card-text"><strong>Subtotal:</strong> <span id="cart-subtotal">${subTotal.toLocaleString()}</span></p>
              <p className="card-text"><strong>IVA (19%):</strong> <span id="cart-tax">${taxAmount.toLocaleString()}</span></p>
              <p className="card-text"><strong>Total:</strong> <span id="cart-total">${grandTotal.toLocaleString()}</span></p>
              <hr />
              <p className="small">
                Nos pondremos en contacto contigo al día hábil siguiente de realizado el pago para la personalización de su pedido y coordinar la entrega.
              </p>
              <p className="small">
                (*) Los costos de envío no están incluidos en el total del carrito, estos se calcularán dependiendo de la ubicación del cliente con previa coordinación con el vendedor.
              </p>

              <div className="form-check mb-3">
                <input className="form-check-input" type="checkbox" id="acepta" checked={accept} onChange={e => setAccept(e.target.checked)} />
                <label className="form-check-label" htmlFor="acepta">
                  Acepto las condiciones establecidas en el Centro de Ayuda.
                </label>
              </div>

              {!isLogged && (
                <div className="alert alert-info py-2" role="alert">
                  Debes iniciar sesión para realizar la compra.{' '}
                  <Link to="/login?redirect=/carrito">Inicia sesión aquí</Link>.
                </div>
              )}

              <div className="d-grid gap-2">
                <button className="btn btn-success" disabled={!accept || items.length === 0 || !isLogged} onClick={handleGoToCheckout}>Proceder al Checkout</button>
                <Link to="/productos" className="btn btn-outline-success">Seguir comprando</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
