let listaProductos = document.querySelector('#listaProductos');
let listaCategorias = document.querySelector('#listaCategorias');
let carrito = [];

const URL = "https://fakestoreapi.com/products/";

fetch(URL)
    .then(res => res.json())
    .then(productosObtenidos => { 
        console.log(productosObtenidos);
        listaProductos.innerHTML = "";
        productosObtenidos.forEach( (producto, indice) => {
            listaProductos.innerHTML += ` 
            <div class="col-12 col-md-3 py-5">
                <div class="card">
                    <img src="${producto.image}" class="p-3 imagenProducto card-img-top" alt="...">
                    <div class="card-body">
                        <h5 class="card-title">${ producto.title.slice(0,30) }</h5>
                        <p class="card-text">${ producto.description.slice(0,100) }</p>
                        <p class="card-text text-danger">${ producto.price }</p>
                        <a href="#" class="btn btn-primary">Comprar</a>
                    </div>
                </div>
            </div> 
            `;
        });

});

fetch(URL)

