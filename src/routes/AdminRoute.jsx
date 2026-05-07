import { Navigate } from 'react-router-dom'
import { getCurrentUser } from '../services/auth'

export default function AdminRoute({ children }) {
  const currentUser = getCurrentUser()

  if (!currentUser) {
    return <Navigate to="/login" replace />
  }

  if (currentUser.rol !== 'ADMIN') {
    return <Navigate to="/" replace />
  }

  return children
}
