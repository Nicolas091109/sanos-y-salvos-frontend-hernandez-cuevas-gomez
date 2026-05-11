// Mock data con 10 registros (5 perdidas, 5 encontradas)
export const mockReports = [
  {
    id: 'r1', type: 'lost', name: 'Luna', species: 'perro', breed: 'Labrador', color: 'amarillo', size: 'Grande', description: 'Collar azul con placa', date: '2026-05-01', location: 'Parque Central, comuna A', lat: -33.444, lng: -70.653, photo: '/img/mock/dog1.jpg', ownerName: 'María Pérez', phone: '+56911111111', email: 'maria@example.com', status: 'active'
  },
  {
    id: 'r2', type: 'lost', name: 'Misu', species: 'gato', breed: 'Siamés', color: 'blanco', size: 'Mediano', description: 'Ojos azules, responde a Misu', date: '2026-04-28', location: 'Calle 10, comuna B', lat: -33.45, lng: -70.65, photo: '/img/mock/cat1.jpg', ownerName: 'José Ruiz', phone: '+56922222222', email: 'jose@example.com', status: 'active'
  },
  {
    id: 'r3', type: 'lost', name: 'Rocco', species: 'perro', breed: 'Bulldog', color: 'marrón', size: 'Mediano', description: 'Tiene una mancha blanca', date: '2026-04-20', location: 'Estación Central', lat: -33.441, lng: -70.657, photo: '/img/mock/dog2.jpg', ownerName: 'Ana López', phone: '+56933333333', email: 'ana@example.com', status: 'resolved'
  },
  {
    id: 'r4', type: 'lost', name: 'Nube', species: 'gato', breed: 'Común', color: 'gris', size: 'Pequeño', description: 'Muy tímido', date: '2026-05-03', location: 'Barrio Este', lat: -33.447, lng: -70.66, photo: '/img/mock/cat2.jpg', ownerName: 'Carla Díaz', phone: '+56944444444', email: 'carla@example.com', status: 'active'
  },
  {
    id: 'r5', type: 'lost', name: 'Fito', species: 'otro', breed: 'conejo', color: 'blanco', size: 'Pequeño', description: 'Orejas largas', date: '2026-04-10', location: 'Huerto comunal', lat: -33.449, lng: -70.655, photo: '/img/mock/rabbit1.jpg', ownerName: 'Pablo Soto', phone: '+56955555555', email: 'pablo@example.com', status: 'archived'
  },
  {
    id: 'r6', type: 'found', name: '', species: 'perro', breed: 'Labrador', color: 'amarillo', size: 'Grande', description: 'Sin collar, cachorro', date: '2026-05-02', location: 'Parque Central, comuna A', lat: -33.4442, lng: -70.6532, photo: '/img/mock/dog3.jpg', ownerName: 'Encontrante1', phone: '+56966666666', email: 'finder1@example.com', status: 'active'
  },
  {
    id: 'r7', type: 'found', name: '', species: 'gato', breed: 'Siamés', color: 'blanco', size: 'Mediano', description: 'Muy amistoso', date: '2026-04-29', location: 'Calle 12, comuna B', lat: -33.451, lng: -70.651, photo: '/img/mock/cat3.jpg', ownerName: 'Encontrante2', phone: '+56977777777', email: 'finder2@example.com', status: 'active'
  },
  {
    id: 'r8', type: 'found', name: '', species: 'perro', breed: 'Bulldog', color: 'marrón', size: 'Mediano', description: 'Se ve bien cuidado', date: '2026-04-21', location: 'Estación Central', lat: -33.4411, lng: -70.6571, photo: '/img/mock/dog4.jpg', ownerName: 'Encontrante3', phone: '+56988888888', email: 'finder3@example.com', status: 'active'
  },
  {
    id: 'r9', type: 'found', name: '', species: 'gato', breed: 'Común', color: 'gris', size: 'Pequeño', description: 'Asustado', date: '2026-05-04', location: 'Barrio Este', lat: -33.4469, lng: -70.659, photo: '/img/mock/cat4.jpg', ownerName: 'Encontrante4', phone: '+56999999999', email: 'finder4@example.com', status: 'active'
  },
  {
    id: 'r10', type: 'found', name: '', species: 'otro', breed: 'conejo', color: 'blanco', size: 'Pequeño', description: 'Encontrado cerca de huerto', date: '2026-04-11', location: 'Huerto comunal', lat: -33.4495, lng: -70.654, photo: '/img/mock/rabbit2.jpg', ownerName: 'Encontrante5', phone: '+56910101010', email: 'finder5@example.com', status: 'active'
  }
]
