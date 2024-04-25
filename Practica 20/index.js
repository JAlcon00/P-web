let j = 500;
let nombre = "Jesús";

for(let j = 10; j <= 20; j++){
    console.log(j);
    console.log(nombre);
}

console.log("El valor de j después del ciclo es: ", j); // "después" tiene tilde
console.log("El valor de nombre después del ciclo es: ", nombre); // "después" tiene tilde

// const PI = Math.PI; // "Math" tiene la primera letra mayúscula
// console.log("El valor de PI es: ", PI); // "PI" en mayúsculas

const persona = {nombre: "Jesús", apellido: "Almanza", edad: 24, sexo: "M", estado_civil: "Soltero"};
console.log(persona.nombre);
console.log(persona.apellido);
console.log(persona.edad);
console.log(persona.sexo);
console.log(persona.estado_civil);

for(let propiedad in persona){
    console.log(propiedad, ":", persona[propiedad]); // La variable es "propiedad", no "propieda"
}

let marcas = ["Toyota", "Nissan", "Honda", "Porsche"]; // "Porsche" está mal escrito
let lista = document.getElementById("lista");
lista.innerHTML = "  "; // Vaciar el contenido anteriormente

for(let marca of marcas){
    console.log(marca);
    lista.innerHTML += "<li>" + marca + "</li>";
}

let movies = [
    {
        nombre: "Back to the future",
        genero: "Sci-fi",
        año: 1985,
        director: "Robert Zemeckis",
        protagonistas: ["Michael J. Fox", "Christopher Lloyd"],
        imagen: "https://m.media-amazon.com/images/M/MV5BZmU0M2Y1OGUtZjIxNi00ZjBkLTg1MjgtOWIyNThiZWIwYjRiXkEyXkFqcGdeQXVyMTQxNzMzNDI@._V1_.jpg"
    },
    {
        nombre: "The Godfather",
        genero: "Drama",
        año: 1972,
        director: "Francis Ford Coppola",
        protagonistas: ["Marlon Brando", "Al Pacino"],
        imagen: "https://m.media-amazon.com/images/M/MV5BM2MyNjYxNmUtYTAwNi00MTYxLWJmNWYtYzZlODY3ZTk3OTFlXkEyXkFqcGdeQXVyNzkwMjQ5NzM@._V1_FMjpg_UX1000_.jpg"
    },
    {
        nombre: "The Dark Knight",
        genero: "Action",
        año: 2008,
        director: "Christopher Nolan",
        protagonistas: ["Christian Bale", "Heath Ledger"],
        imagen: "https://m.media-amazon.com/images/M/MV5BMTMxNTMwODM0NF5BMl5BanBnXkFtZTcwODAyMTk2Mw@@._V1_.jpg"
    }
];

// Obtener el elemento donde se mostrarán las películas
let listaPeliculas = document.getElementById("listaPeliculas");

// Recorrer el arreglo de películas y mostrar la información de cada una
for (let i = 0; i < movies.length; i++) {
    let pelicula = movies[i];
    let protagonistas = pelicula.protagonistas.join(", "); // Convertir el arreglo de protagonistas a una cadena separada por comas

    // Crear elementos HTML para mostrar la información de la película
    let peliculaDiv = document.createElement("div");
    peliculaDiv.classList.add("pelicula");

    let imagen = document.createElement("img");
    imagen.src = pelicula.imagen;
    imagen.alt = pelicula.nombre;
    imagen.classList.add("imagen-pelicula");
    peliculaDiv.appendChild(imagen);

    let titulo = document.createElement("h2");
    titulo.textContent = pelicula.nombre;
    peliculaDiv.appendChild(titulo);

    let detalles = document.createElement("p");
    detalles.innerHTML = `<strong>Género:</strong> ${pelicula.genero}<br>
                          <strong>Año:</strong> ${pelicula.año}<br>
                          <strong>Director:</strong> ${pelicula.director}<br>
                          <strong>Protagonistas:</strong> ${protagonistas}`;
    peliculaDiv.appendChild(detalles);

    // Agregar la película al contenedor
    listaPeliculas.appendChild(peliculaDiv);
}
