import React, { useEffect, useMemo, useState } from 'react'
import { CartContext } from './cartContext'
import { isCartApiConfigured, getCart, addItemRemote, updateItemRemote, removeItemRemote, clearCartRemote } from '../services/cart'
import { listProducts } from '../services/products'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const saved = localStorage.getItem('carrito')
      return saved ? JSON.parse(saved) : []
    } catch {
      return []
    }
  })
  const [stockMap, setStockMap] = useState({})
  const [remoteReady, setRemoteReady] = useState(() => isCartApiConfigured())

  useEffect(() => {
    try {
      localStorage.setItem('carrito', JSON.stringify(items))
    } catch { void 0 }
  }, [items])

  // Cargar stock de productos para validar incluso si el item del carrito no lo trae
  useEffect(() => {
    let mounted = true
    ;(async () => {
      try {
        const products = await listProducts()
        if (!mounted) return
        const map = Object.fromEntries(products.flatMap(p => {
          const val = Number(p.stock ?? Infinity)
          const idKey = p.id != null ? [[p.id, val]] : []
          const nameKey = p.nombre ? [[p.nombre, val]] : []
          return [...idKey, ...nameKey]
        }))
        setStockMap(map)
        // Completa stock faltante en items ya cargados
        setItems(prev => prev.map(i => ({ ...i, stock: i.stock != null ? i.stock : (map[i.id] ?? map[i.nombre]) })))
      } catch { void 0 }
    })()
    return () => { mounted = false }
  }, [])

  useEffect(() => {
    let mounted = true
    async function loadRemote() {
      if (!remoteReady) return
      try {
        const data = await getCart()
        if (!mounted) return
        const remoteItems = Array.isArray(data.items) ? data.items : []
        const remoteTotal = Number(data.total ?? remoteItems.reduce((t, i) => t + (Number(i.precio||0) * Number(i.cantidad||0)), 0))
        if (remoteItems.length > 0 || remoteTotal > 0) {
          setItems(remoteItems)
        }
      } catch {
        // Si falla, seguimos en modo local
        setRemoteReady(false)
      }
    }
    loadRemote()
    return () => { mounted = false }
  }, [remoteReady])

  const addItem = async (item, quantity = 1) => {
    // Validación de stock local antes de agregar
    setItems(prev => {
      const idx = prev.findIndex(i => i.nombre === item.nombre)
      const currentQty = idx !== -1 ? prev[idx].cantidad : 0
      const available = Number(item?.stock ?? (stockMap[item.id] ?? stockMap[item.nombre]))
      const desired = currentQty + Number(quantity)
      if (Number.isFinite(available) && desired > available) {
        alert('Stock insuficiente')
        return prev
      }
      return prev
    })

    if (remoteReady && (item.id || item.__productId)) {
      try {
        const productId = item.id || item.__productId
        const data = await addItemRemote(productId, quantity)
        setItems(data.items || [])
        return
        } catch (err) {
          alert(err?.message || 'No se pudo agregar el producto (posible stock insuficiente).')
          return
        }
    }

    // Fallback local
    setItems(prev => {
      const idx = prev.findIndex(i => i.nombre === item.nombre)
      if (idx !== -1) {
        const next = [...prev]
        const available = Number(item?.stock ?? (stockMap[item.id] ?? stockMap[item.nombre]))
        const desired = next[idx].cantidad + Number(quantity)
        if (Number.isFinite(available) && desired > available) {
          alert('Stock insuficiente')
          return prev
        }
        next[idx] = { ...next[idx], cantidad: desired }
        return next
      }
      const available = Number(item?.stock ?? (stockMap[item.id] ?? stockMap[item.nombre]))
      if (Number.isFinite(available) && Number(quantity) > available) {
        alert('Stock insuficiente')
        return prev
      }
      return [...prev, { ...item, cantidad: Number(quantity), stock: item.stock != null ? item.stock : stockMap[item.nombre] }]
    })
  }

  const updateQuantity = async (nombre, cantidad) => {
    if (remoteReady) {
      const item = items.find(i => i.nombre === nombre)
      if (item?.__itemId) {
        try {
          const data = await updateItemRemote(item.__itemId, cantidad)
          setItems(data.items || [])
          return
        } catch (err) {
          alert(err?.message || 'No se pudo actualizar la cantidad (posible stock insuficiente).')
          return
        }
      }
    }
    setItems(prev => {
      const next = [...prev]
      const idx = next.findIndex(i => i.nombre === nombre)
      if (idx === -1) return prev
      if (cantidad <= 0) return next.filter(i => i.nombre !== nombre)
      const available = Number(next[idx]?.stock ?? (stockMap[next[idx]?.id] ?? stockMap[nombre]))
      if (Number.isFinite(available) && Number(cantidad) > available) {
        alert('Stock insuficiente')
        return prev
      }
      next[idx] = { ...next[idx], cantidad: Number(cantidad) }
      return next
    })
  }

  const removeItem = async nombre => {
    if (remoteReady) {
      const item = items.find(i => i.nombre === nombre)
      if (item?.__itemId) {
        try {
          const data = await removeItemRemote(item.__itemId)
          setItems(data.items || [])
          return
        } catch {
          // fallback a local
        }
      }
    }
    setItems(prev => prev.filter(i => i.nombre !== nombre))
  }

  const clearCart = async () => {
    if (remoteReady) {
      try {
        const data = await clearCartRemote()
        setItems(data.items || [])
        return
      } catch {
        // fallback a local
      }
    }
    setItems([])
  }

  const totalCount = useMemo(() => items.reduce((t, i) => t + i.cantidad, 0), [items])
  const totalPrice = useMemo(() => items.reduce((t, i) => t + i.precio * i.cantidad, 0), [items])

  const value = {
    items,
    addItem,
    updateQuantity,
    removeItem,
    clearCart,
    totalCount,
    totalPrice,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
