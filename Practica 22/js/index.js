const fruits = ["mango","manzana","naranja","fresa","kiwi","platano"];

let size = fruits.length;
console.log(size);

contenido = "";
for (let i = 0; i < size; i++) {
    console.log(fruits[i]);
    contenido += fruits[i] + ",";

}

let lista1 = document.getElementById("lista1");
lista1.innerHTML = contenido;
console.log(lista1);
console.warn("La fruta es:", fruits);
console.error("La fruta es:", fruits);
console.info("La fruta es:", fruits);
console.table(fruits);
console.debug("La fruta es:", fruits);


let lista2 = document.getElementById("lista2");
lista2.innerHTML = fruits.join(" ***** ");
fruits.pop();
fruits.push(lista2);
console.log(fruits);
lista3.innerHTML = "lista3" + fruits.join(" ==== ");

let lista4 = document.getElementById("lista4");
//Imprimir en consola
console.log(fruits);
//Agregar a un elemento HTML
lista4.innerHTML = fruits.join(" ---- ");
//Agregar a un elemento HTML
fruits.shift();

fruits.push("sandia");
fruits.unshift("pera");

console.log(fruits);
console.log(fruits.sort());
console.log(fruits.reverse());
console.log(fruits.slice(1,3));


let lista5 = document.getElementById("lista5");

let frutas = fruits.slice(1,3);

const nombreMujeres = ["Greys","Denisse", "Saray"];
const nombreHombres = ["Jorge","Eduardo", "Jesus"];

let personas = nombreMujeres.concat(nombreHombres);
console.log(personas);

let lista6 = document.getElementById("lista6");
lista6.innerHTML = personas.join(" ---- ");
let buscar = document.getElementById("buscar");
let resultado = document.getElementById("resultado");



function buscarPersona() {
    let nombre = buscar.value;
    let indice = personas.indexOf(nombre);
    if (indice != -1) {
        resultado.innerHTML = "La persona se encuentra en la posición " + indice;
    } else {
        resultado.innerHTML = "La persona no se encuentra en la lista";
    }
}

let lista7 = document.getElementById("lista7");
let lista8 = document.getElementById("lista8");