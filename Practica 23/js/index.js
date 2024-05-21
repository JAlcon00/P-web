let formulario = document.getElementById('formAdd');
let nombre = document.getElementById('nombre');
let fecha = document.getElementById('fecha');
let descripcion = document.getElementById('descripcion');

let listaTareas = document.getElementById('listaTareas');
let btnGuardar = document.getElementById('btnGuardar');
let btnDelete = document.getElementById('btnDelete');
let btnEdit = document.getElementById('btnEdit');



let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
/*
let tareas = [
    {
        nombre: "Hugo",
        fecha: "2024-05-14",
        descripcion: "Aprender JS"
    },
    {
        nombre: "Paco",
        fecha: "2024-05-14",
        descripcion: "Hacer tortas para todos"
    },
    {
        nombre: "Luis",
        fecha: "2024-05-14",
        descripcion: "Ver la pelicula Silk Road"
    }
];
*/




formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    agregarDatos();
    mostrarTareas();
    cerrarModal();
    resetForm();
    deleteTask();
    //editTask();


});

let cerrarModal = () => {
    btnGuardar.setAttribute(
        "data-bs-dismiss", "modal"

    );

    btnGuardar.click();
}

let deleteTask = () => {
    let btnDelete = document.querySelectorAll('#btnDelete');
    btnDelete.forEach((boton, indice) => {
        boton.addEventListener('click', () => {
            // Pregunta al usuario si está seguro de que quiere eliminar la tarea
            if (confirm('¿Estás seguro de que quieres eliminar esta tarea?')) {
                console.log('delete... ', indice + 1);
                tareas.splice(indice, 1);
                mostrarTareas();
                deleteTask();
            } else {
                console.log('Eliminación cancelada');
            }
        });
    });
};




let resetForm = () => {
    nombre.value = "";
    fecha.value = "";
    descripcion.value = "";

}

let agregarDatos = () => {
    tareas.push({
        nombre: nombre.value,
        fecha: fecha.value,
        descripcion: descripcion.value
    });

};


let mostrarTareas = () => {
    listaTareas.innerHTML = "";
    tareas.forEach((tarea, indice) => {
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
            <button id="btnEdit" class="btn bg-success rounded m-1" data-bs-toggle="modal" data-bs-target="#editModal">
            <i class="bi bi-pencil-fill text-white"></i>
            </button> 
            <button id="btnDelete" class="btn btn-danger rounded m-1 ">
            <i class="bi bi-trash-fill"></i>
            </button> 
        </div>
        `
    });

    deleteTask();
    

}



mostrarTareas();