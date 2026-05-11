import { useEffect, useState } from 'react'
import * as reportService from '../services/reportService'
import { mockReports } from '../mock/mockData'

const STORAGE_KEY = 'syss_reports_v1'

export function useReports() {
  const [reports, setReports] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : mockReports.slice()
    } catch {
      return mockReports.slice()
    }
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    // Intentamos sincronizar con backend; si falla usamos local
    let mounted = true
    ;(async () => {
      setLoading(true)
      try {
        const remote = await reportService.listReports()
        if (mounted && Array.isArray(remote)) {
          setReports(remote)
          localStorage.setItem(STORAGE_KEY, JSON.stringify(remote))
        }
      } catch {
        // fallback: ya tenemos datos desde localStorage o mock
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [])

  const saveLocal = (next) => {
    setReports(next)
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)) } catch { void 0 }
  }

  const create = async (payload) => {
    try {
      const created = await reportService.createReport(payload).catch(() => ({ ...payload, id: `r_${Date.now()}` }))
      const next = [created, ...reports]
      saveLocal(next)
      return created
    } catch (e) { throw e }
  }

  const update = async (id, patch) => {
    try {
      const updated = await reportService.updateReport(id, patch).catch(() => ({ ...patch, id }))
      const next = reports.map(r => (r.id === id ? { ...r, ...updated } : r))
      saveLocal(next)
      return updated
    } catch (e) { throw e }
  }

  const remove = async (id) => {
    try {
      await reportService.deleteReport(id).catch(() => true)
      const next = reports.filter(r => r.id !== id)
      saveLocal(next)
      return true
    } catch (e) { throw e }
  }

  const getById = (id) => reports.find(r => String(r.id) === String(id))

  return { reports, loading, error, create, update, remove, getById }
}
