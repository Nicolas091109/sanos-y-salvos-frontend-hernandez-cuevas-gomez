import React, { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { listProducts, createProduct, updateProduct, deleteProduct, listCategories } from '../services/products'
import { getJson } from '../services/api'
import { getCurrentUser } from '../services/auth'

export default function Admin() {
  const navigate = useNavigate()
  const [productos, setProductos] = useState([])
  const [categorias, setCategorias] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [section, setSection] = useState('dashboard')
  const [purchaseCount, setPurchaseCount] = useState(0)
  const [usersCount, setUsersCount] = useState(0)
  const [orders, setOrders] = useState([])
  const [users, setUsers] = useState([])

  const [mostrandoForm, setMostrandoForm] = useState(false)
  const [editandoId, setEditandoId] = useState(null)
  const [form, setForm] = useState({ nombre: '', precio: '', descripcion: '', foto_url: '', categoria_id: '', activo: true })

  useEffect(() => {
    const u = getCurrentUser()
    const r = String(u?.role || '').toLowerCase()
    const isAdmin = r === 'admin' || r === 'administrador'
    if (!isAdmin) {
      alert('Acceso restringido: inicia sesión como administrador.')
      navigate('/login?redirect=/admin&admin=true')
    }
  }, [navigate])

  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const [items, cats] = await Promise.all([listProducts(), listCategories()])
        if (mounted) {
          setProductos(items)
          setCategorias(cats)
        }
        // Conteo de usuarios excluyendo admins
        ;(async () => {
          const tryPaths = ['/usuarios', '/users', '/user']
          let counted = 0
          for (const path of tryPaths) {
            try {
              const list = await getJson(path)
              if (Array.isArray(list)) {
                counted = list.filter(u => (u.role || u.rol || 'cliente') !== 'admin').length
                break
              }
            } catch (e) {
              try { console.warn(`GET ${path} falló (${e.message}). Probando siguiente ruta si existe...`) } catch { void 0 }
            }
          }
          if (!counted) {
            try {
              const raw = localStorage.getItem('registeredUsers')
              const arr = raw ? JSON.parse(raw) : []
              counted = Array.isArray(arr) ? arr.filter(u => (u.role || 'cliente') !== 'admin').length : 0
            } catch { void 0 }
          }
          if (mounted) setUsersCount(counted)
        })()
      } catch {
        if (mounted) setError('No se pudieron cargar productos o categorías')
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [])

  // Lista de órdenes para la sección Órdenes
  useEffect(() => {
    const getOrders = () => {
      try {
        const raw = localStorage.getItem('orders')
        const list = raw ? JSON.parse(raw) : []
        return Array.isArray(list) ? list : []
      } catch { return [] }
    }
    setOrders(getOrders())
    const onStorage = (e) => { if (e.key === 'orders') setOrders(getOrders()) }
    const onOrdersUpdated = () => setOrders(getOrders())
    window.addEventListener('storage', onStorage)
    window.addEventListener('orders:updated', onOrdersUpdated)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('orders:updated', onOrdersUpdated)
    }
  }, [])

  // Lista de usuarios para la sección Usuarios (API si existe, si no, fallback local)
  useEffect(() => {
    let mounted = true
    ;(async () => {
      const tryPaths = ['/usuarios', '/users', '/user']
      let list = []
      for (const path of tryPaths) {
        try {
          const arr = await getJson(path)
          if (Array.isArray(arr) && arr.length) { list = arr; break }
        } catch { void 0 }
      }
      if (!list.length) {
        try {
          const raw = localStorage.getItem('registeredUsers')
          const arr = raw ? JSON.parse(raw) : []
          list = Array.isArray(arr) ? arr : []
        } catch { void 0 }
      }
      if (!list.length) {
        try {
          const raw = localStorage.getItem('orders')
          const arr = raw ? JSON.parse(raw) : []
          const unique = {}
          arr.forEach(o => {
            if (o?.user?.email) unique[o.user.email] = { nombre: o.user.nombre, email: o.user.email, role: 'cliente' }
          })
          list = Object.values(unique)
        } catch { void 0 }
      }
      if (mounted) setUsers(list)
    })()
    return () => { mounted = false }
  }, [])

  // Cargar y mantener en tiempo real el contador de compras (�rdenes)
  useEffect(() => {
    const getCount = () => {
      try {
        const raw = localStorage.getItem('orders')
        const list = raw ? JSON.parse(raw) : []
        return Array.isArray(list) ? list.length : 0
      } catch {
        return 0
      }
    }
    setPurchaseCount(getCount())

    const onStorage = (e) => {
      if (e.key === 'orders') setPurchaseCount(getCount())
    }
    const onOrdersUpdated = (e) => {
      const count = (e && e.detail && typeof e.detail.count === 'number') ? e.detail.count : getCount()
      setPurchaseCount(count)
    }
    window.addEventListener('storage', onStorage)
    window.addEventListener('orders:updated', onOrdersUpdated)
    return () => {
      window.removeEventListener('storage', onStorage)
      window.removeEventListener('orders:updated', onOrdersUpdated)
    }
  }, [])

  // Refresca productos desde la base ante eventos de stock
  useEffect(() => {
    const refreshFromApi = async () => {
      try {
        const items = await listProducts()
        setProductos(items)
      } catch { void 0 }
    }
    const onStockUpdated = () => { refreshFromApi() }
    window.addEventListener('stock:updated', onStockUpdated)
    return () => {
      window.removeEventListener('stock:updated', onStockUpdated)
    }
  }, [])

  const categoriasById = useMemo(() => Object.fromEntries(categorias.map(c => [c.id, c.nombre || c.slug || String(c.id)])), [categorias])
  const totalStock = useMemo(() => productos.reduce((sum, p) => {
    const n = Number(p.stock)
    return sum + (Number.isFinite(n) ? n : 0)
  }, 0), [productos])

  function abrirNuevo() {
    setEditandoId(null)
    setForm({ nombre: '', precio: '', descripcion: '', foto_url: '', categoria_id: '', activo: true })
    setMostrandoForm(true)
  }

  function abrirEditar(p) {
    setEditandoId(p.id)
    setForm({
      nombre: p.nombre || '',
      precio: p.precio ?? '',
      descripcion: p.descripcion || '',
      foto_url: p.foto || '',
      categoria_id: p.categoria_id ?? '',
      activo: p.activo ?? true
    })
    setMostrandoForm(true)
  }

  function cancelarForm() {
    setMostrandoForm(false)
    setEditandoId(null)
  }

  async function guardarForm(e) {
    e.preventDefault()
    try {
      const payload = { ...form }
      if (payload.categoria_id === '') delete payload.categoria_id
      payload.precio = Number(payload.precio)
      if (!Number.isFinite(payload.precio)) throw new Error('Precio inv�lido')

      if (editandoId) {
        await updateProduct(editandoId, payload)
      } else {
        await createProduct(payload)
      }
      const items = await listProducts()
      setProductos(items)
      cancelarForm()
    } catch (e) {
      console.error(e)
      setError(e.message || 'Error al guardar el producto')
    }
  }

  async function eliminarProducto(id) {
    const ok = window.confirm('Eliminar este producto? Esta acci�n no se puede deshacer.')
    if (!ok) return
    try {
      await deleteProduct(id)
      const items = await listProducts()
      setProductos(items)
    } catch (e) {
      console.error(e)
      setError('No se pudo eliminar el producto')
    }
  }

  function cerrarSesion() {
    try {
      localStorage.removeItem('currentUser')
      localStorage.removeItem('authToken')
      localStorage.removeItem('authtoken')
    } catch { void 0 }
    navigate('/login')
  }

  function eliminarUsuarioLocal(email) {
    if (!email) return
    const ok = window.confirm('¿Eliminar este usuario? Esta acción no se puede deshacer.')
    if (!ok) return
    try {
      const raw = localStorage.getItem('registeredUsers')
      const arr = raw ? JSON.parse(raw) : []
      const next = Array.isArray(arr) ? arr.filter(u => u.email !== email) : []
      localStorage.setItem('registeredUsers', JSON.stringify(next))
      setUsers(prev => prev.filter(u => u.email !== email))
    } catch { void 0 }
  }

  return (
    <div className="container-fluid" style={{ marginTop: '20px' }}>
      <div className="row">
        {/* Sidebar */}
        <div className="col-12 col-md-3 col-lg-2 border-end">
          <div className="p-3">
            <h6 className="text-muted mb-3">Company name</h6>
            <ul className="list-unstyled">
              {[
                { key: 'dashboard', label: 'Dashboard' },
                { key: 'ordenes', label: 'Órdenes' },
                { key: 'productos', label: 'Productos' },
                { key: 'categorias', label: 'Categorías' },
                { key: 'usuarios', label: 'Usuarios' },
                { key: 'reportes', label: 'Reportes' },
                { key: 'perfil', label: 'Perfil' },
                { key: 'tienda', label: 'Tienda' },
              ].map(item => (
                <li key={item.key}>
                  <button className={`btn w-100 text-start ${section === item.key ? 'btn-primary' : 'btn-light'}`} onClick={() => setSection(item.key)}>
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
            <div className="mt-4">
              <button className="btn btn-outline-danger w-100" onClick={cerrarSesion}>Cerrar Sesión</button>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="col-12 col-md-9 col-lg-10">
          {section === 'dashboard' && (
            <div className="p-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h2 className="h4 mb-0">Dashboard</h2>
                <small className="text-muted">Resumen de tus actividades diarias</small>
              </div>
              <div className="row g-3">
                <div className="col-md-4">
                  <div className="card border-0 shadow-sm">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <div className="text-muted">Compras</div>
                          <div className="h4">{purchaseCount}</div>
                          <div className="text-primary small">Probabilidad de aumento 20%</div>
                        </div>
                        <div className="display-6"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border-0 shadow-sm">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <div className="text-muted">Productos</div>
                          <div className="h4">{totalStock}</div>
                          <div className="text-success small">Inventario actualizado</div>
                        </div>
                        <div className="display-6"></div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-md-4">
                  <div className="card border-0 shadow-sm">
                    <div className="card-body">
                      <div className="d-flex justify-content-between align-items-center">
                        <div>
                          <div className="text-muted">Usuarios</div>
                          <div className="h4">{usersCount}</div>
                          <div className="text-warning small">Sin contar administradores</div>
                        </div>
                        <div className="display-6"></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="row g-3 mt-2">
                {[
                  { key: 'dashboard', title: 'Dashboard', desc: 'Visión general de métricas y estadísticas clave.' },
                  { key: 'ordenes', title: 'Órdenes', desc: 'Gestión y seguimiento de órdenes de compra realizadas.' },
                  { key: 'productos', title: 'Productos', desc: 'Administrar inventario y detalles de productos disponibles.' },
                  { key: 'categorias', title: 'Categorías', desc: 'Organizar productos en categorías para facilitar navegación.' },
                  { key: 'usuarios', title: 'Usuarios', desc: 'Gestión de cuentas de usuario y sus roles.' },
                  { key: 'reportes', title: 'Reportes', desc: 'Generación de informes detallados de operaciones.' },
                  { key: 'perfil', title: 'Perfil', desc: 'Administración de información personal y configuraciones.' },
                  { key: 'tienda', title: 'Tienda', desc: 'Visualizar la tienda y sus reportes en tiempo real.' },
                ].map(card => (
                  <div className="col-md-3" key={card.key}>
                    <div className="card h-100 border-0 shadow-sm">
                      <div className="card-body">
                        <h6 className="card-title">{card.title}</h6>
                        <p className="card-text text-muted small" style={{ minHeight: 60 }}>{card.desc}</p>
                        <button className="btn btn-outline-primary btn-sm" onClick={() => setSection(card.key)}>Abrir</button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {section === 'productos' && (
            <div className="p-3">
              <div className="d-flex justify-content-between align-items-center">
                <h2 className="h4 mb-0">Productos</h2>
                <div>
                  {loading && <span className="text-muted">Cargando...</span>}
                  {error && <span className="text-danger">{error}</span>}
                </div>
              </div>
              <div className="mt-3">
                <button className="btn btn-primary btn-sm" onClick={abrirNuevo}>Nuevo Producto</button>
              </div>

              {mostrandoForm && (
                <form className="card p-3 mt-3" onSubmit={guardarForm}>
                  <div className="row g-3">
                    <div className="col-md-6">
                      <label className="form-label">Nombre</label>
                      <input className="form-control" value={form.nombre} onChange={e => setForm(f => ({ ...f, nombre: e.target.value }))} required />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Precio (CLP)</label>
                      <input type="number" className="form-control" value={form.precio} onChange={e => setForm(f => ({ ...f, precio: e.target.value }))} required />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Activo</label>
                      <select className="form-select" value={form.activo ? 'true' : 'false'} onChange={e => setForm(f => ({ ...f, activo: e.target.value === 'true' }))}>
                        <option value="true">S�</option>
                        <option value="false">No</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label className="form-label">Descripcion</label>
                      <textarea className="form-control" rows={3} value={form.descripcion} onChange={e => setForm(f => ({ ...f, descripcion: e.target.value }))} />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Foto URL</label>
                      <input className="form-control" value={form.foto_url} onChange={e => setForm(f => ({ ...f, foto_url: e.target.value }))} />
                    </div>
                    <div className="col-md-3">
                      <label className="form-label">Categor�a</label>
                      <select className="form-select" value={form.categoria_id} onChange={e => setForm(f => ({ ...f, categoria_id: e.target.value }))}>
                        <option value="">(Sin categor�a)</option>
                        {categorias.map(c => (
                          <option key={c.id} value={c.id}>{c.nombre || c.slug || c.id}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="mt-3 d-flex gap-2">
                    <button type="submit" className="btn btn-success">{editandoId ? 'Guardar cambios' : 'Crear producto'}</button>
                    <button type="button" className="btn btn-secondary" onClick={cancelarForm}>Cancelar</button>
                  </div>
                </form>
              )}

              <div className="table-responsive mt-4">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Producto</th>
                      <th>Precio</th>
                      <th>Categor�a</th>
                      <th>Activo</th>
                      <th className="text-end">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {productos.map(p => (
                      <tr key={p.id || p.nombre}>
                        <td>
                          <div className="d-flex align-items-center gap-3">
                            <img src={p.foto} alt={p.nombre} style={{ width: 60, height: 60, objectFit: 'cover' }} />
                            <div>
                              <div className="fw-semibold">{p.nombre}</div>
                              <div className="text-muted small">{p.descripcion}</div>
                            </div>
                          </div>
                        </td>
                        <td>${Number(p.precio || 0).toLocaleString('es-CL')}</td>
                        <td>{categoriasById[p.categoria_id] || '-'}</td>
                        <td>{p.activo ? 'S�' : 'No'}</td>
                        <td className="text-end">
                          <button className="btn btn-outline-primary btn-sm me-2" onClick={() => abrirEditar(p)}>Editar</button>
                          <button className="btn btn-outline-danger btn-sm" onClick={() => eliminarProducto(p.id)}>Eliminar</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {section === 'ordenes' && (
            <div className="p-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h2 className="h4 mb-0">Órdenes</h2>
                <small className="text-muted">Compras registradas recientemente</small>
              </div>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Boleta</th>
                      <th>Fecha</th>
                      <th>Cliente</th>
                      <th className="text-end">Total</th>
                      <th className="text-center">Items</th>
                      <th className="text-end">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(o => (
                      <tr key={o.id}>
                        <td>{o.id}</td>
                        <td>{new Date(o.date).toLocaleString()}</td>
                        <td>{o.user?.nombre || ''} <span className="text-muted small">{o.user?.email || ''}</span></td>
                        <td className="text-end">${Number(o.totals?.grandTotal || 0).toLocaleString('es-CL')}</td>
                        <td className="text-center">{Array.isArray(o.items) ? o.items.length : 0}</td>
                        <td className="text-end">
                          <a className="btn btn-outline-primary btn-sm" href={`/boleta/${o.id}`}>Ver</a>
                        </td>
                      </tr>
                    ))}
                    {orders.length === 0 && (
                      <tr><td colSpan={6} className="text-center text-muted">No hay órdenes registradas.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {section === 'usuarios' && (
            <div className="p-3">
              <div className="d-flex justify-content-between align-items-center mb-2">
                <h2 className="h4 mb-0">Usuarios</h2>
                <small className="text-muted">Gestión básica de cuentas</small>
              </div>
              <div className="table-responsive">
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Nombre</th>
                      <th>Correo</th>
                      <th>Rol</th>
                      <th className="text-end">Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(u => (
                      <tr key={u.email || u.id}>
                        <td>{u.nombre || u.name || '-'}</td>
                        <td>{u.email || '-'}</td>
                        <td>{u.role || u.rol || 'cliente'}</td>
                        <td className="text-end">
                          <button className="btn btn-outline-danger btn-sm" onClick={() => eliminarUsuarioLocal(u.email)}>Eliminar</button>
                        </td>
                      </tr>
                    ))}
                    {users.length === 0 && (
                      <tr><td colSpan={4} className="text-center text-muted">No hay usuarios para mostrar.</td></tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {section !== 'dashboard' && section !== 'productos' && section !== 'ordenes' && section !== 'usuarios' && (
            <div className="p-3">
              <h2 className="h4 mb-2 text-capitalize">{section}</h2>
              <p className="text-muted">Esta sección está en construcción. Próximamente funcionalidades completas.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
