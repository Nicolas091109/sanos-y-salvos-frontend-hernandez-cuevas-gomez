

function validarCorreo(correo) {
    const regex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
    return regex.test(correo);
}


document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("loginForm");

    form.addEventListener("submit", function(e) {
        e.preventDefault(); 
        let valido = true;

        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        
        if (!validarCorreo(email)) {
            document.getElementById("emailError").textContent = "Correo inválido. Debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com";
            valido = false;
        } else {
            document.getElementById("emailError").textContent = "";
        }

        
        if (password.length < 4 || password.length > 10) {
            document.getElementById("passwordError").textContent = "La contraseña debe tener entre 4 y 10 caracteres.";
            valido = false;
        } else {
            document.getElementById("passwordError").textContent = "";
        }

        if (valido) {
           
            if ((email === 'nicol.cuevasl@duoc.cl' && password === 'Nico2004*') ||
                (email === 'taniaacevedo@duoc.cl' && password === '1234')) {
                

                let nombreAdmin = '';
                if (email === 'nicol.cuevasl@duoc.cl') {
                    nombreAdmin = 'Nicolás Cuevas';
                } else if (email === 'taniaacevedo@duoc.cl') {
                    nombreAdmin = 'Tania Acevedo';
                }
                
              
                const adminSession = {
                    email: email,
                    role: 'administrador',
                    nombre: nombreAdmin,
                    run: '12345678-9',
                    loginTime: new Date().toISOString()
                };
                localStorage.setItem('currentUser', JSON.stringify(adminSession));
                
                alert("✅ Acceso administrativo exitoso!");
                window.location.href = "admin.html";
            } else {
                
                const userSession = {
                    email: email,
                    role: 'cliente',
                    loginTime: new Date().toISOString()
                };
                localStorage.setItem('currentUser', JSON.stringify(userSession));
                
                alert("✅ Inicio de sesión exitoso!");
                window.location.href = "Home.html";
            }
        }
    });
});
