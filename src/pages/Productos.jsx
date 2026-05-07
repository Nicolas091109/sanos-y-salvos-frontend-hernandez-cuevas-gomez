import React, { useEffect, useMemo, useState } from 'react'
import { useCart } from '../context/useCart'
import { listProducts } from '../services/products'

export default function Productos() {
  useCart()
  const [productos, setProductos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [filters, setFilters] = useState([])
  const availableFilters = useMemo(() => (['bolsas','pantuflas','chapas','imanes','kit']), [])
  const toggleFilter = (f) => {
    setFilters(prev => prev.includes(f) ? prev.filter(x => x !== f) : [...prev, f])
  }
  const clearFilters = () => setFilters([])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const items = await listProducts()
        if (mounted) setProductos(items)
      } catch (e) {
        if (mounted) {
          console.warn('listProducts failed', e)
          setError('No se pudieron cargar los productos')
        }
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    const interval = setInterval(async () => {
      try {
        const items = await listProducts()
        if (mounted) setProductos(items)
      } catch { void 0 }
    }, 10000)
    return () => { mounted = false; clearInterval(interval) }
  }, [])

  return (
    <div className="container" style={{ marginTop: '20px' }}>
      <h1 className="display-5 text-center">Productos</h1>
      <p className="text-center">Selecciona productos y agrégalos al carrito.</p>
      <div className="d-flex justify-content-center gap-2 mb-3">
        {availableFilters.map(f => (
          <button
            key={f}
            className={`btn btn-sm ${filters.includes(f) ? 'btn-primary' : 'btn-outline-primary'}`}
            onClick={() => toggleFilter(f)}
          >{f.charAt(0).toUpperCase() + f.slice(1)}</button>
        ))}
        <button className="btn btn-sm btn-outline-secondary" onClick={clearFilters}>Todos</button>
      </div>

      <div className="row g-4" style={{ marginTop: '20px' }}>
        {loading && <div className="text-center">Cargando productos...</div>}
        {error && <div className="text-center text-danger">{error}</div>}
        {!loading && productos.filter(p => {
          const tags = Array.isArray(p.tags) ? p.tags : []
          const includeByFilter = filters.length === 0 || tags.some(t => filters.includes(t))
          const f = String(p.foto || '').toLowerCase()
          const hasRealPhoto = !!f && !(/logocc|noimg/.test(f))
          return includeByFilter && hasRealPhoto
        }).map(p => (
          <div className="col-md-4" key={p.nombre}>
            <div className="card h-100 d-flex flex-column">
              <a
                href={`/detalleProductos.html?id=${encodeURIComponent(p.id ?? '')}&nombre=${encodeURIComponent(p.nombre)}&foto=${encodeURIComponent(p.foto || '')}&precio=${encodeURIComponent(p.precio)}&descripcion=${encodeURIComponent(p.descripcion || '')}&stock=${encodeURIComponent(p.stock ?? 0)}`}
              >
                <div style={{ position: 'relative', width: '100%', paddingTop: '100%', overflow: 'hidden' }}>
                  <img
                    className="card-img-top"
                    src={p.foto}
                    alt={p.nombre}
                    style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', cursor: 'pointer' }}
                  />
                </div>
              </a>
              <div className="card-body d-flex flex-column">
                <h5 className="card-title text-center">{p.nombre}</h5>
                <div className="d-flex justify-content-between align-items-center mt-auto">
                  <span className="text-success fw-bold">${Number(p.precio || 0).toLocaleString('es-CL')} C/U</span>
                  <span className="badge bg-secondary">Stock: {p.stock ?? '—'}</span>
                  <a
                    className="btn btn-outline-primary btn-sm"
                    href={`/detalleProductos.html?id=${encodeURIComponent(p.id ?? '')}&nombre=${encodeURIComponent(p.nombre)}&foto=${encodeURIComponent(p.foto || '')}&precio=${encodeURIComponent(p.precio)}&descripcion=${encodeURIComponent(p.descripcion || '')}&stock=${encodeURIComponent(p.stock ?? 0)}`}
                  >
                    Ver más
                  </a>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
