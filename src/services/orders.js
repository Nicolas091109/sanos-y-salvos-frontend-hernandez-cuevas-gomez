import { postJson, getJson } from './api'

function isNotFound(err) {
  const msg = String(err?.message || '')
  return /404/.test(msg) || /Unable to locate request/i.test(msg)
}

function normalizeOrderResponse(json) {
  const id = json?.id || json?.order_id || json?.numero || json?.uuid || null
  const paymentUrl = json?.payment_url || json?.pay_url || json?.url_pago || null
  return { id, paymentUrl, raw: json }
}

// Crea una orden/boleta en backend. Intenta nombres comunes de endpoint.
export async function createOrder(orderDraft) {
  const candidates = ['/ordenes', '/orden', '/orders', '/order', '/boletas', '/boleta']
  let lastErr
  for (const path of candidates) {
    try {
      const json = await postJson(path, orderDraft)
      return normalizeOrderResponse(json)
    } catch (err) {
      if (!isNotFound(err)) throw err
      lastErr = err
    }
  }
  throw lastErr
}

export async function getOrderById(id) {
  const candidates = [`/ordenes/${id}`, `/orden/${id}`, `/orders/${id}`, `/order/${id}`, `/boletas/${id}`, `/boleta/${id}`]
  let lastErr
  for (const path of candidates) {
    try {
      return await getJson(path)
    } catch (err) {
      if (!isNotFound(err)) throw err
      lastErr = err
    }
  }
  throw lastErr
}