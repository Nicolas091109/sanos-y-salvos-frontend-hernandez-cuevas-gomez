import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import ReportLost from './pages/ReportLost'
import ReportFound from './pages/ReportFound'
import ReportsList from './pages/ReportsList'
import PetDetail from './pages/PetDetail'
import MapView from './pages/MapView'
import Admin from './pages/Admin'
import NotFound from './pages/NotFound'
import Navbar from './components/Navbar'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1 container mx-auto px-4 py-8">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/reportar/perdida" element={<ReportLost />} />
          <Route path="/reportar/encontrada" element={<ReportFound />} />
          <Route path="/reportes" element={<ReportsList />} />
          <Route path="/reportes/:id" element={<PetDetail />} />
          <Route path="/mapa" element={<MapView />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/404" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/404" replace />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}
