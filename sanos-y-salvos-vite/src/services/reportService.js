import api from './api'
import { getCurrentUser } from './authService'
import { createLocation, listLocations } from './geolocationService'

const STATUS_TO_BACKEND = {
  active: 'ACTIVO',
  resolved: 'RESUELTO',
  archived: 'ARCHIVADO',
}

const STATUS_FROM_BACKEND = {
  ACTIVO: 'active',
  RESUELTO: 'resolved',
  ARCHIVADO: 'archived',
}

function mapStatusToBackend(status) {
  return STATUS_TO_BACKEND[status] || status || 'ACTIVO'
}

function mapStatusFromBackend(status) {
  return STATUS_FROM_BACKEND[status] || 'active'
}

function buildLocationsIndex(locations = []) {
  return locations.reduce((acc, location) => {
    acc[location.id] = location
    return acc
  }, {})
}

export function mapReportToBackend(report, ubicacionId) {
  const currentUser = getCurrentUser()

  return {
    tipoReporte: report.type,
    nombreMascota: report.name,
    tipoAnimal: report.species,
    raza: report.breed,
    color: report.color,
    tamano: report.size,
    descripcion: report.description,
    fechaReporte: report.date,
    ubicacionId,
    usuarioId: currentUser?.id ?? null,
    nombreContacto: report.ownerName,
    telefonoContacto: report.phone,
    emailContacto: report.email,
    fotoUrl: report.photo,
    estado: mapStatusToBackend(report.status),
  }
}

export function mapReportFromBackend(report = {}, locationsIndex = {}) {
  const location = locationsIndex[report.ubicacionId] || {}

  return {
    id: report.id,
    type: report.tipoReporte || 'lost',
    name: report.nombreMascota || '',
    species: report.tipoAnimal || '',
    breed: report.raza || '',
    color: report.color || '',
    size: report.tamano || '',
    description: report.descripcion || '',
    date: report.fechaReporte || '',
    location: location.location || '',
    lat: Number.isFinite(location.lat) ? location.lat : null,
    lng: Number.isFinite(location.lng) ? location.lng : null,
    photo: report.fotoUrl || '',
    ownerName: report.nombreContacto || '',
    phone: report.telefonoContacto || '',
    email: report.emailContacto || '',
    status: mapStatusFromBackend(report.estado),
    ubicacionId: report.ubicacionId,
    usuarioId: report.usuarioId,
  }
}

export async function listReports() {
  const [reportsResponse, locations] = await Promise.all([
    api.get('/reportes'),
    listLocations(),
  ])
  const locationsIndex = buildLocationsIndex(locations)
  return reportsResponse.data.map((report) => mapReportFromBackend(report, locationsIndex))
}

export async function getReport(id) {
  const [reportResponse, locations] = await Promise.all([
    api.get(`/reportes/${id}`),
    listLocations(),
  ])
  const locationsIndex = buildLocationsIndex(locations)
  return mapReportFromBackend(reportResponse.data, locationsIndex)
}

export async function createReport(report) {
  const location = await createLocation({
    lat: report.lat,
    lng: report.lng,
    location: report.location,
  })

  const response = await api.post('/reportes', mapReportToBackend(report, location.id))
  return mapReportFromBackend(response.data, buildLocationsIndex([location]))
}

export async function updateReport(id, reportPatch) {
  let locationsIndex = {}

  if (
    Object.prototype.hasOwnProperty.call(reportPatch, 'lat') ||
    Object.prototype.hasOwnProperty.call(reportPatch, 'lng') ||
    Object.prototype.hasOwnProperty.call(reportPatch, 'location')
  ) {
    const newLocation = await createLocation({
      lat: reportPatch.lat,
      lng: reportPatch.lng,
      location: reportPatch.location,
    })
    reportPatch = { ...reportPatch, ubicacionId: newLocation.id }
    locationsIndex = buildLocationsIndex([newLocation])
  } else if (reportPatch.ubicacionId) {
    const locations = await listLocations()
    locationsIndex = buildLocationsIndex(locations)
  }

  const response = await api.put(`/reportes/${id}`, {
    tipoReporte: reportPatch.type,
    nombreMascota: reportPatch.name,
    tipoAnimal: reportPatch.species,
    raza: reportPatch.breed,
    color: reportPatch.color,
    tamano: reportPatch.size,
    descripcion: reportPatch.description,
    fechaReporte: reportPatch.date,
    ubicacionId: reportPatch.ubicacionId,
    usuarioId: reportPatch.usuarioId,
    nombreContacto: reportPatch.ownerName,
    telefonoContacto: reportPatch.phone,
    emailContacto: reportPatch.email,
    fotoUrl: reportPatch.photo,
    estado: reportPatch.status ? mapStatusToBackend(reportPatch.status) : undefined,
  })

  if (!Object.keys(locationsIndex).length) {
    const locations = await listLocations()
    locationsIndex = buildLocationsIndex(locations)
  }

  return mapReportFromBackend(response.data, locationsIndex)
}

export async function deleteReport(id) {
  await api.delete(`/reportes/${id}`)
  return true
}
