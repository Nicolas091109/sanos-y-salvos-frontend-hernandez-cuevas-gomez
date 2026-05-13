import { useEffect, useState } from 'react'
import * as reportService from '../services/reportService'

export function useReports() {
  const [reports, setReports] = useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  useEffect(() => {
    let mounted = true
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const remote = await reportService.listReports()
        if (mounted) {
          setReports(Array.isArray(remote) ? remote : [])
        }
      } catch (err) {
        if (mounted) {
          setError(err)
        }
      } finally {
        if (mounted) setLoading(false)
      }
    })()
    return () => { mounted = false }
  }, [])

  const create = async (payload) => {
    const created = await reportService.createReport(payload)
    setReports((current) => [created, ...current])
    return created
  }

  const update = async (id, patch) => {
    const updated = await reportService.updateReport(id, patch)
    setReports((current) => current.map((report) => (report.id === id ? { ...report, ...updated } : report)))
    return updated
  }

  const remove = async (id) => {
    await reportService.deleteReport(id)
    setReports((current) => current.filter((report) => report.id !== id))
    return true
  }

  const getById = (id) => reports.find(r => String(r.id) === String(id))

  return { reports, loading, error, create, update, remove, getById }
}
