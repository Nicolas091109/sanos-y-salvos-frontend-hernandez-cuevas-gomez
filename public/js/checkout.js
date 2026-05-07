
document.addEventListener('DOMContentLoaded', function() {
    
    const acceptTermsCheckbox = document.getElementById('accept-terms');
    const checkoutBtn = document.getElementById('checkout-btn');
    
    if (acceptTermsCheckbox && checkoutBtn) {
        acceptTermsCheckbox.addEventListener('change', function() {
            checkoutBtn.disabled = !this.checked;
        });
    }
    
    
    if (checkoutBtn) {
        checkoutBtn.addEventListener('click', function() {
            if (window.carritoManager) {
                window.carritoManager.procesarCompra();
            }
        });
    }
    
   
    const clearCartBtn = document.getElementById('clear-cart-btn');
    if (clearCartBtn) {
        clearCartBtn.addEventListener('click', function() {
            if (window.carritoManager) {
                window.carritoManager.limpiarCarrito();
            }
        });
    }
});