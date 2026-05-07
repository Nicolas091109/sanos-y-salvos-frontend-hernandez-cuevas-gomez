import { getJson, postJson, request } from './api'

// Devuelve lista de productos desde backend: GET /productos
// Estructura esperada: [{ id, nombre, precio, foto_url, descripcion }]
export async function listProducts() {
  const jsonPath = (import.meta.env?.VITE_PRODUCTS_JSON || '').toString().trim()
  if (jsonPath) {
    try {
      const res = await fetch(jsonPath)
      if (res.ok) {
        const raw = await res.json()
        const items = Array.isArray(raw) ? raw : (Array.isArray(raw?.productos) ? raw.productos : [])
        return items.map(p => {
          const rawFoto = p.foto_url ?? p.foto ?? p.image ?? '/img/LogoCC.svg'
  const foto = normalizeFoto(rawFoto)
          const tags = categorizeProduct(p)
          return ({
            id: p.id ?? p.product_id ?? p.uid ?? p.nombre,
            nombre: p.nombre ?? p.name,
            precio: p.precio ?? p.price ?? 0,
            foto,
            descripcion: p.descripcion ?? p.description ?? '',
            stock: p.stock ?? p.inventario ?? p.stock_actual ?? null,
            tags
          })
        })
      }
    } catch (e) {
      console.warn(`GET ${jsonPath} falló (${e.message}). Continuando con API...`)
    }
  }
  const tryPaths = ['/api/productos', '/productos', '/products'];
  for (const path of tryPaths) {
    try {
      const items = await getJson(path);
      // Normaliza claves para el frontend
      let normalized = items.map(p => {
        const rawFoto = p.foto_url ?? p.foto ?? p.image ?? '/img/LogoCC.svg'
        const foto = normalizeFoto(rawFoto)
        const tags = categorizeProduct(p)
        return ({
          id: p.id ?? p.product_id ?? p.uid ?? p.nombre,
          nombre: p.nombre ?? p.name,
          precio: p.precio ?? p.price ?? 0,
          foto,
          descripcion: p.descripcion ?? p.description ?? '',
          stock: p.stock ?? p.inventario ?? p.stock_actual ?? null,
          tags
        })
      })
      return normalized;
    } catch (e) {
      // Continúa con el siguiente path
      console.warn(`GET ${path} falló (${e.message}). Probando siguiente ruta si existe...`);
    }
  }

  // Fallback a datos estáticos si ambos endpoints fallan
  console.warn('No se pudo obtener productos desde la API; usando datos estáticos.');
  let fallback = [
    {
      id: 1,
      nombre: 'Pantuflas c/ bolsa Reutilizable',
      precio: 12990,
      foto: '/img/Pantuflas.jpg',
      descripcion: 'Pantuflas cómodas con bolsa reutilizable, ideales para tu gran día.',
      stock: 10,
      tags: ['pantuflas','bolsas']
    },
    {
      id: 2,
      nombre: 'Chapas Imán Destapador',
      precio: 4990,
      foto: '/img/chapita.jpg',
      descripcion: 'Chapas personalizadas con imán y destapador para recuerdos únicos.',
      stock: 5,
      tags: ['chapas','imanes']
    },
    {
      id: 3,
      nombre: 'Kit Anti Resaca',
      precio: 7990,
      foto: '/img/KitAnti.jpg',
      descripcion: 'Kit pensado para el día después, con los esenciales para tus invitados.',
      stock: 2,
      tags: ['kit']
    }
  ];
  return fallback;
}

// Obtiene un producto por ID: GET /productos/:id
export async function getProductById(id) {
  if (!id) throw new Error('getProductById requiere id');
  const candidates = [`/api/productos/${id}`, `/productos/${id}`, `/products/${id}`]
  for (const path of candidates) {
    try { return await getJson(path) } catch { void 0 }
  }
  throw new Error('No se pudo obtener el producto desde la API')
}

// Crea un producto: POST /productos
export async function createProduct(data) {
  const payload = normalizeWritePayload(data)
  const candidates = ['/api/productos', '/productos', '/products']
  for (const path of candidates) {
    try { return await postJson(path, payload) } catch { void 0 }
  }
  throw new Error('No se pudo crear el producto en la API')
}

// Actualiza un producto: PUT /productos/:id
export async function updateProduct(id, data) {
  if (!id) throw new Error('updateProduct requiere id')
  const payload = normalizeWritePayload(data, { partial: true })
  const candidates = [`/api/productos/${id}`, `/productos/${id}`, `/products/${id}`]
  for (const path of candidates) {
    try {
      const res = await request(path, { method: 'PUT', body: JSON.stringify(payload) })
      if (res.ok) return res.json()
    } catch { void 0 }
  }
  throw new Error('No se pudo actualizar el producto en la API')
}

// Elimina un producto: DELETE /productos/:id
export async function deleteProduct(id) {
  if (!id) throw new Error('deleteProduct requiere id')
  const candidates = [`/api/productos/${id}`, `/productos/${id}`, `/products/${id}`]
  for (const path of candidates) {
    try {
      const res = await request(path, { method: 'DELETE' })
      if (res.ok) return true
    } catch { void 0 }
  }
  throw new Error('No se pudo eliminar el producto en la API')
}

// Lista categorías: intenta /categorias y /categoria
export async function listCategories() {
  const tryPaths = ['/api/categorias', '/categorias', '/categoria', '/categories', '/category']
  for (const path of tryPaths) {
    try {
      const items = await getJson(path)
      return items.map(c => ({
        id: c.id ?? c.categoria_id ?? c.uid ?? null,
        nombre: c.nombre ?? c.name ?? '',
        slug: c.slug ?? c.categoria_slug ?? null
      }))
    } catch (e) {
      console.warn(`GET ${path} falló (${e.message}). Probando siguiente ruta si existe...`)
    }
  }
  // Fallback vacío
  return []
}

function normalizeWritePayload(data, { partial = false } = {}) {
  const rawFoto = data.foto_url ?? data.foto
  const foto = normalizeFoto(rawFoto)

  const base = {
    nombre: data.nombre,
    precio: Number.isFinite(Number(data.precio)) ? Number(data.precio) : undefined,
    descripcion: data.descripcion,
    foto, // El backend espera 'foto', no 'foto_url'
    categoria_id: data.categoria_id != null ? Number(data.categoria_id) : undefined,
    activo: typeof data.activo === 'boolean' ? data.activo : undefined,
    stock: data.stock != null ? Number(data.stock) : undefined
  }

  if (partial) {
    // Elimina undefined para PATCH parcial limpio
    return Object.fromEntries(Object.entries(base).filter(([, v]) => v !== undefined))
  }
  // Para creación, permitir valores por defecto
  return {
    ...base,
    activo: base.activo ?? true
  }
}

function normalizeFoto(raw) {
  const s = String(raw || '/img/LogoCC.svg')
  const base = /^https?:\/\//.test(s) || s.startsWith('/')
    ? s
    : `/${s.replace(/^\.?\//, '')}`
  if (base.toLowerCase() === '/img/chapita.jpg') return '/img/Chapita.jpg'
  return base
}

function categorizeProduct(p) {
  const name = String(p.nombre ?? p.name ?? '').toLowerCase()
  const tags = []
  const isKit = /\bkit\b|anti\s*resaca|antiresaca|antica/i.test(name)
  if (/pantufla/.test(name)) tags.push('pantuflas')
  if (!isKit && /bolsa|almohada/.test(name)) tags.push('bolsas')
  if (/chapa|destapador|llavero/.test(name)) tags.push('chapas')
  if (/im[aá]n|imanes|imantado/.test(name)) tags.push('imanes')
  if (isKit) tags.push('kit')
  return Array.from(new Set(tags))
}
