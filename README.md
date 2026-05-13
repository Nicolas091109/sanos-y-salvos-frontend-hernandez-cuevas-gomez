# Sanos y Salvos Frontend

Repositorio frontend del proyecto `Sanos y Salvos`. La aplicacion React principal se encuentra dentro del directorio `sanos-y-salvos-vite`.

## Stack

- React 18
- Vite 5
- React Router DOM
- Axios
- Tailwind CSS
- React Leaflet

## Estructura

```text
sanos-y-salvos-frontend-hernandez-cuevas-gomez/
|- sanos-y-salvos-vite/
|  |- src/
|  |- public/
|  |- package.json
|  |- vite.config.js
|- public/
|- dist/
```

## Directorios importantes

- `sanos-y-salvos-vite/src/pages/`: vistas principales
- `sanos-y-salvos-vite/src/components/`: componentes reutilizables
- `sanos-y-salvos-vite/src/services/`: acceso HTTP y adaptadores
- `sanos-y-salvos-vite/src/hooks/`: hooks de datos

## Integracion con backend

La aplicacion apunta al gateway Spring:

- `http://localhost:8080/api`

Archivo clave:

- `sanos-y-salvos-vite/src/services/api.js`

Comportamiento actual:

- adjunta `Authorization: Bearer <token>` si existe sesion
- maneja errores globales `401`, `403` y `500`
- limpia sesion en `401`
- usa `sys_token` y `user` en `localStorage` o `sessionStorage`

## Servicios del frontend

### `authService.js`

- registro de usuarios
- inicio de sesion
- persistencia de token y usuario en storage
- lectura de `user.name` y `user.role` desde la respuesta del backend

### `geolocationService.js`

- adapta `lat/lng/location` a `latitud/longitud/nombreSector`
- consume `/api/geo`

### `reportService.js`

- adapta el modelo de la UI al contrato del backend
- crea primero la ubicacion y luego el reporte
- consume `/api/reportes`

## Requisitos

- Node.js 18 o superior
- npm
- backend levantado con el gateway en `8080`

## Instalacion

```powershell
cd "c:\Users\x\Desktop\Pagina-Completa-SanosySalvos\sanos-y-salvos-frontend-hernandez-cuevas-gomez\sanos-y-salvos-vite"
npm install
```

## Scripts

```powershell
npm run dev
npm run build
npm run preview
```

## Desarrollo local

Levantar el frontend:

```powershell
cd "c:\Users\x\Desktop\Pagina-Completa-SanosySalvos\sanos-y-salvos-frontend-hernandez-cuevas-gomez\sanos-y-salvos-vite"
npm run dev
```

Abrir en el navegador:

- `http://localhost:5173`

## Flujo funcional

1. El usuario se registra o inicia sesion contra `/api/auth`.
2. El token JWT se guarda en `localStorage` o `sessionStorage`.
3. Las vistas protegidas consumen datos reales desde el gateway.
4. Al crear un reporte, el frontend registra primero la ubicacion.
5. El mapa consume reportes y ubicaciones reales.

## Login actual

- La pantalla de login ya no muestra credenciales demo.
- Debes usar cuentas reales existentes en PostgreSQL o registrarte desde la misma UI.
- Si limpiaste la tabla `usuarios`, recuerda usar las credenciales que vuelvas a insertar manualmente.

## Vistas principales

- `Login`: registro e inicio de sesion
- `Home`: portada principal
- `ReportLost`: crear reporte de mascota perdida
- `ReportFound`: crear reporte de mascota encontrada
- `ReportsList`: listado de reportes
- `PetDetail`: detalle de reporte
- `MapView`: visualizacion georreferenciada
- `Admin`: administracion basica de reportes

## Verificacion rapida

Con backend y frontend arriba:

1. Abrir `http://localhost:5173/login`
2. Crear una cuenta
3. Iniciar sesion
4. Confirmar que existe `sys_token` en el storage
5. Crear un reporte con `latitud` y `longitud`
6. Revisar el mapa

## Troubleshooting

- `No fue posible conectar con el backend`: confirma que el gateway este corriendo en `8080`.
- El backend esta arriba pero el browser bloquea auth: reinicia el gateway si cambiaste la configuracion CORS.
- El login falla con `401`: revisa credenciales o registra nuevamente el usuario.
- El registro falla con `500`: revisa PostgreSQL y `ms-identity`.
- El reporte falla al crear: revisa `ms-geolocation`, `ms-reporting`, PostgreSQL y MongoDB.
- El mapa no muestra datos: verifica que el reporte tenga coordenadas validas y que `/api/geo/historial` responda.
- Sigues logueado con datos viejos: borra `sys_token` y `user` del storage del navegador.

## Nota sobre carpetas legacy

En la raiz del repositorio existen carpetas `public/` y `dist/` que corresponden a material anterior al frontend Vite actual. La aplicacion activa para desarrollo y build es `sanos-y-salvos-vite`.
