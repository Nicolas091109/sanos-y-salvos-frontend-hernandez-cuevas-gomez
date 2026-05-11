import api from './api'

export async function getReportingSummary(params = {}) {
  const response = await api.get('/api/reporting/summary', { params })
  return normalizeReportingSummary(response.data)
}

function normalizeReportingSummary(payload) {
  const source = payload?.data ?? payload ?? {}

  const metrics = Array.isArray(source.metrics)
    ? source.metrics
    : []

  const recentReports = Array.isArray(source.recentReports)
    ? source.recentReports
    : Array.isArray(source.items)
      ? source.items
      : []

  return {
    generatedAt: source.generatedAt || source.timestamp || new Date().toISOString(),
    title: source.title || 'Resumen de reportes',
    description: source.description || 'Datos consolidados desde ms-reporting.',
    metrics,
    recentReports,
  }
}