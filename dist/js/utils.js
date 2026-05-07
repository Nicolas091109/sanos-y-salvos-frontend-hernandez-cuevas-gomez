
// Utilidades básicas para mensajes y contador de carrito en páginas estáticas
function mostrarMensaje(texto, tipo = 'info') {
  // Simple toast-like fallback; en proyectos con estilos, puedes mejorar esto
  const color = tipo === 'success' ? '#28a745' : tipo === 'warning' ? '#ffc107' : tipo === 'error' ? '#dc3545' : '#0d6efd';
  const box = document.createElement('div');
  box.textContent = texto;
  box.style.position = 'fixed';
  box.style.bottom = '20px';
  box.style.right = '20px';
  box.style.padding = '12px 16px';
  box.style.background = color;
  box.style.color = '#fff';
  box.style.borderRadius = '8px';
  box.style.boxShadow = '0 6px 20px rgba(0,0,0,.15)';
  box.style.zIndex = '9999';
  document.body.appendChild(box);
  setTimeout(() => box.remove(), 3000);
}

function actualizarContadorCarrito() {
  try {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const total = carrito.reduce((acc, it) => acc + (parseInt(it.cantidad) || 0), 0);
    const carritoLink = document.querySelector('.nav-link[href="/carrito"], .nav-link[href="carrito.html"]');
    if (carritoLink) {
      const base = carritoLink.innerText.replace(/\(\d+\)/, '').trim();
      carritoLink.innerText = `${base} (${total})`;
    }
  } catch { void 0 }
}

// --- Sesión en páginas estáticas ---
function getCurrentUser() {
  try {
    const raw = localStorage.getItem('currentUser');
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function clearSession() {
  try {
    localStorage.removeItem('currentUser');
  } catch { void 0 }
}

function updateSessionUI() {
  const list = document.querySelector('ul.nav.justify-content-end');
  if (!list) return;
  const user = getCurrentUser();
  if (user) {
    const nombre = user.nombre || user.email || 'Usuario';
    list.innerHTML = `
      <li class="nav-item d-flex align-items-center"><a class="nav-link" href="#"><small>Hola, ${nombre}!!!</small></a></li>
      <li class="nav-item d-flex align-items-center"><a class="nav-link" href="#" id="logoutLink"><small>Cerrar sesión</small></a></li>
    `;
    const logout = document.getElementById('logoutLink');
    logout?.addEventListener('click', (e) => {
      e.preventDefault();
      clearSession();
      mostrarMensaje('Sesión cerrada', 'success');
      // Refresca para que el header y el contador se actualicen
      location.href = '/';
    });
  } else {
    // Asegura que existan los enlaces de login/register si no hay sesión
    list.innerHTML = `
      <li class="nav-item"><a class="nav-link" href="/login"><small>Iniciar Sesión</small></a></li>
      <li class="nav-item"><a class="nav-link" href="/register"><small>Registrarse</small></a></li>
    `;
  }
}

// Exponer global
window.mostrarMensaje = mostrarMensaje;
window.actualizarContadorCarrito = actualizarContadorCarrito;
window.updateSessionUI = updateSessionUI;

// Inicializa en carga, incluso si el DOM ya está listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    try { updateSessionUI(); } catch { void 0 }
    try { actualizarContadorCarrito(); } catch { void 0 }
  });
} else {
  try { updateSessionUI(); } catch { void 0 }
  try { actualizarContadorCarrito(); } catch { void 0 }
}
