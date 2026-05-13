# Sanos y Salvos Vite App

Aplicacion React del proyecto `Sanos y Salvos`. Este directorio contiene el frontend activo que consume el backend de microservicios a traves del gateway Spring.

## Stack

- React 18
- Vite 5
- React Router DOM
- Axios
- Tailwind CSS
- React Leaflet

## Scripts

```powershell
npm install
npm run dev
npm run build
npm run preview
```

## URL de desarrollo

- `http://localhost:5173`

## Backend esperado

La aplicacion consume:

- `http://localhost:8080/api`

Servicios usados:

- `/api/auth`
- `/api/reportes`
- `/api/geo`

## Estructura relevante

- `src/pages/`: pantallas principales
- `src/components/`: componentes reutilizables
- `src/services/api.js`: cliente Axios base
- `src/services/authService.js`: login, registro y sesion
- `src/services/geolocationService.js`: adaptadores de ubicacion
- `src/services/reportService.js`: adaptadores y flujo de reportes
- `src/hooks/useReports.js`: consumo de datos para reportes y mapa

## Flujo principal

1. El usuario se registra o inicia sesion.
2. El token JWT se guarda en storage.
3. Axios adjunta el token automaticamente.
4. Al crear un reporte, primero se crea la ubicacion.
5. Luego se crea el reporte con el `ubicacionId`.
6. El listado y el mapa consumen datos reales.

## Sesion

- La app guarda `sys_token` y `user` en `localStorage` o `sessionStorage`.
- El login visible usa cuentas reales; ya no hay botones de credenciales demo en la pantalla.

## Validacion rapida

```powershell
npm run build
```

Si el build termina correctamente, la app queda lista para ejecutarse en desarrollo o previsualizacion.

## Nota

La documentacion general del repositorio frontend se encuentra en el `README.md` de la raiz:

- `..\README.md`
