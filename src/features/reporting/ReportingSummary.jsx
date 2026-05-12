import { useEffect, useState } from 'react'
import { getReportingSummary } from '../../services/reporting'

const fallbackMetrics = [
  { label: 'Ventas totales', value: '0', hint: 'Sin datos disponibles' },
  { label: 'Pedidos procesados', value: '0', hint: 'Sin datos disponibles' },
  { label: 'Usuarios activos', value: '0', hint: 'Sin datos disponibles' },
]

export default function ReportingSummary() {
  const [summary, setSummary] = useState({
    generatedAt: null,
    title: 'Cargando reportes...',
    description: 'Consultando el microservicio de reportes.',
    metrics: [],
    recentReports: [],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let alive = true

    async function loadSummary() {
      try {
        setLoading(true)
        const data = await getReportingSummary()
        if (!alive) return
        setSummary(data)
        setError(null)
      } catch (err) {
        if (!alive) return
        setError(err.message || 'No se pudo cargar el resumen de reportes.')
      } finally {
        if (alive) setLoading(false)
      }
    }

    loadSummary()

    return () => {
      alive = false
    }
  }, [])

  const metrics = summary.metrics.length > 0 ? summary.metrics : fallbackMetrics

  return (
    <section className="rounded-3xl border border-neutral-200 bg-white p-6 shadow-sm">
      <div className="flex flex-col gap-2 border-b border-neutral-200 pb-4">
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-neutral-500">ms-reporting</p>
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-2xl font-semibold text-neutral-900">{summary.title}</h2>
            <p className="mt-1 text-sm text-neutral-600">{summary.description}</p>
          </div>
          <p className="text-xs text-neutral-500">
            Actualizado: {summary.generatedAt ? new Date(summary.generatedAt).toLocaleString('es-CL') : 'pendiente'}
          </p>
        </div>
      </div>

      {loading ? <p className="py-6 text-sm text-neutral-600">Cargando información de reportes...</p> : null}
      {error ? <p className="py-6 text-sm font-medium text-red-600">{error}</p> : null}

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        {metrics.map((metric) => (
          <article key={metric.label} className="rounded-2xl border border-neutral-200 bg-neutral-50 p-4">
            <p className="text-sm font-medium text-neutral-600">{metric.label}</p>
            <p className="mt-3 text-3xl font-semibold text-neutral-900">{metric.value}</p>
            {metric.hint ? <p className="mt-2 text-xs text-neutral-500">{metric.hint}</p> : null}
          </article>
        ))}
      </div>

      <div className="mt-8 overflow-hidden rounded-2xl border border-neutral-200">
        <table className="min-w-full divide-y divide-neutral-200">
          <thead className="bg-neutral-50">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">Reporte</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">Estado</th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-[0.22em] text-neutral-500">Fecha</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-neutral-200 bg-white">
            {summary.recentReports.length > 0 ? summary.recentReports.map((item, index) => (
              <tr key={item.id || item.name || index}>
                <td className="px-4 py-3 text-sm text-neutral-900">{item.name || item.title || `Reporte ${index + 1}`}</td>
                <td className="px-4 py-3 text-sm text-neutral-600">{item.status || item.state || 'Disponible'}</td>
                <td className="px-4 py-3 text-sm text-neutral-600">
                  {item.createdAt || item.date || item.generatedAt
                    ? new Date(item.createdAt || item.date || item.generatedAt).toLocaleDateString('es-CL')
                    : 'Sin fecha'}
                </td>
              </tr>
            )) : (
              <tr>
                <td className="px-4 py-5 text-sm text-neutral-500" colSpan={3}>
                  No hay reportes recientes para mostrar.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  )
}