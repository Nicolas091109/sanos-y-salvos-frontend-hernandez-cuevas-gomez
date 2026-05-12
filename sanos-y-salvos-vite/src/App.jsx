import React, { useEffect } from 'react'
import { Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom'
import Home from './pages/Home'
import ReportLost from './pages/ReportLost'
import ReportFound from './pages/ReportFound'
import ReportsList from './pages/ReportsList'
import PetDetail from './pages/PetDetail'
import MapView from './pages/MapView'
import Admin from './pages/Admin'
import Login from './pages/Login'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

// Componente para proteger rutas
const PrivateRoute = ({ children }) => {
  const user = localStorage.getItem('user');
  return user ? children : <Navigate to="/login" replace />;
};

export default function App() {
  const location = useLocation();
  const navigate = useNavigate();
  const isLoginPage = location.pathname === '/login';

  useEffect(() => {
    const user = localStorage.getItem('user');
    // Si no hay usuario y no estamos en login, redirigir a login
    if (!user && !isLoginPage) {
      navigate('/login');
    }
  }, [location, navigate, isLoginPage]);

  return (
    <div className="flex min-h-screen flex-col">
      {!isLoginPage && <Navbar />}
      <main className="flex-1">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<PrivateRoute><Home /></PrivateRoute>} />
          <Route path="/reportar/perdida" element={<PrivateRoute><ReportLost /></PrivateRoute>} />
          <Route path="/reportar/encontrada" element={<PrivateRoute><ReportFound /></PrivateRoute>} />
          <Route path="/reportes" element={<PrivateRoute><ReportsList /></PrivateRoute>} />
          <Route path="/reportes/:id" element={<PrivateRoute><PetDetail /></PrivateRoute>} />
          <Route path="/mapa" element={<PrivateRoute><MapView /></PrivateRoute>} />
          <Route path="/admin" element={<PrivateRoute><Admin /></PrivateRoute>} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
      {!isLoginPage && <Footer />}
    </div>
  )
}
