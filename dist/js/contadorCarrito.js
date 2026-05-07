
function actualizarContadorCarrito() {
    const carrito = JSON.parse(localStorage.getItem('carrito')) || [];
    const cantidadTotal = carrito.reduce((total, item) => total + item.cantidad, 0);
    
   
    const contador = document.querySelector('.nav-link[href="carrito.html"]');
    if (contador) {
        contador.innerHTML = `<img src="img/Carrito.png" alt="Carrito" style="width: 30px; height: 30px;"> Carrito (${cantidadTotal})`;
    }
}


document.addEventListener('DOMContentLoaded', function() {
    actualizarContadorCarrito();
});