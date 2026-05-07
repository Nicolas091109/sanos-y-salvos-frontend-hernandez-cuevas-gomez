

document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("registroForm");

    function validarCorreo(correo) {
        const regex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
        return regex.test(correo);
    }

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        let valido = true;

        const nombre = document.getElementById("nombre").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();
        const confirmPassword = document.getElementById("confirmPassword").value.trim();
        const region = document.getElementById("region").value;
        const comuna = document.getElementById("comuna").value;


        if(nombre === "") {
            document.getElementById("nombreError").textContent = "El nombre es obligatorio.";
            valido = false;
        } else {
            document.getElementById("nombreError").textContent = "";
        }

    
        if(!validarCorreo(email)) {
            document.getElementById("emailError").textContent = "Correo inválido. Solo @duoc.cl, @profesor.duoc.cl o @gmail.com";
            valido = false;
        } else {
            document.getElementById("emailError").textContent = "";
        }

      
        if(password.length < 4 || password.length > 10) {
            document.getElementById("passwordError").textContent = "Contraseña entre 4 y 10 caracteres.";
            valido = false;
        } else {
            document.getElementById("passwordError").textContent = "";
        }

        
        if(confirmPassword !== password) {
            document.getElementById("confirmPasswordError").textContent = "Las contraseñas no coinciden.";
            valido = false;
        } else {
            document.getElementById("confirmPasswordError").textContent = "";
        }

       
        if(region === "") {
            alert("Debes seleccionar una región.");
            valido = false;
        }
        if(comuna === "" || comuna === "Selecciona tu comuna") {
            alert("Debes seleccionar una comuna.");
            valido = false;
        }

        if(valido) {
            alert("✅ Registro exitoso!");
            form.reset();
        }
    });
});

const comunasPorRegion = {
    "arica": ["Arica", "Camarones", "Putre", "General Lagos"],
    "tarapaca": ["Iquique", "Alto Hospicio", "Pozo Almonte", "Camiña", "Colchane", "Huara", "Pica"],
    "antofagasta": ["Antofagasta", "Mejillones", "Sierra Gorda", "Taltal", "Calama", "Ollagüe", "San Pedro de Atacama", "María Elena", "Tocopilla"],
    "atacama": ["Copiapó", "Caldera", "Tierra Amarilla", "Chañaral", "Diego de Almagro", "Vallenar", "Alto del Carmen", "Freirina", "Huasco"],
    "coquimbo": ["La Serena", "Coquimbo", "Andacollo", "La Higuera", "Paiguano", "Vicuña", "Illapel", "Canela", "Los Vilos", "Salamanca", "Ovalle", "Combarbalá", "Monte Patria", "Punitaqui", "Río Hurtado"],
    "valpo": ["Valparaíso", "Casablanca", "Concón", "Juan Fernández", "Puchuncaví", "Quintero", "Viña del Mar", "Los Andes", "Calle Larga", "Rinconada", "San Esteban", "La Ligua", "Cabildo", "Papudo", "Petorca", "Zapallar", "Quillota", "Calera", "Hijuelas", "La Cruz", "Nogales"],
    "metro": ["Alhué", "Buin", "Cerrillos", "Cerro Navia", "Colina", "Conchalí", "Curacaví", "El Bosque", "El Monte", "Estación Central", "Huechuraba", "Independencia", "Isla de Maipo", "La Cisterna", "La Florida", "La Granja", "La Pintana", "La Reina", "Las Condes", "Lo Barnechea", "Lo Espejo", "Lo Prado", "Macul", "Maipú", "Melipilla", "Ñuñoa", "Padre Hurtado", "Pdero Aguirre Cercda", "Peñaflor", "Pirque", "Puente Alto", "Pudahuel", "Providencia", "Quilicura", "Quinta Normal", "Renca", "San Bernardo", "San Joaquín", "San José de Maipo", "San Miguel", "San Pedro", "San Ramón", "Talagante", "Tiltil","Vitacura"],
    "ohiggins": ["Chépica", "Chimbarongo", "Codegua", "Coinco", "Coltauco", "Doñihue", "Graneros", "La Estrella", "La Unión", "Las Cabras", "Litueche", "Lolol", "Machalí", "Marchihue", "Mostazal", "Nancagua", "Navidad", "Olivar", "Peumo", "Pichidegua", "Pichilemu", "Pumanque", "Placilla", "Quinta de Tilcoco", "Rancagua", "San Fernando", "San Vicente de Tagua Tagua", "Santa Cruz"],
    "maule": ["Cauquenes", "Chanco", "Colbún", "Constitución", "Curicó", "Empredrado", "Hualañé", "Licantén", "Linares", "Longaví", "Maule", "Parral", "Pelarco", "Pelluhue", "Pencahue", "Rauco", "Retiro", "Romeral", "San Clemente", "San Javier", "San Rafael", "Talca", "Teno", "Vichuquén", "Villa Alegre", "Yerbas Buenas"],
    "ñuble": ["Bulnes", "Chillán", "Chillán Viejo", "Cobquecura", "Coelemu", "Coihueco", "El Carmen", "Ninhue", "Ñiquén", "Pemuco", "Pinto", "Portezuelo", "Quillón", "Quirihue", "Ránquil", "San Carlos", "San Fabián", "San Ignacio", "San Nicolás", "Treguaco", "Yungay"],
    "biobio": ["Alto Biobío", "Antuco", "Arauco", "Cabrero", "Cañete", "Chiguayante", "Cobquecura", "Concepción", "Contulmo", "Coronel", "Curanilahue", "Florida", "Hualpén", "Hualqui", "Lebu", "Los Álamos", "Los Ángeles", "Lota", "Mulchén", "Nacimiento", "Negrete", "Penco", "Quilleco", "Quilaco", "Quillón", "San Pedro de la Paz", "San Rosendo", "Santa Bárbara", "Santa Juana", "Talcahuano", "Tomé", "Tucapel", "Yumbel"],
    "araucania": ["Angol", "Carahue", "Cholchol", "Collipulli", "Cunco", "Curacautín", "Curarrehue", "Freire", "Galvarino", "Gorbea", "Lautaro", "Loncoche", "Lonquimay", "Los Sauces", "Lumaco", "Melipeuco", "Nueva Imperial", "Padre Las Casas", "Perquenco", "Pitrufquén", "Pucón", "Purén", "Renaico", "Saavedra", "Temuco", "Teodoro Schmidt", "Toltén", "Traiguén", "Victoria", "Vilcún", "Villarica", "Carahue"],
    "losrios": ["Corral", "Futrono", "La Unión", "Lago Ranco", "Lanco", "Los Lagos", "Mariquina", "Máfil", "Paillaco", "Río Bueno", "Valdivia", "Panguipulli"],
    "loslagos": ["Calbuco", "Castro", "Chaitén", "Chonchi", "Cochamó", "Curaco de Vélez", "Dalcahue", "Fresia", "Frutillar", "Futaleufú", "Hualaihué", "Llanquihue", "Los Muermos", "Maullín", "Osorno", "Palena", "Puerto Montt", "Puerto Octay", "Puerto Varas", "Puqueldón", "Purranque", "Puyehue", "Queilén", "Quellón", "Quemchi", "Quinchao", "Río Negro", "San Juan de la Costa", "San Pablo"],
    "aysen": ["Aysén", "Cisnes", "Chile Chico", "Cochrane", "Coyhaique", "Guaitecas", "Lago Verde", "O'Higgins", "Río Ibáñez", "Tortel"],
    "magallanes": ["Antártica", "Cabo de Hornos (Ex Navarino)", "Laguna Blanca", "Natales", "Punta Arenas", "Porvenir", "Primavera", "Río Verde", "San Gregorio", "Timaukel", "Torres del Paine"],
    "rapanui": ["Isla de Pascua"],
};

document.addEventListener('DOMContentLoaded', function() {
    const regionSelect = document.getElementById('region');
    const comunaSelect = document.getElementById('comuna');

    regionSelect.addEventListener('change', function() {
        const selectedRegion = regionSelect.value;
        const comunas = comunasPorRegion[selectedRegion] || [];

        console.log("Región seleccionada:", selectedRegion);
console.log("Comunas encontradas:", comunas);

       
        comunaSelect.innerHTML = '<option selected disabled>Seleccione comuna</option>';

        
        comunas.forEach(function(comuna) {
            const option = document.createElement('option');
            option.value = comuna;
            option.textContent = comuna;
            comunaSelect.appendChild(option);
        });
    });
});
