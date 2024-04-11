let numero = 100;

console.log(numero); // imprime el valor de la variable "numero"

let Decimal = 100.5;

// Imprimir solo los decimales

console.log(Decimal);


let texto = "Hola Mundo";
let texto2 = 'Hola Mundo';

let booleano = true; // verdadero


let arreglo = [1,2,3,4,5]; // arreglo de numeros



let arreglo2 = ["a", "b", "c", "d"]; // arreglo de letras

console.log(arreglo[3]);

console.log(arreglo2[2]);


let objeto = {
    nombre: "Juan",
    apellido: "Perez",
    edad: 25
};

console.log("Nombre: "+objeto.nombre);
console.log("Apellido: "+objeto.apellido);
console.log("Edad: "+objeto.edad);


let estudiante = {
    nombre: "Jesus",
    apellido: "Almanza",
    edad: 24,
    cursando: "Ing. software y sistemas computacionales",
    cursos: ["Matematicas", "BD", "Programación", "Redes", "IA"],
    amigos : [
    ,{
        nombre: "Juan",
        apellido: "Perez",
        edad: 25
    },
    {
        nombre: "Maria",
        apellido: "Lopez",
        edad: 24
    },
    {
        nombre: "Jose",
        apellido: "Gomez",
        edad: 23
    }]
};

console.log("Estudiante");
console.log("Nombre: "+estudiante.nombre);
console.log("Apellido: "+estudiante.apellido);
console.log("Edad: "+estudiante.edad);
console.log("Cursando: "+estudiante.cursando);
console.log("Cursos: "+estudiante.cursos[3]);
console.log("Amigos: "+estudiante.amigos[1].nombre);

let variable = 10;
console.log(typeof variable);
variable="Hola";
console.log(typeof variable);
variable=true;
console.log(typeof variable);
variable={};
console.log(typeof variable);
variable=[];
console.log(typeof variable);



