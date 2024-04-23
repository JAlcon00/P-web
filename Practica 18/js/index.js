let a = 10;
let b = 20;
let sumar = a + b;
console.log(sumar);

let restar = a - b;
console.log(restar);

let multiplicar = a * b;
console.log(multiplicar);

let dividir = a / b;
console.log(dividir);

let modulo = a % b;
console.log(modulo);

let incremento = a++;
console.log(incremento);

let decremento = a--;
console.log(decremento);

let igual = a == b;
console.log(igual);

let diferente = a != b;
console.log(diferente);

let mayor = a > b;
console.log(mayor);

let menor = a < b;
console.log(menor);

let mayorIgual = a >= b;
console.log(mayorIgual);

let menorIgual = a <= b;
console.log(menorIgual);

let and = a > 5 && b < 30;
console.log(and);

let or = a > 5 || b < 30;
console.log(or);

let not = !(a > 5);
console.log(not);

let ternario = a > b ? "a es mayor que b" : "b es mayor que a";
console.log(ternario);

let igualdad = a === b;
console.log(igualdad);

let identico = a !== b;
console.log(identico);

let sumaAsignacion = a += b;
console.log(sumaAsignacion);

let restaAsignacion = a -= b;
console.log(restaAsignacion);

let multiplicacionAsignacion = a *= b;
console.log(multiplicacionAsignacion);

let divisionAsignacion = a /= b;
console.log(divisionAsignacion);

let moduloAsignacion = a %= b;
console.log(moduloAsignacion);

let andAsignacion = a &&= b;
console.log(andAsignacion);

let orAsignacion = a ||= b;
console.log(orAsignacion);

let notAsignacion = a != b;
console.log(notAsignacion);

//Funciones
function calcularAreaCirculo (radio) {
    //const PI = 3.1416;
    //let area = PI * radio * radio;
    let area = Math.PI * Math.pow(radio,2);
    return area;

}

console.log("Area del circulo",calcularAreaCirculo(10))

function toCelsius(farenheit){
    return (5/9)* (farenheit-32);

}

let temp = toCelsius(77);

console.log("Temperatura F° a C° es:"+temp + "°");


function doubleAge(porDos){
    return porDos * 2;
}

let Age = doubleAge(24);

console.log("La edad multiplicada por 2 es:"+Age);


let doubleAge2 = (xDos) => xDos * 2;

Age2 = doubleAge2(24);
console.log("La edad multiplicada por 2 es:"+Age2);


let hello = function(){
    return "Hola Mundo";
}

console.log(hello());

let hello2 = () => "Hola Mundo 2";
console.log(hello2())



