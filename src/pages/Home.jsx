import { Link } from 'react-router-dom'
import { clearSession, getCurrentUser } from '../services/auth'

export default function Home() {
  const currentUser = getCurrentUser()
  const isAdmin = currentUser?.rol === 'ADMIN'

  const handleLogout = () => {
    clearSession()
    window.location.reload()
  }

  return (
    <div className="min-h-screen bg-neutral-950 text-white">
      <header className="border-b border-neutral-800 bg-neutral-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
          <div>
            <p className="text-sm uppercase tracking-[0.35em] text-purple-400">Sanos y Salvos</p>
            <h1 className="mt-2 text-xl font-semibold">Portal de usuarios</h1>
          </div>

          <div className="flex items-center gap-3">
            {currentUser ? (
              <>
                <span className="hidden rounded-full border border-purple-500/30 bg-purple-500/10 px-4 py-2 text-sm font-medium text-purple-200 sm:inline-flex">
                  {`Hola ${currentUser.nombre || currentUser.email}`}
                </span>
                <button
                  type="button"
                  onClick={handleLogout}
                  className="rounded-2xl border border-neutral-700 px-4 py-2 text-sm text-neutral-200 transition hover:border-neutral-500 hover:text-white"
                >
                  Cerrar sesión
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-2xl border border-neutral-700 px-4 py-2 text-sm text-neutral-200 transition hover:border-neutral-500 hover:text-white"
                >
                  Iniciar sesión
                </Link>
                <Link
                  to="/register"
                  className="rounded-2xl bg-purple-500 px-4 py-2 text-sm font-semibold text-white transition hover:bg-purple-400"
                >
                  Crear cuenta
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      <main className="mx-auto flex max-w-6xl flex-col items-start px-4 py-16">
        <div className="max-w-3xl rounded-[2rem] border border-neutral-800 bg-neutral-900 p-8 shadow-panel sm:p-12">
          <p className="text-sm uppercase tracking-[0.35em] text-purple-400">Comunidad conectada</p>
          <h2 className="mt-5 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
            Acceso simple para usuarios
          </h2>
          <p className="mt-5 text-base leading-8 text-neutral-400">
            Esta versión queda enfocada únicamente en registro e inicio de sesión para usuarios normales.
            El dashboard visual ya existe en el proyecto y ahora puede abrirse si la cuenta autenticada tiene rol administrador.
          </p>

          <div className="mt-8 flex flex-wrap gap-4">
            {currentUser ? (
              <>
                <div className="rounded-2xl border border-emerald-500/30 bg-emerald-500/10 px-5 py-4 text-sm text-emerald-200">
                  Sesión activa con {currentUser.email}
                </div>
                {isAdmin ? (
                  <Link
                    to="/admin"
                    className="rounded-2xl bg-purple-500 px-5 py-3 font-semibold text-white transition hover:bg-purple-400"
                  >
                    Ir al panel admin
                  </Link>
                ) : null}
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="rounded-2xl bg-purple-500 px-5 py-3 font-semibold text-white transition hover:bg-purple-400"
                >
                  Ingresar ahora
                </Link>
                <Link
                  to="/register"
                  className="rounded-2xl border border-neutral-700 px-5 py-3 font-semibold text-neutral-200 transition hover:border-neutral-500 hover:text-white"
                >
                  Registrarme
                </Link>
              </>
            )}
          </div>
        </div>
      </main>
    </div>
  )
}
