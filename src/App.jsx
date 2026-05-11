import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import BlankLayout from './layouts/BlankLayout'
import MainLayout from './layouts/MainLayout'
import DashboardLayout from './dashboard/DashboardLayout'
import Home from './pages/Home'
import About from './pages/About'
import Blogs from './pages/Blogs'
import Blog1 from './pages/Blog1'
import Blog2 from './pages/Blog2'
import Contacto from './pages/Contacto'
import Productos from './pages/Productos'
import Carrito from './pages/Carrito'
import Checkout from './pages/Checkout'
import Perfil from './pages/Perfil'
import EditarPerfil from './pages/EditarPerfil'
import MisPedidos from './pages/MisPedidos'
import Pago from './pages/Pago'
import Boleta from './pages/Boleta'
import BoletaDetalle from './pages/BoletaDetalle'
import Login from './pages/Login'
import Reportes from './pages/Reportes'
import Register from './pages/Register'
import AdminRoute from './routes/AdminRoute'
import PrivateRoute from './routes/PrivateRoute'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index element={<Home />} />
          <Route path="about" element={<About />} />
          <Route path="blogs" element={<Blogs />} />
          <Route path="blogs/:id" element={<Blog1 />} />
          <Route path="blog-2" element={<Blog2 />} />
          <Route path="contacto" element={<Contacto />} />
          <Route path="productos" element={<Productos />} />

          <Route element={<PrivateRoute />}>
            <Route path="carrito" element={<Carrito />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="perfil" element={<Perfil />} />
            <Route path="perfil/editar" element={<EditarPerfil />} />
            <Route path="mis-pedidos" element={<MisPedidos />} />
            <Route path="pago" element={<Pago />} />
            <Route path="boleta" element={<Boleta />} />
            <Route path="boleta/:id" element={<BoletaDetalle />} />
          </Route>
        </Route>

        <Route element={<BlankLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        <Route
          path="/admin"
          element={
            <AdminRoute>
              <DashboardLayout />
            </AdminRoute>
          }
        />
        <Route
          path="/admin/reportes"
          element={
            <AdminRoute>
              <Reportes />
            </AdminRoute>
          }
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  )
}
