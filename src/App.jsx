import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import DashboardLayout from './dashboard/DashboardLayout'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import AdminRoute from './routes/AdminRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/admin"
          element={
            <AdminRoute>
              <DashboardLayout />
            </AdminRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
