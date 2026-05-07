import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { z } from 'zod'
import { login as authLogin, saveSession } from '../services/auth'

const loginSchema = z.object({
  email: z.email('Ingresa un correo valido.'),
  password: z.string().min(1, 'La contraseña es obligatoria.'),
})

export default function Login() {
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })

  const onSubmit = async (data) => {
    const response = await authLogin(data.email, data.password)
    saveSession(response.usuario, response.token)
    const userRole = (response.usuario?.rol || 'USER').toUpperCase()
    navigate(userRole === 'ADMIN' ? '/admin' : '/')
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-neutral-950 px-4 py-10">
      <div className="w-full max-w-md rounded-3xl border border-neutral-700 bg-neutral-900 p-8 shadow-panel">
        <p className="text-sm uppercase tracking-[0.35em] text-purple-400">Sanos y Salvos</p>
        <h1 className="mt-4 text-3xl font-semibold text-white">Iniciar sesión</h1>
        <p className="mt-2 text-sm leading-6 text-neutral-400">
          Entra con tu cuenta para acceder a tu perfil de usuario.
        </p>

        <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-5">
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
              placeholder="Tu contraseña"
            />
            {errors.password ? <p className="mt-2 text-sm text-rose-400">{errors.password.message}</p> : null}
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full rounded-2xl bg-purple-500 px-4 py-3 font-semibold text-white transition hover:bg-purple-400 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {isSubmitting ? 'Ingresando...' : 'Entrar'}
          </button>
        </form>

        <p className="mt-6 text-sm text-neutral-400">
          ¿No tienes cuenta?{' '}
          <Link to="/register" className="font-semibold text-purple-400 hover:text-purple-300">
            Crear cuenta
          </Link>
        </p>
      </div>
    </div>
  )
}
