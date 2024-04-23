let hora = 14;

if(hora < 12){
    console.log("Buenos días");
}else if(hora > 12){
    console.log("Buenas tardes");
}else{
    console.log("Buenas noches");
}


let diaSemana = new Date().getDay();

console.log(diaSemana);

switch(diaSemana){
    case 0:
        console.log("Domingo");
        break;
    case 1:
        console.log("Lunes");
        break;
    case 2:
        console.log("Martes");
        break;
    case 3:
        console.log("Miercoles");
        break;
    case 4:
        console.log("Jueves");
        break;
    case 5:
        console.log("Viernes");
        break;
    case 6:
        console.log("Sabado");
        break;
    default:
}
