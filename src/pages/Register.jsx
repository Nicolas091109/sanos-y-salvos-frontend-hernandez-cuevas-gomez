import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { registerUser } from '../services/auth'

const registerSchema = z
  .object({
    nombre: z.string().min(2, 'Ingresa tu nombre completo.'),
    email: z.email('Ingresa un correo valido.'),
    password: z.string().min(6, 'La contraseña debe tener al menos 6 caracteres.'),
    confirmPassword: z.string().min(1, 'Confirma tu contraseña.'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    path: ['confirmPassword'],
    message: 'Las contraseñas no coinciden.',
  })

export default function Register() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      nombre: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const onSubmit = async (data) => {
    await registerUser({
      nombre: data.nombre,
      email: data.email,
      password: data.password,
      rol: 'USER',
    })

    alert('Registro exitoso. Ahora puedes iniciar sesión.')
    navigate('/login')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-neutral-700 bg-neutral-900 p-8 shadow-panel">
        <p className="text-sm uppercase tracking-[0.35em] text-purple-400">Sanos y Salvos</p>
        <h1 className="mt-4 text-3xl font-semibold text-white">Crear cuenta</h1>
        <p className="mt-2 text-sm leading-6 text-neutral-400">
          Registra tu usuario para acceder a la plataforma.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
          <div>
            <label htmlFor="nombre" className="mb-2 block text-sm font-medium text-neutral-200">
              Nombre completo
            </label>
            <input
              id="nombre"
              type="text"
              {...register('nombre')}
              className="w-full rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-white outline-none transition focus:border-purple-500"
              placeholder="Tu nombre"
            />
            {errors.nombre ? <p className="mt-2 text-sm text-rose-400">{errors.nombre.message}</p> : null}
          </div>

          <div>
            <label htmlFor="email" className="mb-2 block text-sm font-medium text-neutral-200">
              Correo electrónico
            </label>
            <input
              id="email"
              type="email"
              {...register('email')}
              className="w-full rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-white outline-none transition focus:border-purple-500"
              placeholder="correo@ejemplo.com"
            />
            {errors.email ? <p className="mt-2 text-sm text-rose-400">{errors.email.message}</p> : null}
          </div>

          <div>
            <label htmlFor="password" className="mb-2 block text-sm font-medium text-neutral-200">
              Contraseña
            </label>
            <input
              id="password"
              type="password"
              {...register('password')}
              className="w-full rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-white outline-none transition focus:border-purple-500"
              placeholder="Crea una contraseña"
            />
            {errors.password ? <p className="mt-2 text-sm text-rose-400">{errors.password.message}</p> : null}
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-2 block text-sm font-medium text-neutral-200">
              Confirmar contraseña
            </label>
            <input
              id="confirmPassword"
              type="password"
              {...register('confirmPassword')}
              className="w-full rounded-2xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-white outline-none transition focus:border-purple-500"
              placeholder="Repite tu contraseña"
            />
            {errors.confirmPassword ? (
              <p className="mt-2 text-sm text-rose-400">{errors.confirmPassword.message}</p>
            ) : null}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-purple-500 px-4 py-3 font-semibold text-white transition hover:bg-purple-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Creando cuenta...' : 'Registrarme'}
          </button>
        </form>

        <p className="mt-6 text-sm text-neutral-400">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="font-semibold text-purple-400 hover:text-purple-300">
            Iniciar sesión
          </Link>
        </p>
      </div>
    </div>
  )
}
