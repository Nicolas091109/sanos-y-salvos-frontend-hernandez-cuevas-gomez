// Servicio de carrito con fallback local
import { getToken } from './auth'

function trimSlash(s) {
  return (s || '').replace(/\/+$/, '')
}

const BASE_URL = (() => {
  const root = import.meta.env.VITE_CART_ROOT
  if (root && /^https?:\/\//.test(root)) return trimSlash(root)
  const base = (import.meta.env.VITE_BACKEND_BASE_URL || import.meta.env.VITE_API_BASE)
  if (base && /^https?:\/\//.test(base)) return `${trimSlash(base).replace(/\/?api\/?$/, '')}/cart`
  return ''
})()

export function isCartApiConfigured() {
  return Boolean(BASE_URL && /^https?:\/\//.test(BASE_URL))
}

function authHeaders() {
  const token = getToken()
  const headers = { 'Content-Type': 'application/json' }
  if (token) headers['Authorization'] = `Bearer ${token}`
  // Soporte de carrito invitado: usamos X-Cart-Key si existe
  const key = getCartKey()
  if (!token && key) headers['X-Cart-Key'] = key
  return headers
}

function getCartKey() {
  try {
    let key = localStorage.getItem('cart_key')
    if (!key) {
      key = crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`
      localStorage.setItem('cart_key', key)
    }
    return key
  } catch {
    return null
  }
}

function mapItemToLocal(it) {
  const p = it.product || {}
  const nombre = p.nombre || p.name || it.name || ''
  const precio = Number(p.precio ?? p.price ?? it.price ?? 0)
  const foto = p.foto || p.photo_url || p.image_url || ''
  const descripcion = p.descripcion || p.description || ''
  const cantidad = Number(it.quantity ?? it.cantidad ?? 1)
  const stock = p.stock ?? p.inventario ?? p.stock_actual
  return {
    nombre,
    precio,
    foto,
    descripcion,
    cantidad,
    ...(stock != null ? { stock: Number(stock) } : {}),
    // Guardamos ids para operaciones remotas
    __itemId: it.id,
    __productId: p.id ?? it.product_id,
  }
}

function mapCartToLocal(json) {
  const items = Array.isArray(json.items) ? json.items.map(mapItemToLocal) : []
  const total = Number(json.total ?? items.reduce((t, i) => t + i.precio * i.cantidad, 0))
  return { items, total }
}

async function req(path, options = {}) {
  const url = `${BASE_URL}${path || ''}`
  const res = await fetch(url, { ...options, headers: { ...authHeaders(), ...(options.headers || {}) } })
  const data = await res.json().catch(() => ({}))
  if (!res.ok) {
    const message = data?.message || data?.error || `Error ${res.status}`
    const e = new Error(message)
    e.status = res.status
    e.data = data
    throw e
  }
  return data
}

export async function getCart() {
  if (!isCartApiConfigured()) return { items: [], total: 0 }
  const data = await req('')
  return mapCartToLocal(data.cart || data)
}

export async function addItemRemote(productId, quantity = 1) {
  if (!isCartApiConfigured()) return { items: [], total: 0 }
  const body = JSON.stringify({ product_id: productId, quantity })
  const data = await req('/items', { method: 'POST', body })
  return mapCartToLocal(data.cart || data)
}

export async function updateItemRemote(itemId, quantity) {
  if (!isCartApiConfigured()) return { items: [], total: 0 }
  const body = JSON.stringify({ quantity })
  const data = await req(`/items/${itemId}`, { method: 'PATCH', body })
  return mapCartToLocal(data.cart || data)
}

export async function removeItemRemote(itemId) {
  if (!isCartApiConfigured()) return { items: [], total: 0 }
  const data = await req(`/items/${itemId}`, { method: 'DELETE' })
  return mapCartToLocal(data.cart || data)
}

export async function clearCartRemote() {
  if (!isCartApiConfigured()) return { items: [], total: 0 }
  const data = await req('', { method: 'DELETE' })
  return mapCartToLocal(data.cart || data)
}

export async function checkoutRemote(payload = {}) {
  if (!isCartApiConfigured()) return { order: null }
  const body = JSON.stringify(payload)
  const data = await req('/checkout', { method: 'POST', body })
  return data
}