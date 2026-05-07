import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { getCurrentUser, updateLocalUser } from '../services/auth'

export default function EditarPerfil() {
  const [form, setForm] = useState({ nombre: '', email: '', telefono: '', region: '', comuna: '' })
  const [saving, setSaving] = useState(false)
  const navigate = useNavigate()

  // Mapa de comunas por región (igual al utilizado en Register.jsx)
  const comunasPorRegion = {
    arica: ['Arica', 'Camarones', 'Putre', 'General Lagos'],
    tarapaca: ['Iquique', 'Alto Hospicio', 'Pozo Almonte', 'Camiña', 'Colchane', 'Huara', 'Pica'],
    antofagasta: ['Antofagasta', 'Mejillones', 'Sierra Gorda', 'Taltal', 'Calama', 'Ollagüe', 'San Pedro de Atacama', 'María Elena', 'Tocopilla'],
    atacama: ['Copiapó', 'Caldera', 'Tierra Amarilla', 'Chañaral', 'Diego de Almagro', 'Vallenar', 'Alto del Carmen', 'Freirina', 'Huasco'],
    coquimbo: ['La Serena', 'Coquimbo', 'Andacollo', 'La Higuera', 'Paiguano', 'Vicuña', 'Illapel', 'Canela', 'Los Vilos', 'Salamanca', 'Ovalle', 'Combarbalá', 'Monte Patria', 'Punitaqui', 'Río Hurtado'],
    valpo: ['Valparaíso', 'Casablanca', 'Concón', 'Juan Fernández', 'Puchuncaví', 'Quintero', 'Viña del Mar', 'Los Andes', 'Calle Larga', 'Rinconada', 'San Esteban', 'La Ligua', 'Cabildo', 'Papudo', 'Petorca', 'Zapallar', 'Quillota', 'Calera', 'Hijuelas', 'La Cruz', 'Nogales'],
    metro: ['Alhué', 'Buin', 'Cerrillos', 'Cerro Navia', 'Colina', 'Conchalí', 'Curacaví', 'El Bosque', 'El Monte', 'Estación Central', 'Huechuraba', 'Independencia', 'Isla de Maipo', 'La Cisterna', 'La Florida', 'La Granja', 'La Pintana', 'La Reina', 'Las Condes', 'Lo Barnechea', 'Lo Espejo', 'Lo Prado', 'Macul', 'Maipú', 'Ñuñoa', 'Padre Hurtado', 'Pedro Aguirre Cerda', 'Peñaflor', 'Peñalolén', 'Pirque', 'Providencia', 'Pudahuel', 'Puente Alto', 'Quinta Normal', 'Recoleta', 'Renca', 'San Bernardo', 'San Joaquín', 'San José de Maipo', 'San Miguel', 'San Pedro', 'San Ramón', 'Santiago', 'Talagante', 'Tiltil', 'Vitacura'],
    ohiggins: ['Chépica', 'Chimbarongo', 'Codegua', 'Coinco', 'Coltauco', 'Doñihue', 'Graneros', 'La Estrella', 'La Unión', 'Las Cabras', 'Litueche', 'Lolol', 'Machalí', 'Marchihue', 'Mostazal', 'Nancagua', 'Navidad', 'Olivar', 'Peumo', 'Pichidegua', 'Pichilemu', 'Pumanque', 'Placilla', 'Quinta de Tilcoco', 'Rancagua', 'Rengo', 'Requínoa', 'San Fernando', 'San Vicente', 'Santa Cruz'],
    maule: ['Cauquenes', 'Chanco', 'Colbún', 'Constitución', 'Curicó', 'Empredrado', 'Hualañé', 'Licantén', 'Linares', 'Longaví', 'Maule', 'Parral', 'Pelarco', 'Pelluhue', 'Pencahue', 'Rauco', 'Retiro', 'Romeral', 'San Clemente', 'San Javier', 'San Rafael', 'Talca', 'Teno', 'Vichuquén', 'Villa Alegre', 'Yerbas Buenas'],
    ñuble: ['Bulnes', 'Chillán', 'Chillán Viejo', 'Cobquecura', 'Coelemu', 'Coihueco', 'El Carmen', 'Ninhue', 'Ñiquén', 'Pemuco', 'Pinto', 'Portezuelo', 'Quillón', 'Quirihue', 'Ránquil', 'San Carlos', 'San Fabián', 'San Ignacio', 'San Nicolás', 'Treguaco', 'Yungay'],
    biobio: ['Alto Biobío', 'Antuco', 'Arauco', 'Cabrero', 'Cañete', 'Chiguayante', 'Concepción', 'Contulmo', 'Coronel', 'Curanilahue', 'Florida', 'Hualpén', 'Hualqui', 'Lebu', 'Los Álamos', 'Los Ángeles', 'Lota', 'Mulchén', 'Nacimiento', 'Negrete', 'Penco', 'Quilleco', 'Quilaco', 'San Rosendo', 'Santa Bárbara', 'Talcahuano', 'Tirúa', 'Tomé', 'Tucapel', 'Yumbel'],
    araucania: ['Angol', 'Carahue', 'Cholchol', 'Collipulli', 'Cunco', 'Curacautín', 'Curarrehue', 'Freire', 'Galvarino', 'Gorbea', 'Lautaro', 'Loncoche', 'Lonquimay', 'Los Sauces', 'Lumaco', 'Melipeuco', 'Nueva Imperial', 'Padre Las Casas', 'Perquenco', 'Pitrufquén', 'Pucón', 'Purén', 'Renaico', 'Saavedra', 'Temuco', 'Teodoro Schmidt', 'Toltén', 'Traiguén', 'Victoria', 'Vilcún'],
    losrios: ['Corral', 'Futrono', 'La Unión', 'Lago Ranco', 'Lanco', 'Los Lagos', 'Mariquina', 'Máfil', 'Paillaco', 'Río Bueno', 'Valdivia', 'Panguipulli'],
    loslagos: ['Calbuco', 'Castro', 'Chaitén', 'Chonchi', 'Cochamó', 'Curaco de Vélez', 'Dalcahue', 'Fresia', 'Frutillar', 'Futaleufú', 'Hualaihué', 'Llanquihue', 'Los Muermos', 'Maullín', 'Osorno', 'Palena', 'Puerto Montt', 'Puerto Octay', 'Puerto Varas', 'Puqueldón', 'Purranque', 'Puyehue', 'Queilén', 'Quellón', 'Quemchi', 'Quinchao', 'Río Negro', 'San Pablo'],
    aysen: ['Aysén', 'Cisnes', 'Chile Chico', 'Cochrane', 'Coyhaique', 'Guaitecas', 'Lago Verde', "O'Higgins", 'Río Ibáñez', 'Tortel'],
    magallanes: ['Antártica', 'Cabo de Hornos (Ex Navarino)', 'Laguna Blanca', 'Natales', 'Punta Arenas', 'Porvenir', 'Primavera', 'Río Verde', 'San Gregorio', 'Timaukel', 'Torres del Paine'],
    rapanui: ['Isla de Pascua'],
  }

  const comunas = comunasPorRegion[form.region] || []

  useEffect(() => {
    const u = getCurrentUser() || {}
    setForm({
      nombre: u.nombre || u.name || '',
      email: u.email || '',
      telefono: u.telefono || '',
      region: u.region || '',
      comuna: u.comuna || '',
    })
  }, [])

  // Al cambiar la región, reiniciamos comuna para forzar nueva selección
  useEffect(() => {
    setForm(f => ({ ...f, comuna: '' }))
  }, [form.region])

  const setField = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.value }))

  const handleSave = async (e) => {
    e.preventDefault()
    if (saving) return
    if (!form.region) { alert('Debes seleccionar tu región.'); return }
    if (!form.comuna) { alert('Debes seleccionar tu comuna.'); return }
    try {
      setSaving(true)
      updateLocalUser({
        nombre: form.nombre,
        email: form.email,
        telefono: form.telefono,
        region: form.region,
        comuna: form.comuna,
      })
      alert('✅ Perfil actualizado')
      navigate('/perfil')
    } catch (err) {
      console.error(err)
      alert('❌ No se pudo actualizar el perfil. Intenta nuevamente.')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="container" style={{ marginTop: '40px', marginBottom: '40px' }}>
      <h2>Editar Perfil</h2>
      <form onSubmit={handleSave}>
        <div className="mb-3">
          <label className="form-label">Nombre</label>
          <input type="text" className="form-control" value={form.nombre} onChange={setField('nombre')} />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" value={form.email} onChange={setField('email')} />
        </div>

        <div className="mb-3">
          <label className="form-label">Teléfono</label>
          <input className="form-control" value={form.telefono} onChange={setField('telefono')} />
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Región</label>
          <select className="form-select" id="region" name="regiones" value={form.region} onChange={setField('region')}>
            <option value="">Selecciona tu región</option>
            <option value="arica">Región de Arica y Parinacota</option>
            <option value="tarapaca">Región de Tarapacá</option>
            <option value="antofagasta">Región de Antofagasta</option>
            <option value="atacama">Región de Atacama</option>
            <option value="coquimbo">Región de Coquimbo</option>
            <option value="valpo">Región de Valparaíso</option>
            <option value="metro">Región Metropolitana de Santiago</option>
            <option value="ohiggins">Región del Libertador General Bernardo O'Higgins</option>
            <option value="maule">Región del Maule</option>
            <option value="ñuble">Región de Ñuble</option>
            <option value="biobio">Región del Biobío</option>
            <option value="araucania">Región de La Araucanía</option>
            <option value="losrios">Región de Los Ríos</option>
            <option value="loslagos">Región de Los Lagos</option>
            <option value="aysen">Región de Aysén</option>
            <option value="magallanes">Región de Magallanes y de la Antártica Chilena</option>
            <option value="rapanui">Rapa Nui</option>
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label fw-bold">Comuna</label>
          <select className="form-select" id="comuna" name="comunas" value={form.comuna} onChange={setField('comuna')}>
            <option value="">Selecciona tu comuna</option>
            {comunas.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        <div className="d-flex gap-2">
          <button type="submit" className="btn btn-primary" disabled={saving}>Guardar cambios</button>
          <Link to="/perfil" className="btn btn-secondary">Cancelar</Link>
        </div>
      </form>
    </div>
  )
}