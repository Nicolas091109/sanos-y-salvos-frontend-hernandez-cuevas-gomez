import api, { TOKEN_KEY, USER_KEY } from './api'

function getStorage(storageType = 'local') {
  return storageType === 'session' ? sessionStorage : localStorage
}

function normalizeUser(payload = {}) {
  if (payload.user) {
    return payload.user
  }

  if (payload.usuario) {
    return {
      id: payload.usuario.id,
      name: payload.usuario.nombre,
      email: payload.usuario.email,
      role: payload.usuario.rol,
    }
  }

  return null
}

export function saveSession({ token, user }, storageType = 'local') {
  clearSession()

  const storage = getStorage(storageType)
  storage.setItem(TOKEN_KEY, token)
  storage.setItem(USER_KEY, JSON.stringify(user))
}

export function clearSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
  sessionStorage.removeItem(TOKEN_KEY)
  sessionStorage.removeItem(USER_KEY)
}

export function getToken() {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY)
}

export function getCurrentUser() {
  const rawUser = localStorage.getItem(USER_KEY) || sessionStorage.getItem(USER_KEY)
  if (!rawUser) {
    return null
  }

  try {
    return JSON.parse(rawUser)
  } catch {
    return null
  }
}

export function isAuthenticated() {
  return Boolean(getToken() && getCurrentUser())
}

export async function login({ email, password }, storageType = 'local') {
  const response = await api.post('/auth/login', { email, password })
  const user = normalizeUser(response.data)
  const token = response.data?.token

  if (!token || !user) {
    throw new Error('La respuesta del login no contiene token o usuario.')
  }

  saveSession({ token, user }, storageType)
  return { token, user }
}

export async function register({ email, password, name }) {
  const response = await api.post('/auth/register', {
    email,
    password,
    nombre: name,
    rol: 'USER',
  })

  const user = response.data
  return {
    id: user.id,
    name: user.nombre,
    email: user.email,
    role: user.rol,
  }
}
