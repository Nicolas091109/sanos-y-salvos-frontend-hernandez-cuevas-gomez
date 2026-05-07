import React, { useMemo, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'

export default function Pago() {
  const location = useLocation()
  const [order] = useState(() => {
    try {
      const fromStateOrder = location.state?.order || null
      if (fromStateOrder) {
        localStorage.setItem('lastOrder', JSON.stringify(fromStateOrder))
        return fromStateOrder
      }
      const raw = localStorage.getItem('lastOrder')
      return raw ? JSON.parse(raw) : null
    } catch { return null }
  })

  const [paymentUrl] = useState(() => {
    try {
      const fromStateUrl = location.state?.paymentUrl || null
      if (fromStateUrl) {
        localStorage.setItem('lastPaymentUrl', fromStateUrl)
        return fromStateUrl
      }
      return localStorage.getItem('lastPaymentUrl') || import.meta.env.VITE_PAYMENT_URL || null
    } catch { return import.meta.env.VITE_PAYMENT_URL || null }
  })

  const orderId = useMemo(() => order?.id || '—', [order])
  const email = useMemo(() => order?.user?.email || '', [order])

  return (
    <div className="container" style={{ marginTop: '20px', maxWidth: '900px' }}>
      <h4 className="mb-3">Gracias por tu compra</h4>
      <div className="card mb-3">
        <div className="card-body">
          <p>Este es el número de tu orden: <strong>{orderId}</strong></p>
          {email && <p>Hemos enviado un email con el resumen a: <strong>{email}</strong></p>}
        </div>
      </div>

      <div className="row">
        <div className="col-md-8">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Información de Pago</h6>
              {paymentUrl ? (
                <div>
                  <p>Pagar en plataforma segura en línea con tu banco o tarjeta.</p>
                  <a className="btn btn-success" href={paymentUrl} target="_blank" rel="noopener noreferrer">Ir a pagar</a>
                </div>
              ) : (
                <div className="alert alert-warning">La URL de pago no está configurada. Contacta al vendedor para completar el pago.</div>
              )}
            </div>
          </div>
        </div>
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h6 className="card-title">Crea tu Cuenta de Cliente</h6>
              <p className="small">Crea tu cuenta para seguir tus pedidos y agilizar futuras compras.</p>
              <Link className="btn btn-outline-primary" to="/register">Crear Cuenta</Link>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-3">
        <Link className="btn btn-outline-success" to="/productos">Continuar comprando</Link>
      </div>
    </div>
  )
}