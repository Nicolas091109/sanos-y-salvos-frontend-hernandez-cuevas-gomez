import axiosInstance from '../api/axiosConfig';

const authService = {
  // Envía los datos al endpoint /auth/register del Gateway
  register: async (userData) => {
    try {
      // El Gateway redirigirá esto al Microservicio de Identidad
      const response = await axiosInstance.post('/auth/register', userData);
      return response.data;
    } catch (error) {
      // Manejo de errores para mostrar mensajes claros en el formulario
      throw error.response?.data || 'Error en el servidor al registrar';
    }
  },

  // Envía las credenciales y guarda el JWT en caso de éxito
  login: async (credentials) => {
    try {
      const response = await axiosInstance.post('/auth/login', credentials);
      
      // Almacenamos el token para mantener la sesión activa
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      throw error.response?.data || 'Correo o contraseña incorrectos';
    }
  },

  // Limpia el almacenamiento para cerrar la sesión
  logout: () => {
    localStorage.removeItem('token');
  }
};

export default authService;