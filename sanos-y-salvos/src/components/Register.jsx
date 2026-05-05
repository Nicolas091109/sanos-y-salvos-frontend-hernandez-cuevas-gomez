import { useForm } from 'react-hook-form';
import authService from '../services/authService';

const Register = () => {
  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await authService.register({
        nombre: data.nombre,
        email: data.email,
        password: data.password
      });
      alert("¡Registro exitoso!");
    } catch (error) {
      alert(error.message || "Error al registrar");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8">
        <h2 className="text-2xl font-bold text-center text-blue-600 mb-6">Únete a Sanos y Salvos</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input {...register("nombre", { required: "Obligatorio" })} className="w-full border p-2 rounded" />
            {errors.nombre && <p className="text-red-500 text-xs">{errors.nombre.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Email</label>
            <input type="email" {...register("email", { required: "Obligatorio" })} className="w-full border p-2 rounded" />
            {errors.email && <p className="text-red-500 text-xs">{errors.email.message}</p>}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input type="password" {...register("password", { required: "Obligatorio" })} className="w-full border p-2 rounded" />
          </div>
          <button type="submit" className="w-full bg-blue-600 text-white py-2 rounded">Registrarse</button>
        </form>
      </div>
    </div>
  );
};

export default Register; // ESTA LÍNEA ES LA QUE TE FALTA