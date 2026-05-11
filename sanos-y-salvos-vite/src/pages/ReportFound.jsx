import React, { useState } from 'react'
import { createPetReport } from '../services/petService'
import { useReports } from '../hooks/useReports'

export default function ReportFound() {
  const { create } = useReports()
  const [form, setForm] = useState(createPetReport('found'))
  const [submitting, setSubmitting] = useState(false)

  const handleChange = (e) => setForm(f => ({ ...f, [e.target.name]: e.target.value }))

  async function onSubmit(e) {
    e.preventDefault()
    if (!form.species || !form.location || !form.ownerName || !form.phone) {
      alert('Completa los campos obligatorios')
      return
    }
    setSubmitting(true)
    try {
      await create(form)
      alert('Reporte de mascota encontrada creado localmente.')
      setForm(createPetReport('found'))
    } catch (err) { alert(err.message || 'Error al crear reporte') }
    setSubmitting(false)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Reportar mascota encontrada</h2>
      <form onSubmit={onSubmit} className="grid gap-3 card p-6 rounded shadow">
        <div className="grid grid-cols-2 gap-3">
          <select name="species" value={form.species} onChange={handleChange} required className="p-2 border">
            <option value="">Selecciona especie</option>
            <option value="perro">Perro</option>
            <option value="gato">Gato</option>
            <option value="otro">Otro</option>
          </select>
          <input name="breed" placeholder="Raza" value={form.breed} onChange={handleChange} className="p-2 border" />
        </div>
        <div className="grid grid-cols-3 gap-3">
          <input name="color" placeholder="Color" value={form.color} onChange={handleChange} className="p-2 border" />
          <input name="size" placeholder="Tamaño" value={form.size} onChange={handleChange} className="p-2 border" />
          <input name="date" type="date" value={form.date.split('T')[0]} onChange={(e)=>setForm(f=>({...f,date:e.target.value}))} className="p-2 border" />
        </div>
        <textarea name="description" placeholder="Descripción física" value={form.description} onChange={handleChange} className="p-2 border text-neutral-300 bg-transparent" />
        <input name="location" placeholder="Lugar donde fue encontrada" value={form.location} onChange={handleChange} required className="p-2 border bg-transparent text-neutral-300" />
        <div className="grid grid-cols-3 gap-3">
          <input name="ownerName" placeholder="Tu nombre" value={form.ownerName} onChange={handleChange} required className="p-2 border" />
          <input name="phone" placeholder="Teléfono" value={form.phone} onChange={handleChange} required className="p-2 border" />
          <input name="email" placeholder="Email" value={form.email} onChange={handleChange} className="p-2 border" />
        </div>
        <div className="flex justify-end">
          <button type="submit" disabled={submitting} className="px-4 py-2 bg-blue-600 text-white rounded">Enviar</button>
        </div>
      </form>
    </div>
  )
}
