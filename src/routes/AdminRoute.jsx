import { Navigate, Outlet } from 'react-router-dom'
import { getCurrentUser } from '../services/auth'

export default function AdminRoute({ children }) {
  const currentUser = getCurrentUser()
  const role = String(currentUser?.rol || currentUser?.role || '').toUpperCase()

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  if (role !== 'ADMIN') {
    return <Navigate to="/" replace />
  }

  return children || <Outlet />
}
