# Sanos y Salvos — Frontend (Vite + React)

Proyecto frontend de ejemplo para localizar y recuperar mascotas perdidas.

Características:
- React 18 + Vite
- Routing con React Router v6
- Estilos con Tailwind CSS
- Mapas con react-leaflet
- Comunicación con backend vía Axios (punto base: `http://localhost:8080/api`)

Estructura relevante:
- `src/components/` — componentes reutilizables (Navbar, Footer, PetCard)
- `src/pages/` — vistas (Home, ReportLost, ReportFound, ReportsList, PetDetail, MapView, Admin)
- `src/services/` — API clients (api.js, reportService.js, petService.js)
- `src/hooks/` — hooks personalizados (useReports)
- `src/mock/` — datos mock para desarrollo local

Instalación y desarrollo:

```bash
cd sanos-y-salvos-vite
npm install
npm run dev
```

Notas de diseño:
- Patrón Repository: toda llamada a la API pasa por `src/services`.
- Patrón Factory: `createPetReport(type)` crea objetos base para formularios.
- Separación presentacional/containers: `PetCard` y formularios son presentacionales; la lógica de datos reside en `useReports`.

Agregar nuevas vistas:
- Crear `src/pages/NuevaVista.jsx` y añadir ruta en `src/App.jsx`.

Publicación de módulos:
- `package.json` está preparado parcialmente para publicar componentes; ajustar `files` y `main/module` según necesidad.

Mock assets:
- Las imágenes de `mockData` hacen referencia a `/img/mock/*.jpg`. Añade imágenes en `public/img/mock/` o modifica las rutas.
