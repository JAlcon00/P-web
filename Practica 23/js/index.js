let formulario = document.getElementById('formAdd');
let nombre = document.getElementById('nombre');
let fecha = document.getElementById('fecha');
let descripcion = document.getElementById('descripcion');

let listaTareas = document.getElementById('listaTareas');

let tareas = [
    {
        nombre : "Hugo",
        fecha : "2024-05-14",
        descripcion : "Aprender JS"
    },
    {
        nombre : "Paco",
        fecha : "2024-05-14",
        descripcion : "Hacer tortas para todos"
    },
    {
        nombre : "Luis",
        fecha : "2024-05-14",
        descripcion : "Ver la pelicula Silk Road"
    }
];

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    agregarDatos();
});

let agregarDatos = () => {
    let tarea = {
        nombre: nombre.value,
        fecha: fecha.value,
        descripcion: descripcion.value
    };
    tareas.push(tarea);
    console.log(tareas);
};


let mostrarTareas = () => {
    listaTareas.innerHTML = "";
    tareas.forEach((tarea,indice) => {
        listaTareas.innerHTML += `
        <div class="row">
            <div class = "col-12 col-md-3 border p-3">
                <strong> ${tarea.nombre}</strong>
            </div>
        
        
            <div class = "col-12 col-md-3 border p-3">
                <strong> ${tarea.fecha}</strong>
            </div>
        
        
            <div class = "col-12 col-md-3 border p-3">
                <strong> ${tarea.descripcion}</strong>
            </div>
        
        <div class = "col col-md-3 border p-3 text-center">
            <button class="btn bg-success rounded ">
            <i class="bi bi-pencil-fill text-white"></i>
            </button> 
            <button class="btn btn-danger rounded ">
            <i class="bi bi-trash-fill"></i>
            </button> 
        </div>
        `
    });

}



mostrarTareas();