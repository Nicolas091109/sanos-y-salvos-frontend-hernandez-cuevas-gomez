import api from './api'

export async function listReports(params = {}) {
  // En producción usaría: return api.get('/reports', { params })
  // Mientras tanto, será sobreescrito por mockData si se usa localmente.
  const res = await api.get('/reports', { params })
  return res.data
}

export async function getReport(id) {
  const res = await api.get(`/reports/${id}`)
  return res.data
}

export async function createReport(payload) {
  const res = await api.post('/reports', payload)
  return res.data
}

export async function updateReport(id, payload) {
  const res = await api.put(`/reports/${id}`, payload)
  return res.data
}

export async function deleteReport(id) {
  const res = await api.delete(`/reports/${id}`)
  return res.data
}
