import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { useReports } from '../hooks/useReports'

// Fix default icon paths for leaflet in Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

export default function MapView() {
  const { reports, loading, error } = useReports()
  const points = reports.filter((report) => Number.isFinite(report.lat) && Number.isFinite(report.lng))
  const center = points.length ? [points[0].lat, points[0].lng] : [-33.445, -70.655]

  if (loading) {
    return <div className="p-6">Cargando ubicaciones...</div>
  }

  if (error) {
    return <div className="p-6 text-red-400">{error.message}</div>
  }

  return (
    <div className="h-[600px] rounded overflow-hidden">
      <MapContainer center={center} zoom={13} className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {points.map(r => (
          <Marker key={r.id} position={[r.lat, r.lng]}>
            <Popup>
              <div className="w-48">
                <img src={r.photo} alt="" className="w-full h-24 object-cover mb-2" />
                <div className="font-semibold">{r.name || (r.type==='found'?'Encontrada':'Perdida')}</div>
                <div className="text-sm text-neutral-300">{r.species} · {r.location}</div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  )
}
