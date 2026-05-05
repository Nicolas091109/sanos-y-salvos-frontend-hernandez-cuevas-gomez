import axios from 'axios';

// El puerto 8080 es donde está corriendo tu API Gateway
const API_BASE_URL = 'http://localhost:8081/api/v1';

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Este interceptor es clave para la Seguridad Perimetral mencionada en tu informe
// Añade el token JWT automáticamente a cada petición si el usuario ya se logueó
axiosInstance.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;