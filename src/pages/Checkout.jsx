import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useCart } from '../context/useCart'
import { getToken, getCurrentUser } from '../services/auth'
import { isCartApiConfigured, checkoutRemote } from '../services/cart'
import { createOrder } from '../services/orders'
import { updateProduct } from '../services/products'

export default function Checkout() {
  const { items, totalPrice, clearCart } = useCart()
  const navigate = useNavigate()
  const isLogged = Boolean(getToken()) || Boolean(getCurrentUser())

  const taxRate = 0.19
  const taxAmount = Math.round(totalPrice * (taxRate / (1 + taxRate)))
  const subTotal = Math.max(0, totalPrice - taxAmount)
  const grandTotal = totalPrice

  const user = getCurrentUser() || { nombre: '', email: '' }
  const [form, setForm] = useState({
    nombre: user.nombre || '',
    apellidos: user.apellidos || '',
    correo: user.email || '',
    calle: '',
    departamento: '',
    region: '',
    comuna: '',
    indicaciones: '',
  })
  const [errors, setErrors] = useState({})

  // Regiones y comunas como en Register
  const comunasPorRegion = {
    arica: ['Arica', 'Camarones', 'Putre', 'General Lagos'],
    tarapaca: ['Iquique', 'Alto Hospicio', 'Pozo Almonte', 'Camiña', 'Colchane', 'Huara', 'Pica'],
    antofagasta: ['Antofagasta', 'Mejillones', 'Sierra Gorda', 'Taltal', 'Calama', 'Ollagüe', 'San Pedro de Atacama', 'María Elena', 'Tocopilla'],
    atacama: ['Copiapó', 'Caldera', 'Tierra Amarilla', 'Chañaral', 'Diego de Almagro', 'Vallenar', 'Alto del Carmen', 'Freirina', 'Huasco'],
    coquimbo: ['La Serena', 'Coquimbo', 'Andacollo', 'La Higuera', 'Paiguano', 'Vicuña', 'Illapel', 'Canela', 'Los Vilos', 'Salamanca', 'Ovalle', 'Combarbalá', 'Monte Patria', 'Punitaqui', 'Río Hurtado'],
    valpo: ['Valparaíso', 'Casablanca', 'Concón', 'Juan Fernández', 'Puchuncaví', 'Quintero', 'Viña del Mar', 'Los Andes', 'Calle Larga', 'Rinconada', 'San Esteban', 'La Ligua', 'Cabildo', 'Papudo', 'Petorca', 'Zapallar', 'Quillota', 'Calera', 'Hijuelas', 'La Cruz', 'Nogales'],
    metro: ['Alhué', 'Buin', 'Cerrillos', 'Cerro Navia', 'Colina', 'Conchalí', 'Curacaví', 'El Bosque', 'El Monte', 'Estación Central', 'Huechuraba', 'Independencia', 'Isla de Maipo', 'La Cisterna', 'La Florida', 'La Granja', 'La Pintana', 'La Reina', 'Las Condes', 'Lo Barnechea', 'Lo Espejo', 'Lo Prado', 'Macul', 'Maipú', 'Melipilla', 'Ñuñoa', 'Padre Hurtado', 'Pdero Aguirre Cercda', 'Peñaflor', 'Pirque', 'Puente Alto', 'Pudahuel', 'Providencia', 'Quilicura', 'Quinta Normal', 'Renca', 'San Bernardo', 'San Joaquín', 'San José de Maipo', 'San Miguel', 'San Pedro', 'San Ramón', 'Talagante', 'Tiltil','Vitacura'],
    ohiggins: ['Chépica', 'Chimbarongo', 'Codegua', 'Coinco', 'Coltauco', 'Doñihue', 'Graneros', 'La Estrella', 'La Unión', 'Las Cabras', 'Litueche', 'Lolol', 'Machalí', 'Marchihue', 'Mostazal', 'Nancagua', 'Navidad', 'Olivar', 'Peumo', 'Pichidegua', 'Pichilemu', 'Pumanque', 'Placilla', 'Quinta de Tilcoco', 'Rancagua', 'San Fernando', 'San Vicente de Tagua Tagua', 'Santa Cruz'],
    maule: ['Cauquenes', 'Chanco', 'Colbún', 'Constitución', 'Curicó', 'Empredrado', 'Hualañé', 'Licantén', 'Linares', 'Longaví', 'Maule', 'Parral', 'Pelarco', 'Pelluhue', 'Pencahue', 'Rauco', 'Retiro', 'Romeral', 'San Clemente', 'San Javier', 'San Rafael', 'Talca', 'Teno', 'Vichuquén', 'Villa Alegre', 'Yerbas Buenas'],
    ñuble: ['Bulnes', 'Chillán', 'Chillán Viejo', 'Cobquecura', 'Coelemu', 'Coihueco', 'El Carmen', 'Ninhue', 'Ñiquén', 'Pemuco', 'Pinto', 'Portezuelo', 'Quillón', 'Quirihue', 'Ránquil', 'San Carlos', 'San Fabián', 'San Ignacio', 'San Nicolás', 'Treguaco', 'Yungay'],
    biobio: ['Alto Biobío', 'Antuco', 'Arauco', 'Cabrero', 'Cañete', 'Chiguayante', 'Cobquecura', 'Concepción', 'Contulmo', 'Coronel', 'Curanilahue', 'Florida', 'Hualpén', 'Hualqui', 'Lebu', 'Los Álamos', 'Los Ángeles', 'Lota', 'Mulchén', 'Nacimiento', 'Negrete', 'Penco', 'Quilleco', 'Quilaco', 'Quillón', 'San Pedro de la Paz', 'San Rosendo', 'Santa Bárbara', 'Santa Juana', 'Talcahuano', 'Tomé', 'Tucapel', 'Yumbel'],
    araucania: ['Angol', 'Carahue', 'Cholchol', 'Collipulli', 'Cunco', 'Curacautín', 'Curarrehue', 'Freire', 'Galvarino', 'Gorbea', 'Lautaro', 'Loncoche', 'Lonquimay', 'Los Sauces', 'Lumaco', 'Melipeuco', 'Nueva Imperial', 'Padre Las Casas', 'Perquenco', 'Pitrufquén', 'Pucón', 'Purén', 'Renaico', 'Saavedra', 'Temuco', 'Teodoro Schmidt', 'Toltén', 'Traiguén', 'Victoria', 'Vilcún', 'Villarica', 'Carahue'],
    losrios: ['Corral', 'Futrono', 'La Unión', 'Lago Ranco', 'Lanco', 'Los Lagos', 'Mariquina', 'Máfil', 'Paillaco', 'Río Bueno', 'Valdivia', 'Panguipulli'],
    loslagos: ['Calbuco', 'Castro', 'Chaitén', 'Chonchi', 'Cochamó', 'Curaco de Vélez', 'Dalcahue', 'Fresia', 'Frutillar', 'Futaleufú', 'Hualaihué', 'Llanquihue', 'Los Muermos', 'Maullín', 'Osorno', 'Palena', 'Puerto Montt', 'Puerto Octay', 'Puerto Varas', 'Puqueldón', 'Purranque', 'Puyehue', 'Queilén', 'Quellón', 'Quemchi', 'Quinchao', 'Río Negro', 'San Juan de la Costa', 'San Pablo'],
    aysen: ['Aysén', 'Cisnes', 'Chile Chico', 'Cochrane', 'Coyhaique', 'Guaitecas', 'Lago Verde', "O'Higgins", 'Río Ibáñez', 'Tortel'],
    magallanes: ['Antártica', 'Cabo de Hornos (Ex Navarino)', 'Laguna Blanca', 'Natales', 'Punta Arenas', 'Porvenir', 'Primavera', 'Río Verde', 'San Gregorio', 'Timaukel', 'Torres del Paine'],
    rapanui: ['Isla de Pascua'],
  }
  const comunas = comunasPorRegion[form.region] || []
  const onRegionChange = (value) => {
    setForm(f => ({ ...f, region: value, comuna: '' }))
  }

  const validar = () => {
    const e = {}
    if (!form.nombre.trim()) e.nombre = 'Requerido'
    if (!form.correo.trim()) e.correo = 'Requerido'
    if (!form.calle.trim()) e.calle = 'Requerido'
    if (!form.region.trim()) e.region = 'Requerido'
    if (!form.comuna.trim()) e.comuna = 'Requerido'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handlePayNow = () => {
    if (items.length === 0) return
    if (!isLogged) {
      alert('Debes iniciar sesión para continuar con el pago.')
      navigate('/login?redirect=/checkout')
      return
    }
    if (!validar()) return
    ;(async () => {
      try {
        if (isCartApiConfigured()) {
          try {
            const payloadItems = items.map(i => ({
              product_id: (i.id != null ? i.id : (i.__productId != null ? i.__productId : null)),
              name: i.nombre,
              quantity: Number(i.cantidad || 0),
              price: Number(i.precio || 0)
            })).filter(x => (x.product_id != null || x.name) && x.quantity > 0)
            await checkoutRemote({ items: payloadItems })
          } catch { void 0 }
        }
        const draft = {
          date: new Date().toISOString(),
          user: { nombre: form.nombre, apellidos: form.apellidos, email: form.correo },
          shipping: {
            calle: form.calle,
            departamento: form.departamento,
            region: form.region,
            comuna: form.comuna,
            indicaciones: form.indicaciones,
          },
          items,
          totals: { subTotal, taxAmount, grandTotal, taxRate },
        }
        let orderId = `BLT-${Date.now()}`
        let paymentUrl = null
        try {
          const created = await createOrder(draft)
          orderId = created.id || orderId
          paymentUrl = created.paymentUrl || null
        } catch { void 0 }
        const order = { id: orderId, ...draft }
        try { localStorage.setItem('lastOrder', JSON.stringify(order)) } catch { void 0 }
        try {
          const raw = localStorage.getItem('orders')
          const list = raw ? JSON.parse(raw) : []
          const next = [order, ...list].slice(0, 100)
          localStorage.setItem('orders', JSON.stringify(next))
          try { window.dispatchEvent(new CustomEvent('orders:updated', { detail: { count: next.length, order } })) } catch { void 0 }
        } catch { void 0 }
        // Actualiza stock local y remoto en base a los ítems comprados
        try {
          const stocksRaw = localStorage.getItem('productStocks')
          const stockMap = stocksRaw ? JSON.parse(stocksRaw) : {}
          for (const it of items) {
            const pid = it.id != null ? it.id : (it.__productId != null ? it.__productId : undefined)
            const current = Number((pid != null ? stockMap[pid] : undefined) ?? stockMap[it.nombre] ?? it.stock ?? Infinity)
            const qty = Number(it.cantidad || 0)
            const nextStock = Number.isFinite(current) ? Math.max(0, current - qty) : current
            if (Number.isFinite(nextStock)) {
              if (pid != null) {
                stockMap[pid] = nextStock
              } else {
                stockMap[it.nombre] = nextStock
              }
              // Intento de actualización remota si hay id de producto (puede fallar si no es admin)
              try {
                if (pid) await updateProduct(pid, { stock: nextStock })
              } catch { void 0 }
            }
          }
          localStorage.setItem('productStocks', JSON.stringify(stockMap))
          try { window.dispatchEvent(new CustomEvent('stock:updated', { detail: { stockMap } })) } catch { void 0 }
        } catch { void 0 }
        if (paymentUrl) try { localStorage.setItem('lastPaymentUrl', paymentUrl) } catch { void 0 }
        alert('Datos confirmados. Continuemos con el pago.')
        clearCart()
        navigate('/boleta', { state: { order, paymentUrl } })
      } catch (e) {
        console.error(e)
        alert('Ocurrió un error inesperado al preparar tu pago. Intenta más tarde.')
      }
    })()
  }

  const renderRow = i => (
    <tr key={i.nombre}>
      <td style={{ width: 80 }}>
        <img src={i.foto} alt={i.nombre} style={{ width: 60, height: 60, objectFit: 'cover' }} />
      </td>
      <td>{i.nombre}</td>
      <td>${Number(i.precio).toLocaleString()}</td>
      <td>{i.cantidad}</td>
      <td>${Number(i.precio * i.cantidad).toLocaleString()}</td>
    </tr>
  )

  return (
    <div className="container" style={{ marginTop: '20px', marginBottom: '20px', maxWidth: '1100px' }}>
      <div className="d-flex justify-content-between align-items-center mb-2">
        <h5 className="mb-0">Carrito de compra</h5>
        <span className="badge bg-primary">Total a pagar: ${grandTotal.toLocaleString()}</span>
      </div>
      <p className="text-muted small">Completa la siguiente información</p>

      <div className="table-responsive">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Nombre</th>
              <th>Precio</th>
              <th>Cantidad</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {items.map(renderRow)}
          </tbody>
        </table>
      </div>

      <h6 className="mt-3">Información del cliente</h6>
      <p className="text-muted small">Completa la siguiente información</p>

      <div className="row g-3">
        <div className="col-md-6">
          <label className="form-label">Nombre*</label>
          <input className="form-control" value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} />
          {errors.nombre && <div className="text-danger small">{errors.nombre}</div>}
        </div>
        <div className="col-md-6">
          <label className="form-label">Apellidos*</label>
          <input className="form-control" value={form.apellidos} onChange={e => setForm(f => ({ ...f, apellidos: e.target.value }))} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Correo*</label>
          <input className="form-control" type="email" value={form.correo} onChange={e => setForm(f => ({ ...f, correo: e.target.value }))} />
          {errors.correo && <div className="text-danger small">{errors.correo}</div>}
        </div>
      </div>

      <h6 className="mt-4">Dirección de entrega de los productos</h6>
      <p className="text-muted small">Ingreso direccion de forma detallada</p>

      <div className="row g-3">
        <div className="col-md-8">
          <label className="form-label">Calle*</label>
          <input className="form-control" value={form.calle} onChange={e => setForm(f => ({ ...f, calle: e.target.value }))} />
          {errors.calle && <div className="text-danger small">{errors.calle}</div>}
        </div>
        <div className="col-md-4">
          <label className="form-label">Departamento (opcional)</label>
          <input className="form-control" value={form.departamento} onChange={e => setForm(f => ({ ...f, departamento: e.target.value }))} />
        </div>
        <div className="col-md-6">
          <label className="form-label">Región*</label>
          <select className="form-select" value={form.region} onChange={e => onRegionChange(e.target.value)}>
            <option value="">Selecciona tu región</option>
            <option value="arica">Región de Arica y Parinacota</option>
            <option value="tarapaca">Región de Tarapacá</option>
            <option value="antofagasta">Región de Antofagasta</option>
            <option value="atacama">Región de Atacama</option>
            <option value="coquimbo">Región de Coquimbo</option>
            <option value="valpo">Región de Valparaíso</option>
            <option value="metro">Región Metropolitana de Santiago</option>
            <option value="ohiggins">Región del Libertador General Bernardo O'Higgins</option>
            <option value="maule">Región del Maule</option>
            <option value="ñuble">Región de Ñuble</option>
            <option value="biobio">Región del Biobío</option>
            <option value="araucania">Región de La Araucanía</option>
            <option value="losrios">Región de Los Ríos</option>
            <option value="loslagos">Región de Los Lagos</option>
            <option value="aysen">Región de Aysén</option>
            <option value="magallanes">Región de Magallanes y de la Antártica Chilena</option>
            <option value="rapanui">Rapa Nui</option>
          </select>
          {errors.region && <div className="text-danger small">{errors.region}</div>}
        </div>
        <div className="col-md-6">
          <label className="form-label">Comuna*</label>
          <select className="form-select" value={form.comuna} onChange={e => setForm(f => ({ ...f, comuna: e.target.value }))}>
            <option value="">Selecciona tu comuna</option>
            {comunas.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          {errors.comuna && <div className="text-danger small">{errors.comuna}</div>}
        </div>
        <div className="col-12">
          <label className="form-label">Indicaciones para la entrega (opcional)</label>
          <textarea className="form-control" rows={3} value={form.indicaciones} onChange={e => setForm(f => ({ ...f, indicaciones: e.target.value }))} />
        </div>
      </div>

      <div className="d-flex justify-content-between align-items-center mt-4">
        <Link className="btn btn-outline-secondary" to="/carrito">Volver al carrito</Link>
        <button className="btn btn-success" onClick={handlePayNow}>Pagar ahora ${grandTotal.toLocaleString()}</button>
      </div>
    </div>
  )
}
