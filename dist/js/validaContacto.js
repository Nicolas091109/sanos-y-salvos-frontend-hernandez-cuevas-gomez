

function validarCorreo(correo) {
    const regex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
    return regex.test(correo);
}

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("contactoForm");

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        let valido = true;

        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const mensaje = document.getElementById("mensaje").value.trim();

        
        if (nombre.length === 0) {
            document.getElementById("nombreError").textContent = "El nombre es obligatorio.";
            valido = false;
        } else if (nombre.length > 100) {
            document.getElementById("nombreError").textContent = "El nombre no puede exceder los 100 caracteres.";
            valido = false;
        } else {
            document.getElementById("nombreError").textContent = "";
        }

    
        if (email.length === 0) {
            document.getElementById("emailError").textContent = "El correo es obligatorio.";
            valido = false;
        } else if (email.length > 100) {
            document.getElementById("emailError").textContent = "El correo no puede exceder los 100 caracteres.";
            valido = false;
        } else if (!validarCorreo(email)) {
            document.getElementById("emailError").textContent = "Correo inválido. Debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com";
            valido = false;
        } else {
            document.getElementById("emailError").textContent = "";
        }

       
        if (mensaje.length === 0) {
            document.getElementById("mensajeError").textContent = "El comentario es obligatorio.";
            valido = false;
        } else if (mensaje.length > 500) {
            document.getElementById("mensajeError").textContent = "El comentario no puede exceder los 500 caracteres.";
            valido = false;
        } else {
            document.getElementById("mensajeError").textContent = "";
        }

        if (valido) {
            alert("✅ ¡Mensaje enviado exitosamente!");
           
            
            form.reset();
        }
    });
});
