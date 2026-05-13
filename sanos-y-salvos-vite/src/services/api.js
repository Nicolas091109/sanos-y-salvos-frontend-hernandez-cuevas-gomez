import axios from 'axios'

export const API_BASE = 'http://localhost:8080/api'
export const TOKEN_KEY = 'sys_token'
export const USER_KEY = 'user'

function getStoredToken() {
  return localStorage.getItem(TOKEN_KEY) || sessionStorage.getItem(TOKEN_KEY)
}

function clearStoredSession() {
  localStorage.removeItem(TOKEN_KEY)
  localStorage.removeItem(USER_KEY)
  sessionStorage.removeItem(TOKEN_KEY)
  sessionStorage.removeItem(USER_KEY)
}

const api = axios.create({
  baseURL: API_BASE,
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.request.use((config) => {
  const token = getStoredToken()
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status
    let message = error.response?.data?.message || error.message || 'Error inesperado'

    if (status === 401) {
      message = 'Tu sesion expiro o las credenciales son invalidas.'
      clearStoredSession()
      if (window.location.pathname !== '/login') {
        window.location.assign('/login')
      }
    } else if (status === 403) {
      message = 'No tienes permisos para realizar esta accion.'
    } else if (status === 500) {
      message = 'El servidor encontro un error interno.'
    } else if (!status) {
      message = 'No fue posible conectar con el backend.'
    }

    const normalizedError = new Error(message)
    normalizedError.status = status
    normalizedError.original = error
    return Promise.reject(normalizedError)
  },
)

export default api
