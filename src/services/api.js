import axios from 'axios'

const API_BASE_URL = (import.meta.env?.VITE_API_BASE_URL || 'http://localhost:8080').toString()

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('authToken')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const message =
      error.response?.data?.message ||
      error.response?.data?.detail ||
      (typeof error.response?.data === 'string' ? error.response.data : '') ||
      error.message ||
      'Ocurrió un error inesperado.'

    return Promise.reject(new Error(message))
  }
)

export default api
