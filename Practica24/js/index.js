class CoolStore {
    constructor() {
        this.listaProductos = document.querySelector('#listaProductos');
        this.listaCategorias = document.querySelector('#listaCategorias');
        this.suggestionsList = document.getElementById('suggestionsList');
        this.carrito = [];
        this.URL = "http://localhost:3000/productos"; // URL para usar tu API
        this.productosObtenidos = [];
        this.init();
    }

    init() {
        document.addEventListener('DOMContentLoaded', async () => {
            await this.obtenerProductos();
            this.cargarCategorias();
            this.agregarEventListeners();
            this.aplicarTemaGuardado();
        });
    }

    async obtenerProductos() {
        try {
            const res = await fetch(this.URL);
            if (!res.ok) {
                throw new Error('Network response was not ok ' + res.statusText);
            }
            this.productosObtenidos = await res.json();
            this.renderProductos(this.productosObtenidos);
        } catch (error) {
            console.error('Fetch error:', error);
            alert('Hubo un problema al cargar los productos. Por favor, intente nuevamente más tarde.');
        }
    }

    renderProductos(productos) {
        this.listaProductos.innerHTML = '';
        productos.forEach(producto => {
            const col = document.createElement('div');
            col.className = 'col-sm-6 col-md-4 col-lg-3 d-flex'; // Ajustar el ancho de las tarjetas y usar flexbox
            col.innerHTML = `
                <div class="card flex-fill d-flex flex-column" role="region" aria-labelledby="product-${producto.id}">
                    <img src="${producto.image}" class="card-img-top imagenProducto" alt="${producto.name}">
                    <div class="card-body d-flex flex-column">
                        <h5 id="product-${producto.id}" class="card-title">${producto.title}</h5>
                        <p class="card-text">${producto.description.slice(0, 100)}...</p>
                        <p class="price">$${producto.price.toFixed(2)} USD</p>
                        <button class="btn btn-success mt-auto" onclick="store.agregarAlCarrito(${producto.id})" aria-label="Comprar ${producto.name}">
                            Comprar
                            <i class="bi bi-cart-plus-fill" id="cartB"></i>
                        </button>
                    </div>
                </div>
            `;
            this.listaProductos.appendChild(col);
        });
    }

    cargarCategorias() {
        const categorias = ['Electronics'];
        categorias.forEach(categoria => {
            const li = document.createElement('li');
            const a = document.createElement('a');
            a.className = 'dropdown-item';
            a.href = '#';
            a.textContent = categoria.charAt(0).toUpperCase() + categoria.slice(1);
            a.addEventListener('click', () => this.filtrarPorCategoria(categoria));
            li.appendChild(a);
            this.listaCategorias.appendChild(li);
        });
    }

    agregarEventListeners() {
        const searchForm = document.querySelector('form[role="search"]');
        const searchInput = document.getElementById('searchInput');
        searchForm.addEventListener('submit', (event) => this.buscarProductos(event));
        searchInput.addEventListener('input', () => this.mostrarSugerencias(searchInput.value));
        searchInput.addEventListener('keydown', (event) => {
            if (event.key === 'Escape' || searchInput.value === '') {
                this.limpiarSugerencias();
                this.renderProductos(this.productosObtenidos);
            }
        });

        const themeToggleButton = document.getElementById('themeToggleButton');
        themeToggleButton.addEventListener('click', () => this.toggleTema());

        // Accesibilidad del teclado para el botón de tema
        themeToggleButton.addEventListener('keydown', (event) => {
            if (event.key === 'Enter' || event.key === ' ') {
                themeToggleButton.click();
            }
        });
    }

    filtrarPorCategoria(categoria) {
        const productosFiltrados = this.productosObtenidos.filter(producto => producto.categoria.toLowerCase() === categoria.toLowerCase());
        this.renderProductos(productosFiltrados);
    }

    buscarProductos(event) {
        event.preventDefault();
        const query = event.target.querySelector('input[type="search"]').value.toLowerCase();
        if (query === '') {
            this.renderProductos(this.productosObtenidos);
        } else {
            const productosFiltrados = this.productosObtenidos.filter(producto => producto.name.toLowerCase().includes(query));
            this.renderProductos(productosFiltrados);
        }
    }

    mostrarSugerencias(query) {
        this.suggestionsList.innerHTML = '';
        if (query.length > 0) {
            const productosFiltrados = this.productosObtenidos.filter(producto => producto.name.toLowerCase().includes(query));
            productosFiltrados.forEach(producto => {
                const li = document.createElement('li');
                li.className = 'list-group-item';
                li.textContent = producto.name;
                li.addEventListener('click', () => {
                    document.getElementById('searchInput').value = producto.name;
                    this.renderProductos([producto]);
                    this.limpiarSugerencias();
                });
                li.setAttribute('role', 'option'); // Para accesibilidad
                this.suggestionsList.appendChild(li);
            });
        }
    }

    limpiarSugerencias() {
        this.suggestionsList.innerHTML = '';
    }

    agregarAlCarrito(idProducto) {
        const producto = this.productosObtenidos.find(producto => producto.id === idProducto);
        this.carrito.push(producto);
        this.actualizarCarrito();
    }

    eliminarDelCarrito(idProducto) {
        const index = this.carrito.findIndex(producto => producto.id === idProducto);
        if (index !== -1) {
            this.carrito.splice(index, 1); // Elimina solo una instancia del producto
        }
        this.actualizarCarrito();
    }

    actualizarCarrito() {
        const cartItems = document.getElementById('cartItems');
        cartItems.innerHTML = '';
        let total = 0;
        this.carrito.forEach(producto => {
            total += producto.price;
            const li = document.createElement('li');
            li.className = 'list-group-item d-flex justify-content-between align-items-center';
            li.innerHTML = `
                <div class="d-flex align-items-center">
                    <img src="${producto.image}" alt="${producto.name}" class="img-thumbnail" style="width: 50px; height: 50px; margin-right: 10px;">
                    <div>
                        <h6>${producto.name.slice(0, 30)}</h6>
                        <p>$${producto.price.toFixed(2)} USD</p>
                    </div>
                </div>
                <button class="btn btn-danger btn-sm" onclick="store.eliminarDelCarrito(${producto.id})" aria-label="Eliminar ${producto.name} del carrito">
                <i class="bi bi-trash3-fill"></i>
                </button>
            `;
            cartItems.appendChild(li);
        });

        const totalElement = document.createElement('li');
        totalElement.className = 'list-group-item d-flex justify-content-between align-items-center';
        totalElement.innerHTML = `
            <strong>Total:</strong>
            <span>$${total.toFixed(2)} USD</span>
        `;
        cartItems.appendChild(totalElement);

        const cartCountElement = document.getElementById('cartCount');
        cartCountElement.textContent = this.carrito.length;
        cartCountElement.setAttribute('aria-live', 'polite'); // Informar a los lectores de pantalla del cambio
    }

    aplicarTemaGuardado() {
        const body = document.body;
        const savedTheme = localStorage.getItem('theme');

        if (savedTheme) {
            body.classList.add(savedTheme);
        } else {
            body.classList.add('light-theme'); // Tema predeterminado
        }

        this.actualizarIconos();
    }

    toggleTema() {
        const body = document.body;

        body.classList.toggle('light-theme');
        body.classList.toggle('dark-theme');

        if (body.classList.contains('dark-theme')) {
            localStorage.setItem('theme', 'dark-theme');
        } else {
            localStorage.setItem('theme', 'light-theme');
        }

        this.actualizarIconos();
    }

    actualizarIconos() {
        const body = document.body;
        const sunIcon = document.getElementById('sunIcon');
        const moonIcon = document.getElementById('moonIcon');

        if (body.classList.contains('dark-theme')) {
            sunIcon.style.display = 'none';
            moonIcon.style.display = 'inline';
        } else {
            sunIcon.style.display = 'inline';
            moonIcon.style.display = 'none';
        }
    }
}

// Inicializar la tienda
const store = new CoolStore();
