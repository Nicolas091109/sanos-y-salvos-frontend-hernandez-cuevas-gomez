import { Navigate, Outlet } from 'react-router-dom'
import { getCurrentUser } from '../services/auth'

export default function PrivateRoute({ children }) {
  const currentUser = getCurrentUser()

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  return children || <Outlet />
}