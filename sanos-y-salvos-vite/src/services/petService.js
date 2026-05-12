import api from './api'

export async function uploadPhoto(file) {
  const fd = new FormData()
  fd.append('file', file)
  const res = await api.post('/upload', fd, { headers: { 'Content-Type': 'multipart/form-data' } })
  return res.data
}

export function createPetReport(type = 'lost') {
  // Factory que crea objeto base para reporte
  return {
    type, // 'lost' | 'found'
    name: '',
    species: '',
    breed: '',
    color: '',
    size: '',
    description: '',
    date: new Date().toISOString(),
    location: '',
    photo: '',
    ownerName: '',
    phone: '',
    email: '',
    status: 'active',
  }
}
