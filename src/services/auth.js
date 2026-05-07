import api from './api'

export async function login(email, password) {
  const response = await api.post('/api/auth/login', { email, password })
  return response.data
}

export async function registerUser(payload) {
  const response = await api.post('/api/auth/register', payload)
  return response.data
}

export function saveSession(user, token) {
  const session = {
    id: user?.id || null,
    email: user?.email || '',
    rol: (user?.rol || user?.role || 'USER').toUpperCase(),
    nombre: user?.nombre || user?.name || '',
    token: token || '',
  }

  localStorage.setItem('currentUser', JSON.stringify(session))
  if (token) {
    localStorage.setItem('authToken', token)
  }
}

export function getCurrentUser() {
  try {
    const raw = localStorage.getItem('currentUser')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function clearSession() {
  localStorage.removeItem('currentUser')
  localStorage.removeItem('authToken')
}
