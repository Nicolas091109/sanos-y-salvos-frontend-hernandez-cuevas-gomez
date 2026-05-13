import api from './api'

export function mapLocationFromBackend(location = {}) {
  return {
    id: location.id,
    lat: Number(location.latitud),
    lng: Number(location.longitud),
    location: location.nombreSector || '',
    fechaRegistro: location.fechaRegistro || null,
  }
}

export function mapLocationToBackend(location = {}) {
  return {
    latitud: Number(location.lat),
    longitud: Number(location.lng),
    nombreSector: location.location,
  }
}

export async function listLocations() {
  const response = await api.get('/geo/historial')
  return response.data.map(mapLocationFromBackend)
}

export async function createLocation(location) {
  const response = await api.post('/geo/ubicar', mapLocationToBackend(location))
  return mapLocationFromBackend(response.data)
}
