import React, { useState } from 'react'
import { createPetReport } from '../services/petService'
import { useReports } from '../hooks/useReports'

export default function ReportLost() {
  const { create } = useReports()
  const [form, setForm] = useState(() => ({
    ...createPetReport('lost'),
    lat: -33.445,
    lng: -70.655,
  }))
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  async function onSubmit(e) {
    e.preventDefault()
    // validaciones simples
    if (!form.species || !form.location || !form.ownerName || !form.phone) {
      alert('Completa los campos obligatorios')
      return
    }
    setSubmitting(true)
    try {
      await create(form)
      alert('Reporte enviado correctamente al backend.')
      setForm({
        ...createPetReport('lost'),
        lat: -33.445,
        lng: -70.655,
      })
    } catch (err) { alert(err.message || 'Error al crear reporte') }
    setSubmitting(false)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Reportar mascota perdida</h2>
      <form onSubmit={onSubmit} className="grid gap-3 card p-6 rounded shadow">
        <div className="grid grid-cols-2 gap-3">
          <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} className="p-2 border" />
          <select name="species" value={form.species} onChange={handleChange} required className="p-2 border">
            <option value="">Selecciona especie</option>
            <option value="perro">Perro</option>
            <option value="gato">Gato</option>
            <option value="otro">Otro</option>
          </select>
        </div>
        <div className="grid grid-cols-3 gap-3">
          <input name="breed" placeholder="Raza" value={form.breed} onChange={handleChange} className="p-2 border" />
          <input name="color" placeholder="Color" value={form.color} onChange={handleChange} className="p-2 border" />
          <input name="size" placeholder="Tamaño" value={form.size} onChange={handleChange} className="p-2 border" />
        </div>
        <textarea name="description" placeholder="Descripción" value={form.description} onChange={handleChange} className="p-2 border bg-transparent text-neutral-300" />
        <div className="grid grid-cols-2 gap-3">
          <input name="date" type="date" value={form.date.split('T')[0]} onChange={(e)=>setForm(f=>({...f,date:e.target.value}))} className="p-2 border" />
          <input name="location" placeholder="Dirección aproximada" value={form.location} onChange={handleChange} required className="p-2 border" />
        </div>
        <div className="grid grid-cols-2 gap-3">
          <input name="lat" type="number" step="any" placeholder="Latitud" value={form.lat} onChange={handleChange} className="p-2 border" />
          <input name="lng" type="number" step="any" placeholder="Longitud" value={form.lng} onChange={handleChange} className="p-2 border" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <input name="ownerName" placeholder="Nombre del dueño" value={form.ownerName} onChange={handleChange} required className="p-2 border bg-transparent text-neutral-300" />
          <input name="phone" placeholder="Teléfono" value={form.phone} onChange={handleChange} required className="p-2 border bg-transparent text-neutral-300" />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="p-2 border bg-transparent text-neutral-300" />
        </div>
        <div className="flex justify-end">
          <button type="submit" disabled={submitting} className="px-4 py-2 bg-blue-600 text-white rounded">Enviar</button>
        </div>
      </form>
    </div>
  )
}
