
fetch('http://localhost:3000/productos')
  .then(response => response.json())
  .then(data => mostrarData(data))
  .catch(error => {
    console.log('Error cargando productos:', error);
   
    document.getElementById('matrimonios').innerHTML = '<div class="col-12 text-center"><p>Error cargando productos. Por favor, recarga la página.</p></div>';
  });

const mostrarData = (data) => {
  console.log(data);
  let cards = "";

  for (let i = 0; i < data.length; i++) {
    cards += `
      <div class="col-md-4 mb-4">
      <div class="card shadow-sm h-100 d-flex flex-column">
      <a href="detalleProductos.html?nombre=${encodeURIComponent(data[i].nombre)}&foto=${encodeURIComponent(data[i].foto)}&precio=${encodeURIComponent(data[i].precio)}&descripcion=${encodeURIComponent(data[i].descripcion)}" target="_blank">
      <img src="${data[i].foto}" class="card-img-top" alt="${data[i].nombre}" style="height:200px; object-fit:cover;">
      </a>
      <div class="card-body text-center d-flex flex-column flex-grow-1">
      <h5 class="card-title">${data[i].nombre}</h5>
      <p class="card-text flex-grow-1">${data[i].descripcion}</p>
      <div>
        <p class="text-success fw-bold mb-2">$${data[i].precio}</p>
        <a href="detalleProductos.html?nombre=${encodeURIComponent(data[i].nombre)}&foto=${encodeURIComponent(data[i].foto)}&precio=${encodeURIComponent(data[i].precio)}&descripcion=${encodeURIComponent(data[i].descripcion)}" 
         class="btn btn-outline-primary btn-sm">
        Ver más
        </a>
      </div>
      </div>
      </div>
      </div>
    `;
  }

  
  document.getElementById('matrimonios').innerHTML = cards;
};


