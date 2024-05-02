let lista2 = document.getElementById("lista");
let texto = "Hola mi nombre es Jesús y cumplo años el 4 de septiembre"
console.log(texto);

lista2.innerHTML = texto;

texto = `Esto es una cadena `

let text = `cadena multilinea
La salle 
Alumno 301
Edta semana comienzan los examenes del segundo paracial
suerte 
`




let a = 5;
let b = 10;

let resultado = `El resultado de la suma es ${a} + ${b} es = ${a+b} 

<ul>
    <li> Suma: ${a+b} </li>
    <li> Multiplica: ${a*b}</li>
    <li> Divide: ${a/b}</li>
    <li> Resta: ${a%b}</li>
</ul>


`;

console.log(resultado);
lista.innerHTML = resultado;


let persona = 'Jesus';
let edad = 24;
let ciudad = 'Mexico';
let ocupacion = 'Estudiante';
let cadena = 'my name is';

function miFuncion (cadenas, personaX, edadExp, ocupacionX, ciudadX){
    let resultado = '';
    resultado += cadenas + "\nNombre: " + personaX + "\nEdad: " + edadExp + "\nOcupacion: " + ocupacionX + "\nCiudad: " + ciudadX;
    resultado = `
    ${cadenas[0]}
    Nombre: ${personaX}
    Edad: ${edadExp}
    Ocupacion: ${ocupacionX}
    Ciudad: ${ciudadX}
    `
    console.log(resultado);
    return resultado;
    


}
miFuncion(cadena, persona, edad, ocupacion, ciudad);


let mensaje = miFuncion`Hola mi nombre es ${persona} y tengo ${edad} años, soy ${ocupacion} y vivo en ${ciudad}`;
console.log(mensaje);


function showName (name){
    console.log(name);
    return name;
}

let resultTwo = showName`Jesus`;

let titulo = "Ganadores de los oscares 2024";

let peliculas = ["Billie Elish",
"Jhonny Deep",
"Ariana Grande"];

let listaPeliculas = `<h1>${titulo}</h1>`;
peliculas.forEach((elemento) => {
    listaPeliculas += `<li>${elemento}</li>`;
});
listaPeliculas += `</ul>`;

console.log(listaPeliculas);

lista.innerHTML = listaPeliculas;
