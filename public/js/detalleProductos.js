
document.addEventListener('DOMContentLoaded', async function() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  let nombre = params.get('nombre') || '';
  let foto = params.get('foto') || '';
  let precio = params.get('precio') || '';
  let descripcion = params.get('descripcion') || '';
  let stock = null;

  if (id) {
    const candidates = [`/api/productos/${id}`, `/productos/${id}`, `/products/${id}`];
    for (const path of candidates) {
      try {
        const res = await fetch(path);
        if (res.ok) {
          const p = await res.json();
          nombre = p?.nombre || nombre;
          foto = p?.foto || foto;
          precio = p?.precio != null ? String(p.precio) : precio;
          descripcion = p?.descripcion || descripcion;
          stock = p?.stock != null ? parseInt(p.stock, 10) : stock;
          break;
        }
      } catch { }
    }
  }

  const nombreEl = document.getElementById('nombre');
  const imagenEl = document.getElementById('imagen');
  const precioEl = document.getElementById('precio');
  const descEl = document.getElementById('descripcion');
  const stockBadge = document.getElementById('stockBadge');

  if (nombreEl) nombreEl.textContent = nombre;
  if (imagenEl) imagenEl.src = foto || '/img/noimg.png';
  if (precioEl) precioEl.textContent = precio ? `$${Number(precio || 0).toLocaleString('es-CL')} C/U` : '';
  if (descEl) descEl.textContent = descripcion || '';

  if (stockBadge) {
    if (stock !== null && stock >= 0) {
      stockBadge.textContent = `Stock: ${stock}`;
      stockBadge.style.display = 'inline-block';
    } else {
      stockBadge.style.display = 'none';
    }
  }

  document.getElementById('incrementar')?.addEventListener('click', () => {
    const cantidadInput = document.getElementById('cantidad');
    let val = parseInt(cantidadInput.value, 10) || 1;
    cantidadInput.value = String(val + 1);
  });

  document.getElementById('decrementar')?.addEventListener('click', () => {
    const cantidadInput = document.getElementById('cantidad');
    let val = parseInt(cantidadInput.value, 10) || 1;
    cantidadInput.value = String(Math.max(1, val - 1));
  });

  // Incremento y decremento de 10 en 10
  document.getElementById('incrementar10')?.addEventListener('click', () => {
    const cantidadInput = document.getElementById('cantidad');
    let val = parseInt(cantidadInput.value, 10) || 1;
    cantidadInput.value = String(val + 10);
  });

  document.getElementById('decrementar10')?.addEventListener('click', () => {
    const cantidadInput = document.getElementById('cantidad');
    let val = parseInt(cantidadInput.value, 10) || 1;
    cantidadInput.value = String(Math.max(1, val - 10));
  });

  window.actualizarContadorCarrito && window.actualizarContadorCarrito();
});

function agregarAlCarrito() {
  const params = new URLSearchParams(window.location.search);
  const id = params.get('id');
  const nombre = params.get('nombre') || '';
  const foto = params.get('foto') || '';
  const precioParam = params.get('precio') || '';
  const descripcion = params.get('descripcion') || '';
  let stock = null;
  const stockParam = params.get('stock');
  if (Number.isFinite(Number(stockParam))) stock = parseInt(stockParam, 10);

  const cantidadInput = document.getElementById('cantidad');
  const cantidad = parseInt(cantidadInput.value, 10) || 1;

  if (!validarAgregarProducto(cantidad)) return;

  let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
  const existente = carrito.find(it => it.nombre === nombre);
  const cantidadActual = existente ? (parseInt(existente.cantidad, 10) || 0) : 0;

  if (stock !== null && cantidadActual + cantidad > stock) {
    window.mostrarMensaje && window.mostrarMensaje('Stock insuficiente', 'warning');
    return;
  }

  const producto = {
    id: id ? parseInt(id, 10) : undefined,
    nombre,
    foto,
    precio: parseInt(precioParam, 10) || 0,
    descripcion,
    cantidad
  };

  if (existente) {
    existente.cantidad += cantidad;
  } else {
    carrito.push(producto);
  }

  localStorage.setItem('carrito', JSON.stringify(carrito));
  window.mostrarMensaje && window.mostrarMensaje('Producto agregado al carrito', 'success');
  window.actualizarContadorCarrito && window.actualizarContadorCarrito();
}

function validarAgregarProducto(cantidad) {
  if (!cantidad || cantidad <= 0) {
    window.mostrarMensaje && window.mostrarMensaje('La cantidad debe ser mayor a 0', 'warning');
    return false;
  }
  // Sin límite arbitrario: el stock disponible controla el máximo
  return true;
}

// Exponer global
window.agregarAlCarrito = agregarAlCarrito


