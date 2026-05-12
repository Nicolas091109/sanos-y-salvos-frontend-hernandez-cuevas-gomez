import React from 'react'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { mockReports } from '../mock/mockData'

// Fix default icon paths for leaflet in Vite
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
})

export default function MapView() {
  const center = [-33.445, -70.655]

  return (
    <div className="h-[600px] rounded overflow-hidden">
      <MapContainer center={center} zoom={13} className="h-full w-full">
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {mockReports.map(r => (
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
