
document.addEventListener('DOMContentLoaded', function() {
   
    initializeAdmin();
    loadRegions();
    loadDashboardData();
});

// Definir bootstrap desde el objeto global
const bootstrap = window.bootstrap;


let currentEditingProduct = null;
let currentEditingUser = null;


const regionsData = {
    'Metropolitana': ['Santiago', 'Providencia', 'Las Condes', 'Ñuñoa', 'Maipú', 'Pudahuel', 'La Florida', 'San Miguel', 'La Granja', 'La Pintana'],
    'Valparaíso': ['Valparaíso', 'Viña del Mar', 'Quilpué', 'Villa Alemana', 'San Antonio', 'Quillota', 'Los Andes', 'San Felipe'],
    'Biobío': ['Concepción', 'Talcahuano', 'Chillán', 'Los Ángeles', 'Coronel', 'Lota', 'Penco', 'Tomé'],
    'Araucanía': ['Temuco', 'Padre Las Casas', 'Villarrica', 'Pucón', 'Angol', 'Victoria', 'Traiguén', 'Lautaro'],
    'Los Lagos': ['Puerto Montt', 'Osorno', 'Valdivia', 'Castro', 'Ancud', 'Quellón', 'Frutillar', 'Puerto Varas']
};


async function initializeAdmin() {
    console.log('Inicializando administrador...');
    
    
    await loadProductsFromJSON();
    loadUsers();
    
   
    console.log('Funciones disponibles:', {
        loadProducts: typeof loadProducts,
        loadUsers: typeof loadUsers,
        showProductForm: typeof showProductForm,
        showUserForm: typeof showUserForm
    });
}


function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}


function logout() {
    localStorage.removeItem('currentUser');
    alert('Sesión cerrada exitosamente');
    window.location.href = 'formularioInicio.html';
}


function clearAndReloadProducts() {
    if (confirm('¿Está seguro de que desea recargar todos los productos desde el JSON? Esto eliminará cualquier modificación realizada.')) {
        localStorage.removeItem('adminProducts');
        loadProductsFromJSON();
        alert('Productos recargados desde JSON exitosamente');
    }
}


function loadSection(section) {
   
    document.querySelectorAll('.section').forEach(sec => {
        sec.classList.add('d-none');
    });
    
    
    document.querySelectorAll('.sidebar-nav a').forEach(link => {
        link.classList.remove('active');
    });
    
    
    document.getElementById(section + '-section').classList.remove('d-none');
    
    
    document.getElementById('nav-' + section).classList.add('active');
    
   
    const titles = {
        'dashboard': 'Dashboard',
        'products': 'Gestión de Productos',
        'users': 'Gestión de Usuarios',
        'orders': 'Gestión de Órdenes',
        'reports': 'Reportes y Estadísticas',
        'settings': 'Configuración del Sistema'
    };
    document.getElementById('page-title').textContent = titles[section];
    
    
    if (section === 'products') {
        loadProducts();
    } else if (section === 'users') {
        loadUsers();
    } else if (section === 'dashboard') {
        loadDashboardData();
    }
}


function loadDashboardData() {
    const products = JSON.parse(localStorage.getItem('adminProducts')) || [];
    const users = JSON.parse(localStorage.getItem('adminUsers')) || [];
    
    document.getElementById('total-products').textContent = products.length;
    document.getElementById('total-users').textContent = users.length;
    document.getElementById('total-orders').textContent = '0'; 
    document.getElementById('total-sales').textContent = '$0'; 
}


function loadRegions() {
    const regionSelect = document.getElementById('userRegion');
    regionSelect.innerHTML = '<option value="">Seleccione región</option>';
    
    Object.keys(regionsData).forEach(region => {
        const option = document.createElement('option');
        option.value = region;
        option.textContent = region;
        regionSelect.appendChild(option);
    });
    
    
    regionSelect.addEventListener('change', function() {
        loadComunas(this.value);
    });
}


function loadComunas(region) {
    const comunaSelect = document.getElementById('userComuna');
    comunaSelect.innerHTML = '<option value="">Seleccione comuna</option>';
    
    if (region && regionsData[region]) {
        regionsData[region].forEach(comuna => {
            const option = document.createElement('option');
            option.value = comuna;
            option.textContent = comuna;
            comunaSelect.appendChild(option);
        });
    }
}



function showProductForm(product = null) {
    currentEditingProduct = product;
    const modal = new bootstrap.Modal(document.getElementById('productModal'));
    const title = document.getElementById('productModalTitle');
    
    if (product) {
        title.textContent = 'Editar Producto';
        fillProductForm(product);
    } else {
        title.textContent = 'Nuevo Producto';
        document.getElementById('productForm').reset();
        clearProductValidation();
    }
    
  modal.show();
}


function fillProductForm(product) {
    document.getElementById('productCode').value = product.codigo || '';
    document.getElementById('productName').value = product.nombre || '';
    document.getElementById('productDescription').value = product.descripcion || '';
    document.getElementById('productPrice').value = product.precio || '';
    document.getElementById('productStock').value = product.stock || '';
    document.getElementById('productCriticalStock').value = product.stockCritico || '';
    document.getElementById('productCategory').value = product.categoria || '';
}


function saveProduct() {
    if (validateProductForm()) {
        const product = {
            codigo: document.getElementById('productCode').value,
            nombre: document.getElementById('productName').value,
            descripcion: document.getElementById('productDescription').value,
            precio: parseFloat(document.getElementById('productPrice').value),
            stock: parseInt(document.getElementById('productStock').value),
            stockCritico: parseInt(document.getElementById('productCriticalStock').value) || 0,
            categoria: document.getElementById('productCategory').value,
            imagen: document.getElementById('productImage').files[0] ? 
                   URL.createObjectURL(document.getElementById('productImage').files[0]) : 
                   (currentEditingProduct ? currentEditingProduct.imagen : '')
        };
        
        let products = JSON.parse(localStorage.getItem('adminProducts')) || [];
        
        if (currentEditingProduct) {
           
            const index = products.findIndex(p => p.codigo === currentEditingProduct.codigo);
            if (index !== -1) {
                products[index] = product;
            }
        } else {
          
            products.push(product);
        }
        
        localStorage.setItem('adminProducts', JSON.stringify(products));
        
        
        bootstrap.Modal.getInstance(document.getElementById('productModal')).hide();
        
        
        console.log('Producto guardado:', product);
        console.log('Total productos en localStorage:', JSON.parse(localStorage.getItem('adminProducts')).length);
        
        loadProducts();
        loadDashboardData();
        
        showAlert('Producto guardado exitosamente', 'success');
    }
}


function validateProductForm() {
    let isValid = true;
    clearProductValidation();
    
    
    const codigo = document.getElementById('productCode').value;
    if (!codigo || codigo.length < 3) {
        showFieldError('productCode', 'El código debe tener al menos 3 caracteres');
        isValid = false;
    }
    

    const nombre = document.getElementById('productName').value;
    if (!nombre || nombre.length > 100) {
        showFieldError('productName', 'El nombre es requerido y máximo 100 caracteres');
        isValid = false;
    }
    
    
    const descripcion = document.getElementById('productDescription').value;
    if (descripcion && descripcion.length > 500) {
        showFieldError('productDescription', 'La descripción no puede exceder 500 caracteres');
        isValid = false;
    }


    const precio = document.getElementById('productPrice').value;
    if (!precio || precio < 0) {
        showFieldError('productPrice', 'El precio es requerido y debe ser mayor o igual a 0');
        isValid = false;
    }
    
    
    const stock = document.getElementById('productStock').value;
    if (!stock || stock < 0) {
        showFieldError('productStock', 'El stock es requerido y debe ser mayor o igual a 0');
        isValid = false;
    }
    
    
    const stockCritico = document.getElementById('productCriticalStock').value;
    if (stockCritico && stockCritico < 0) {
        showFieldError('productCriticalStock', 'El stock crítico debe ser mayor o igual a 0');
        isValid = false;
    }
    
   
    const categoria = document.getElementById('productCategory').value;
    if (!categoria) {
        showFieldError('productCategory', 'La categoría es requerida');
        isValid = false;
    }
    
    return isValid;
}


async function loadProductsFromJSON() {
    console.log('Cargando productos desde JSON...');
    
    try {
        
        const response = await fetch('JSON/productos.json');
        const data = await response.json();
        const jsonProducts = data.productos || [];
        
        console.log('Productos encontrados en JSON:', jsonProducts.length);
        
       
        const productsWithCodes = jsonProducts.map((product, index) => {
            const codigo = generateProductCode(product.nombre, index + 1);
            return {
                codigo: codigo,
                nombre: product.nombre,
                descripcion: product.descripcion,
                precio: product.precio,
                stock: 0, 
                stockCritico: 5, 
                categoria: 'General',
                imagen: product.foto
            };
        });
        
        
        localStorage.setItem('adminProducts', JSON.stringify(productsWithCodes));
        
        
        displayProducts(productsWithCodes);
        
        console.log('Productos cargados desde JSON:', productsWithCodes.length);
        
        
        showProductsInfo(productsWithCodes);
        
     
        showAlert(`✅ ${productsWithCodes.length} productos cargados desde JSON`, 'success');
        
        return productsWithCodes;
        
    } catch (error) {
        console.error('Error al cargar productos desde JSON:', error);
        
        const products = JSON.parse(localStorage.getItem('adminProducts')) || [];
        displayProducts(products);
        return products;
    }
}


async function loadProducts() {
    console.log('Cargando productos...');
    
    try {
        
        const response = await fetch('JSON/productos.json');
        const data = await response.json();
        const jsonProducts = data.productos || [];
        
      
        let existingProducts = JSON.parse(localStorage.getItem('adminProducts')) || [];
        
       
        const productsWithCodes = jsonProducts.map((product, index) => {
            
            const existingProduct = existingProducts.find(p => p.nombre === product.nombre);
            
            if (existingProduct) {
                return existingProduct; 
            } else {
                
                const codigo = generateProductCode(product.nombre, index + 1);
                return {
                    codigo: codigo,
                    nombre: product.nombre,
                    descripcion: product.descripcion,
                    precio: product.precio,
                    stock: 0, 
                    stockCritico: 5, 
                    categoria: 'General', 
                    imagen: product.foto
                };
            }
        });
        
        
        localStorage.setItem('adminProducts', JSON.stringify(productsWithCodes));
        
       
        displayProducts(productsWithCodes);
        
        console.log('Productos cargados desde JSON:', productsWithCodes.length);
        
       
        showProductsInfo(productsWithCodes);
        
    } catch (error) {
        console.error('Error al cargar productos:', error);
        
        const products = JSON.parse(localStorage.getItem('adminProducts')) || [];
        displayProducts(products);
    }
}


function generateProductCode(nombre, index) {
    
    const prefix = nombre.substring(0, 3).toUpperCase().replace(/[^A-Z]/g, '');
    const number = index.toString().padStart(3, '0');
    return `${prefix}${number}`;
}


function displayProducts(products) {
    const tbody = document.getElementById('products-table');
    
    if (!tbody) {
        console.log('Tabla de productos no encontrada');
        return;
    }
    
    tbody.innerHTML = '';
    
    if (products.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-muted">
                    <i class="fas fa-box fa-2x mb-2"></i><br>
                    No hay productos registrados
                </td>
            </tr>
        `;
        return;
    }
    
    products.forEach(product => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><strong>${product.codigo}</strong></td>
            <td>${product.nombre}</td>
            <td>$${product.precio.toLocaleString()}</td>
            <td>
                <span class="badge ${product.stock <= (product.stockCritico || 0) ? 'bg-danger' : 'bg-success'}">
                    ${product.stock}
                </span>
                ${product.stock <= (product.stockCritico || 0) ? '<small class="text-danger d-block">Stock crítico</small>' : ''}
            </td>
            <td>${product.categoria}</td>
            <td>
                <button class="btn btn-sm btn-warning me-2" onclick="showProductForm(${JSON.stringify(product).replace(/"/g, '&quot;')})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteProduct('${product.codigo}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    console.log(`Cargados ${products.length} productos`);
}


function showProductsInfo(products) {
    const newProducts = products.filter(p => p.stock === 0); 
    const existingProducts = products.filter(p => p.stock > 0);
    
    if (newProducts.length > 0) {
        console.log(`📦 ${newProducts.length} productos nuevos cargados desde JSON:`);
        newProducts.forEach(product => {
            console.log(`   - ${product.codigo}: ${product.nombre} ($${product.precio.toLocaleString()})`);
        });
    }
    
    if (existingProducts.length > 0) {
        console.log(`✅ ${existingProducts.length} productos existentes actualizados`);
    }
}


function showAlert(message, type = 'info') {
   
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type === 'error' ? 'danger' : type} alert-dismissible fade show`;
    alertDiv.style.position = 'fixed';
    alertDiv.style.top = '20px';
    alertDiv.style.right = '20px';
    alertDiv.style.zIndex = '9999';
    alertDiv.style.minWidth = '300px';
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    
    document.body.appendChild(alertDiv);
    
    
    setTimeout(() => {
        if (alertDiv.parentNode) {
            alertDiv.remove();
        }
    }, 5000);
}


function deleteProduct(codigo) {
    if (confirm('¿Está seguro de eliminar este producto?')) {
        let products = JSON.parse(localStorage.getItem('adminProducts')) || [];
        products = products.filter(p => p.codigo !== codigo);
        localStorage.setItem('adminProducts', JSON.stringify(products));
        loadProducts();
        loadDashboardData();
        showAlert('Producto eliminado exitosamente', 'success');
    }
}


function showUserForm(user = null) {
    currentEditingUser = user;
    const modal = new bootstrap.Modal(document.getElementById('userModal'));
    const title = document.getElementById('userModalTitle');
    
    if (user) {
        title.textContent = 'Editar Usuario';
        fillUserForm(user);
    } else {
        title.textContent = 'Nuevo Usuario';
        document.getElementById('userForm').reset();
        clearUserValidation();
    }
    
    modal.show();
}


function fillUserForm(user) {
    document.getElementById('userRun').value = user.run || '';
    document.getElementById('userType').value = user.tipo || '';
    document.getElementById('userName').value = user.nombre || '';
    document.getElementById('userLastName').value = user.apellidos || '';
    document.getElementById('userEmail').value = user.correo || '';
    document.getElementById('userBirthDate').value = user.fechaNacimiento || '';
    document.getElementById('userRegion').value = user.region || '';
    document.getElementById('userComuna').value = user.comuna || '';
    document.getElementById('userAddress').value = user.direccion || '';
    
    
    if (user.region) {
        loadComunas(user.region);
    }
}


function saveUser() {
    if (validateUserForm()) {
        const user = {
            run: document.getElementById('userRun').value,
            tipo: document.getElementById('userType').value,
            nombre: document.getElementById('userName').value,
            apellidos: document.getElementById('userLastName').value,
            correo: document.getElementById('userEmail').value,
            fechaNacimiento: document.getElementById('userBirthDate').value,
            region: document.getElementById('userRegion').value,
            comuna: document.getElementById('userComuna').value,
            direccion: document.getElementById('userAddress').value
        };
        
        let users = JSON.parse(localStorage.getItem('adminUsers')) || [];
        
        if (currentEditingUser) {
            
            const index = users.findIndex(u => u.run === currentEditingUser.run);
            if (index !== -1) {
                users[index] = user;
            }
        } else {
            
            users.push(user);
        }
        
        localStorage.setItem('adminUsers', JSON.stringify(users));
        
        
        bootstrap.Modal.getInstance(document.getElementById('userModal')).hide();
        
        
        console.log('Usuario guardado:', user);
        console.log('Total usuarios en localStorage:', JSON.parse(localStorage.getItem('adminUsers')).length);
        
        loadUsers();
        loadDashboardData();
        
        showAlert('Usuario guardado exitosamente', 'success');
    }
}


function validateUserForm() {
    let isValid = true;
    clearUserValidation();
    
    
    const run = document.getElementById('userRun').value;
    if (!run || run.length < 7 || run.length > 9) {
        showFieldError('userRun', 'El RUN debe tener entre 7 y 9 caracteres');
        isValid = false;
    } else if (!validateRun(run)) {
        showFieldError('userRun', 'El RUN no es válido');
        isValid = false;
    }
    
    
    const tipo = document.getElementById('userType').value;
    if (!tipo) {
        showFieldError('userType', 'El tipo de usuario es requerido');
        isValid = false;
    }
 

    const nombre = document.getElementById('userName').value;
    if (!nombre || nombre.length > 50) {
        showFieldError('userName', 'El nombre es requerido y máximo 50 caracteres');
        isValid = false;
    }
    
    
    const apellidos = document.getElementById('userLastName').value;
    if (!apellidos || apellidos.length > 100) {
        showFieldError('userLastName', 'Los apellidos son requeridos y máximo 100 caracteres');
        isValid = false;
    }
    
    
    const correo = document.getElementById('userEmail').value;
    if (!correo || correo.length > 100) {
        showFieldError('userEmail', 'El correo es requerido y máximo 100 caracteres');
        isValid = false;
    } else if (!validateEmail(correo)) {
        showFieldError('userEmail', 'El correo debe ser @duoc.cl, @profesor.duoc.cl o @gmail.com');
        isValid = false;
    }
    
    
    const region = document.getElementById('userRegion').value;
    if (!region) {
        showFieldError('userRegion', 'La región es requerida');
        isValid = false;
    }
    
   
    const comuna = document.getElementById('userComuna').value;
    if (!comuna) {
        showFieldError('userComuna', 'La comuna es requerida');
        isValid = false;
    }
    
    
    const direccion = document.getElementById('userAddress').value;
    if (!direccion || direccion.length > 300) {
        showFieldError('userAddress', 'La dirección es requerida y máximo 300 caracteres');
        isValid = false;
    }
    
    return isValid;
}


function validateRun(run) {
    
    const cleanRun = run.replace(/[.-]/g, '');
    
    
    if (!/^[0-9]{7,8}[0-9Kk]$/.test(cleanRun)) {
        return false;
    }
    
    

    return true;
}


function validateEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@(duoc\.cl|profesor\.duoc\.cl|gmail\.com)$/;
    return regex.test(email);
}


function loadUsers() {
    const users = JSON.parse(localStorage.getItem('adminUsers')) || [];
    const tbody = document.getElementById('users-table');
    
    if (!tbody) {
        console.log('Tabla de usuarios no encontrada');
        return;
    }
    
    tbody.innerHTML = '';
    
    if (users.length === 0) {
        tbody.innerHTML = `
            <tr>
                <td colspan="6" class="text-center text-muted">
                    <i class="fas fa-users fa-2x mb-2"></i><br>
                    No hay usuarios registrados
                </td>
            </tr>
        `;
        return;
    }
    
    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${user.run}</td>
            <td>${user.nombre}</td>
            <td>${user.apellidos}</td>
            <td>${user.correo}</td>
            <td>
                <span class="badge ${getUserTypeBadge(user.tipo)}">
                    ${user.tipo}
                </span>
            </td>
            <td>
                <button class="btn btn-sm btn-warning me-2" onclick="showUserForm(${JSON.stringify(user).replace(/"/g, '&quot;')})">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="btn btn-sm btn-danger" onclick="deleteUser('${user.run}')">
                    <i class="fas fa-trash"></i>
                </button>
            </td>
        `;
        tbody.appendChild(row);
    });
    
    console.log(`Cargados ${users.length} usuarios`);
}


function getUserTypeBadge(tipo) {
    switch(tipo) {
        case 'administrador': return 'bg-danger';
        case 'vendedor': return 'bg-warning';
        case 'cliente': return 'bg-success';
        default: return 'bg-secondary';
    }
}


function deleteUser(run) {
    if (confirm('¿Está seguro de eliminar este usuario?')) {
        let users = JSON.parse(localStorage.getItem('adminUsers')) || [];
        users = users.filter(u => u.run !== run);
        localStorage.setItem('adminUsers', JSON.stringify(users));
        loadUsers();
        loadDashboardData();
        showAlert('Usuario eliminado exitosamente', 'success');
    }
}



function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const feedback = field.parentNode.querySelector('.invalid-feedback');
    
    field.classList.add('is-invalid');
    feedback.textContent = message;
}


function clearProductValidation() {
    const fields = ['productCode', 'productName', 'productDescription', 'productPrice', 'productStock', 'productCriticalStock', 'productCategory'];
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        field.classList.remove('is-invalid');
    });
}


function clearUserValidation() {
    const fields = ['userRun', 'userType', 'userName', 'userLastName', 'userEmail', 'userRegion', 'userComuna', 'userAddress'];
    fields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        field.classList.remove('is-invalid');
    });
}


// showAlert definido previamente; se evita duplicación


function testAdmin() {
    console.log('=== PRUEBA DEL ADMINISTRADOR ===');
    
   
    const products = JSON.parse(localStorage.getItem('adminProducts')) || [];
    const users = JSON.parse(localStorage.getItem('adminUsers')) || [];
    
    console.log('Productos en localStorage:', products);
    console.log('Usuarios en localStorage:', users);
    
    
    const productsTable = document.getElementById('products-table');
    const usersTable = document.getElementById('users-table');
    
    console.log('Tabla de productos encontrada:', !!productsTable);
    console.log('Tabla de usuarios encontrada:', !!usersTable);
    
    
    console.log('Funciones disponibles:', {
        loadProducts: typeof loadProducts,
        loadUsers: typeof loadUsers,
        showProductForm: typeof showProductForm,
        showUserForm: typeof showUserForm,
        saveProduct: typeof saveProduct,
        saveUser: typeof saveUser
    });
    
    
    loadProducts();
    loadUsers();
    
    console.log('=== FIN DE LA PRUEBA ===');
}


window.testAdmin = testAdmin;

try {
  Object.assign(window, {
    getCurrentUser,
    logout,
    clearAndReloadProducts,
    loadSection,
    deleteProduct,
    deleteUser,
  })
} catch { void 0 }
