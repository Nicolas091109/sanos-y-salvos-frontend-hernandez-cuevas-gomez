
class CarritoManager {
    constructor() {
        this.carrito = this.cargarCarrito();
        this.actualizarContador();
    }

    
    cargarCarrito() {
        const carritoGuardado = localStorage.getItem('carrito');
        return carritoGuardado ? JSON.parse(carritoGuardado) : [];
    }

    
    guardarCarrito() {
        localStorage.setItem('carrito', JSON.stringify(this.carrito));
        this.actualizarContador();
        
        if (typeof window.actualizarContadorCarrito === 'function') {
            window.actualizarContadorCarrito();
        }
    }

    
    eliminarProducto(nombre) {
        this.carrito = this.carrito.filter(item => item.nombre !== nombre);
        this.guardarCarrito();
        this.mostrarProductos();
        this.mostrarMensaje('Producto eliminado del carrito');
    }

    
    actualizarCantidad(nombre, nuevaCantidad) {
        const producto = this.carrito.find(item => item.nombre === nombre);
        if (producto) {
            if (nuevaCantidad <= 0) {
                this.eliminarProducto(nombre);
            } else {
                producto.cantidad = nuevaCantidad;
                this.guardarCarrito();
                this.mostrarProductos();
            }
        }
    }

    
    limpiarCarrito() {
        this.carrito = [];
        this.guardarCarrito();
        this.mostrarProductos();
    }

   
    obtenerTotal() {
        return this.carrito.reduce((total, item) => total + (item.precio * item.cantidad), 0);
    }

 
    obtenerCantidadTotal() {
        return this.carrito.reduce((total, item) => total + item.cantidad, 0);
    }

    
    actualizarContador() {
        const contador = document.querySelector('.nav-link[href="carrito.html"]');
        if (contador) {
            const cantidad = this.obtenerCantidadTotal();
            contador.innerHTML = `<img src="img/Carrito.png" alt="Carrito" style="width: 30px; height: 30px;"> Carrito (${cantidad})`;
        }
    }

    
    mostrarProductos() {
        const tbody = document.getElementById('productos');
        const totalElement = document.getElementById('cart-total');
        
        if (!tbody) return;

        if (this.carrito.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="5" class="text-center">
                        <p>Tu carrito está vacío</p>
                        <a href="Productos.html" class="btn btn-primary">Seguir comprando</a>
                    </td>
                </tr>
            `;
            if (totalElement) totalElement.textContent = '0';
            return;
        }

        tbody.innerHTML = this.carrito.map(item => `
            <tr>
                <td>
                    <div class="d-flex align-items-center">
                        <img src="${item.foto}" alt="${item.nombre}" style="width: 60px; height: 60px; object-fit: cover; margin-right: 15px;">
                        <div>
                            <h6 class="mb-0">${item.nombre}</h6>
                            <small class="text-muted">${item.descripcion.substring(0, 50)}...</small>
                        </div>
                    </div>
                </td>
                <td class="text-center">
                    <div class="input-group" style="width: 120px; margin: 0 auto;">
                        <button class="btn btn-outline-secondary btn-sm" type="button" onclick="carritoManager.actualizarCantidad('${item.nombre}', ${item.cantidad - 1})">-</button>
                        <input type="number" class="form-control form-control-sm text-center" value="${item.cantidad}" min="1" onchange="carritoManager.actualizarCantidad('${item.nombre}', parseInt(this.value))">
                        <button class="btn btn-outline-secondary btn-sm" type="button" onclick="carritoManager.actualizarCantidad('${item.nombre}', ${item.cantidad + 1})">+</button>
                    </div>
                </td>
                <td class="text-center">$${item.precio.toLocaleString()}</td>
                <td class="text-center">$${(item.precio * item.cantidad).toLocaleString()}</td>
                <td class="text-center">
                    <button class="btn btn-outline-danger" onclick="carritoManager.eliminarProducto('${item.nombre}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </td>
            </tr>
        `).join('');

        if (totalElement) {
            totalElement.textContent = `$${this.obtenerTotal().toLocaleString()}`;
        }
    }

    
    mostrarMensaje(mensaje, tipo = 'success') {
        if (typeof window.mostrarMensaje === 'function') {
            window.mostrarMensaje(mensaje, tipo);
        }
    }

  
    procesarCompra() {
        if (this.carrito.length === 0) {
            this.mostrarMensaje('Tu carrito está vacío', 'warning');
            return;
        }
        // Descontar stock local usando la mejor fuente disponible
        try {
            const adminProducts = JSON.parse(localStorage.getItem('adminProducts')) || [];
            const stockMap = JSON.parse(localStorage.getItem('productStocks')) || {};

            this.carrito.forEach(item => {
                const nombre = item.nombre;
                const idx = adminProducts.findIndex(p => p && (p.nombre === nombre || p.name === nombre));
                const aStock = idx !== -1 ? Number(adminProducts[idx]?.stock) : NaN;
                const sStock = Number(stockMap[nombre]);
                const iStock = Number(item?.stock);
                const current = Number.isFinite(aStock) && aStock > 0
                    ? aStock
                    : (Number.isFinite(sStock) && sStock >= 0 ? sStock : (Number.isFinite(iStock) ? iStock : NaN));
                if (!Number.isFinite(current)) return;
                const qty = Number(item?.cantidad ?? item?.quantity ?? 0);
                const next = Math.max(0, current - qty);
                if (idx !== -1) adminProducts[idx].stock = next;
                stockMap[nombre] = next;
            });

            try { localStorage.setItem('adminProducts', JSON.stringify(adminProducts)); } catch { void 0 }
            try { localStorage.setItem('productStocks', JSON.stringify(stockMap)); } catch { void 0 }
        } catch { void 0 }

        this.mostrarMensaje('¡Compra procesada exitosamente!', 'success');
        this.limpiarCarrito();
    }
}


let carritoManager;
document.addEventListener('DOMContentLoaded', function() {
    carritoManager = new CarritoManager();
    carritoManager.mostrarProductos();
});
