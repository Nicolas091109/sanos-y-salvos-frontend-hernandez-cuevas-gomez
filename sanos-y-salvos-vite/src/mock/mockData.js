// Mock data con 10 registros (5 perdidas, 5 encontradas)
export const mockReports = [
  {
    id: 'r1', type: 'lost', name: 'Luna', species: 'perro', breed: 'Labrador', color: 'amarillo', size: 'Grande', description: 'Collar azul con placa', date: '4/30/2026', location: 'Parque Central, comuna A', lat: -33.444, lng: -70.653, photo: 'https://images.unsplash.com/photo-1552053831-71594a27632d?auto=format&fit=crop&q=80&w=800', ownerName: 'María Pérez', phone: '+56911111111', email: 'maria@example.com', status: 'active'
  },
  {
    id: 'r2', type: 'lost', name: 'Misu', species: 'gato', breed: 'Siamés', color: 'blanco', size: 'Mediano', description: 'Ojos azules, responde a Misu', date: '4/27/2026', location: 'Calle 10, comuna B', lat: -33.45, lng: -70.65, photo: 'https://images.unsplash.com/photo-1513245543132-31f507417b26?auto=format&fit=crop&q=80&w=800', ownerName: 'José Ruiz', phone: '+56922222222', email: 'jose@example.com', status: 'active'
  },
  {
    id: 'r3', type: 'lost', name: 'Rocco', species: 'perro', breed: 'Bulldog', color: 'marrón', size: 'Mediano', description: 'Tiene una mancha blanca', date: '4/19/2026', location: 'Estación Central', lat: -33.441, lng: -70.657, photo: 'https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=800', ownerName: 'Ana López', phone: '+56933333333', email: 'ana@example.com', status: 'active'
  },
  {
    id: 'r4', type: 'lost', name: 'Nube', species: 'gato', breed: 'Común', color: 'gris', size: 'Pequeño', description: 'Muy tímido', date: '2026-05-03', location: 'Barrio Este', lat: -33.447, lng: -70.66, photo: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=800', ownerName: 'Carla Díaz', phone: '+56944444444', email: 'carla@example.com', status: 'active'
  },
  {
    id: 'r5', type: 'lost', name: 'Fito', species: 'otro', breed: 'conejo', color: 'blanco', size: 'Pequeño', description: 'Orejas largas', date: '2026-04-10', location: 'Huerto comunal', lat: -33.449, lng: -70.655, photo: 'https://images.unsplash.com/photo-1585110396000-c9ffd4e4b308?auto=format&fit=crop&q=80&w=800', ownerName: 'Pablo Soto', phone: '+56955555555', email: 'pablo@example.com', status: 'archived'
  },
  {
    id: 'r6', type: 'found', name: 'Toby', species: 'perro', breed: 'Labrador', color: 'amarillo', size: 'Grande', description: 'Sin collar, cachorro', date: '2026-05-02', location: 'Parque Central, comuna A', lat: -33.4442, lng: -70.6532, photo: 'https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?auto=format&fit=crop&q=80&w=800', ownerName: 'Encontrante1', phone: '+56966666666', email: 'finder1@example.com', status: 'active'
  },
  {
    id: 'r7', type: 'found', name: 'Blanquito', species: 'gato', breed: 'Siamés', color: 'blanco', size: 'Mediano', description: 'Muy amistoso', date: '2026-04-29', location: 'Calle 12, comuna B', lat: -33.451, lng: -70.651, photo: 'https://images.unsplash.com/photo-1573865526739-10659fef78a5?auto=format&fit=crop&q=80&w=800', ownerName: 'Encontrante2', phone: '+56977777777', email: 'finder2@example.com', status: 'active'
  },
  {
    id: 'r8', type: 'found', name: 'Max', species: 'perro', breed: 'Bulldog', color: 'marrón', size: 'Mediano', description: 'Se ve bien cuidado', date: '2026-04-21', location: 'Estación Central', lat: -33.4411, lng: -70.6571, photo: 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=800', ownerName: 'Encontrante3', phone: '+56988888888', email: 'finder3@example.com', status: 'active'
  },
  {
    id: 'r9', type: 'found', name: 'Gris', species: 'gato', breed: 'Común', color: 'gris', size: 'Pequeño', description: 'Asustado', date: '2026-05-04', location: 'Barrio Este', lat: -33.4469, lng: -70.659, photo: 'https://images.unsplash.com/photo-1543852786-1cf6624b9987?auto=format&fit=crop&q=80&w=800', ownerName: 'Encontrante4', phone: '+56999999999', email: 'finder4@example.com', status: 'active'
  },
  {
    id: 'r10', type: 'found', name: 'Copito', species: 'otro', breed: 'conejo', color: 'blanco', size: 'Pequeño', description: 'Encontrado cerca de huerto', date: '2026-04-11', location: 'Huerto comunal', lat: -33.4495, lng: -70.654, photo: 'https://images.unsplash.com/photo-1591384382841-383794406bc1?auto=format&fit=crop&q=80&w=800', ownerName: 'Encontrante5', phone: '+56910101010', email: 'finder5@example.com', status: 'active'
  }
]
