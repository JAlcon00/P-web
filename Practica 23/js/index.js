const API_KEY_YOUTUBE = 'AIzaSyCTSsWm16ns69UCKU8lJrvpf-4_kL6tRqk';
const SPOTIFY_CLIENT_ID = '086613426ca7418ba044d01d330e27b9';
const SPOTIFY_CLIENT_SECRET = '23b79a5b7cc24b19a5c0b8ae68e7f368';
const SPOTIFY_TOKEN = 'BQA5Rz3r6kBMpmp34CydJPRwx6YcJ6hE7CxFhnYA7zpSGm6kXOfT-bMsrOhf733ZHnrnnAhwtq8ni-0XGexisywlwRD_2eyvZRYY7AHi7YBVE1ZGdnIUuVZGXIhcPLF0NgAe5IgJhg9ajlXo7g7GQlXjOE-uXtHqAGPeticACAe5C00MncPwiknUVLQ6ZdRrUHQlAFjwOqok84NtB9NTDYAakgHWfr5cFVLj3BFpA0B5TiMYsY27F2FIPfKiwtlSaX5F70SbXlN4ciTRhaeq';  // Añade tu token de Spotify aquí

let formulario = document.getElementById('formAdd');
let nombre = document.getElementById('nombre');
let fecha = document.getElementById('fecha');
let descripcion = document.getElementById('descripcion');
let videoUrl = document.getElementById('videoUrl');
let audioUrl = document.getElementById('audioUrl');

let formEdit = document.getElementById('formEdit');
let nombreEdit = document.getElementById('nombreEdit');
let fechaEdit = document.getElementById('fechaEdit');
let descripcionEdit = document.getElementById('descripcionEdit');
let videoUrlEdit = document.getElementById('videoUrlEdit');
let audioUrlEdit = document.getElementById('audioUrlEdit');

let listaTareas = document.getElementById('listaTareas');
let btnGuardar = document.getElementById('btnGuardar');
let btnGuardarEditar = document.getElementById('btnGuardarEditar');



let tareas = JSON.parse(localStorage.getItem('tareas')) || [];
let tareaActual = -1;

function obtenerDatosFormulario() {
    return {
        nombre: nombre.value,
        fecha: fecha.value,
        descripcion: descripcion.value,
        videoUrl: videoUrl.value,
        audioUrl: audioUrl.value
    };
}

function obtenerDatosFormularioEdit() {
    return {
        nombre: nombreEdit.value,
        fecha: fechaEdit.value,
        descripcion: descripcionEdit.value,
        videoUrl: videoUrlEdit.value,
        audioUrl: audioUrlEdit.value
    };
}

function limpiarFormulario() {
    nombre.value = '';
    fecha.value = '';
    descripcion.value = '';
    videoUrl.value = '';
    audioUrl.value = '';
}

function limpiarFormularioEdit() {
    nombreEdit.value = '';
    fechaEdit.value = '';
    descripcionEdit.value = '';
    videoUrlEdit.value = '';
    audioUrlEdit.value = '';
}

function mostrarMensaje(mensaje, tipo) {
    const divMensaje = document.createElement('div');
    divMensaje.className = `alert alert-${tipo} mt-2`;
    divMensaje.appendChild(document.createTextNode(mensaje));
    document.querySelector('.container').insertBefore(divMensaje, listaTareas);
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
}

function agregarDatos() {
    const tarea = obtenerDatosFormulario();
    if (!tarea.nombre || !tarea.fecha || !tarea.descripcion) {
        mostrarMensaje('Todos los campos son obligatorios.', 'danger');
        return;
    }
    tareas.push(tarea);
    localStorage.setItem('tareas', JSON.stringify(tareas));
    mostrarTareas();
    mostrarMensaje('Tarea agregada con éxito.', 'success');
}

function mostrarTareas() {
    listaTareas.innerHTML = '';
    tareas.forEach((tarea, index) => {
        listaTareas.innerHTML += `
            <div class="card mt-2">
                <div class="card-body">
                    <h5>${tarea.nombre}</h5>
                    <p>${tarea.fecha}</p>
                    <p>${tarea.descripcion}</p>
                    ${tarea.videoUrl ? `<video controls width="100%">
                        <source src="${tarea.videoUrl}" type="video/mp4">
                        Tu navegador no soporta el video.
                    </video>` : ''}
                    ${tarea.audioUrl ? `<audio controls>
                        <source src="${tarea.audioUrl}" type="audio/mpeg">
                        Tu navegador no soporta el audio.
                    </audio>` : ''}
                    <button class="btn btn-danger mt-2" onclick="eliminarTarea(${index})">Eliminar</button>
                    <button class="btn btn-warning mt-2" onclick="editarTarea(${index})">Editar</button>
                </div>
            </div>
        `;
    });
}

function eliminarTarea(index) {
    tareas.splice(index, 1);
    localStorage.setItem('tareas', JSON.stringify(tareas));
    mostrarTareas();
    mostrarMensaje('Tarea eliminada con éxito.', 'success');
}

function editarTarea(index) {
    tareaActual = index;
    let tarea = tareas[index];
    nombreEdit.value = tarea.nombre;
    fechaEdit.value = tarea.fecha;
    descripcionEdit.value = tarea.descripcion;
    videoUrlEdit.value = tarea.videoUrl;
    audioUrlEdit.value = tarea.audioUrl;
    new bootstrap.Modal(document.getElementById('editModal')).show();
}

function guardarEdicion() {
    const tareaEditada = obtenerDatosFormularioEdit();
    if (!tareaEditada.nombre || !tareaEditada.fecha || !tareaEditada.descripcion) {
        mostrarMensaje('Todos los campos son obligatorios.', 'danger');
        return;
    }
    tareas[tareaActual] = tareaEditada;
    localStorage.setItem('tareas', JSON.stringify(tareas));
    mostrarTareas();
    mostrarMensaje('Tarea editada con éxito.', 'success');
    const editModal = bootstrap.Modal.getInstance(document.getElementById('editModal'));
    if (editModal) {
        editModal.hide();
    }
}

async function buscarVideoYouTube() {
    const query = document.getElementById('videoSearch').value || document.getElementById('videoSearchEdit').value;
    console.log('Buscando videos de YouTube para:', query);
    try {
        const url = `https://www.googleapis.com/youtube/v3/search?part=snippet&type=video&q=${encodeURIComponent(query)}&key=${API_KEY_YOUTUBE}`;
        console.log('URL de solicitud:', url);
        const response = await fetch(url);
        const responseText = await response.text();
        console.log('Respuesta de la API:', responseText);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = JSON.parse(responseText);
        if (data.items.length === 0) {
            mostrarMensaje('No se encontraron videos para la búsqueda realizada.', 'info');
            return;
        }
        if (document.getElementById('videoSearch').value) {
            mostrarResultadosVideo(data.items, 'videoResults');
        } else {
            mostrarResultadosVideo(data.items, 'videoResultsEdit');
        }
    } catch (error) {
        console.error('Error buscando videos en YouTube:', error);
        mostrarMensaje('Error buscando videos en YouTube. Revisa la consola para más detalles.', 'danger');
    }
}

function mostrarResultadosVideo(videos, resultContainerId) {
    const videoResults = document.getElementById(resultContainerId);
    videoResults.innerHTML = '';
    videos.forEach(video => {
        const videoElement = document.createElement('div');
        videoElement.innerHTML = `
            <img src="${video.snippet.thumbnails.default.url}" alt="${video.snippet.title}">
            <p>${video.snippet.title}</p>
            <button class="btn btn-primary" type="button" onclick="seleccionarVideo('${video.id.videoId}', '${resultContainerId}')">Seleccionar</button>
        `;
        videoResults.appendChild(videoElement);
    });
}

function seleccionarVideo(videoId, resultContainerId) {
    const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
    if (resultContainerId === 'videoResults') {
        document.getElementById('videoUrl').value = videoUrl;
    } else {
        document.getElementById('videoUrlEdit').value = videoUrl;
    }
    document.getElementById(resultContainerId).innerHTML = '';
    mostrarMensaje('Video seleccionado correctamente.', 'success');
}

async function obtenerSpotifyToken() {
    const client_id = SPOTIFY_CLIENT_ID; // Tu Client ID
    const client_secret = SPOTIFY_CLIENT_SECRET; // Tu Client Secret
    const url = 'https://accounts.spotify.com/api/token';

    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'Authorization': 'Basic ' + btoa(client_id + ':' + client_secret)
        },
        body: 'grant_type=client_credentials'
    });

    const data = await response.json();
    if (response.ok) {
        return data.access_token;
    } else {
        throw new Error(`Error obteniendo token de Spotify: ${data.error}`);
    }
}

async function buscarMusicaSpotify() {
    const query = document.getElementById('audioSearch').value || document.getElementById('audioSearchEdit').value;
    console.log('Buscando música en Spotify para:', query);
    try {
        const token = await obtenerSpotifyToken();
        const url = `https://api.spotify.com/v1/search?q=${encodeURIComponent(query)}&type=track`;
        console.log('URL de solicitud:', url);
        const response = await fetch(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        const responseText = await response.text();
        console.log('Respuesta de la API:', responseText);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        const data = JSON.parse(responseText);
        if (data.tracks.items.length === 0) {
            mostrarMensaje('No se encontraron canciones para la búsqueda realizada.', 'info');
            return;
        }
        if (document.getElementById('audioSearch').value) {
            mostrarResultadosAudio(data.tracks.items, 'audioResults');
        } else {
            mostrarResultadosAudio(data.tracks.items, 'audioResultsEdit');
        }
    } catch (error) {
        console.error('Error buscando música en Spotify:', error);
        mostrarMensaje('Error buscando música en Spotify. Revisa la consola para más detalles.', 'danger');
    }
}

function mostrarResultadosAudio(tracks, resultContainerId) {
    const audioResults = document.getElementById(resultContainerId);
    audioResults.innerHTML = '';
    tracks.forEach(track => {
        const trackElement = document.createElement('div');
        trackElement.innerHTML = `
            <img src="${track.album.images[0].url}" alt="${track.name}">
            <p>${track.name} - ${track.artists.map(artist => artist.name).join(', ')}</p>
            <button class="btn btn-primary" type="button" onclick="seleccionarAudio('${track.external_urls.spotify}', '${resultContainerId}')">Seleccionar</button>
        `;
        audioResults.appendChild(trackElement);
    });
}

function seleccionarAudio(audioUrl, resultContainerId) {
    if (resultContainerId === 'audioResults') {
        document.getElementById('audioUrl').value = audioUrl;
    } else {
        document.getElementById('audioUrlEdit').value = audioUrl;
    }
    document.getElementById(resultContainerId).innerHTML = '';
    mostrarMensaje('Canción seleccionada correctamente.', 'success');
}

formulario.addEventListener('submit', (e) => {
    e.preventDefault();
    agregarDatos();
    limpiarFormulario();
    const nuevoModal = bootstrap.Modal.getInstance(document.getElementById('nuevoModal'));
    if (nuevoModal) {
        nuevoModal.hide();
    }
});

formEdit.addEventListener('submit', (e) => {
    e.preventDefault();
    guardarEdicion();
    limpiarFormularioEdit();
});

document.addEventListener('DOMContentLoaded', mostrarTareas);


// Función para reproducir video de YouTube
function reproducirVideo() {
    const videoUrl = document.getElementById('videoUrl').value;
    if (videoUrl) {
        document.getElementById('videoPlayer').innerHTML = `<iframe width="560" height="315" src="${videoUrl.replace('watch?v=', 'embed/')}" frameborder="0" allowfullscreen></iframe>`;
    } else {
        mostrarMensaje('No se ha seleccionado ningún video.', 'danger');
        console.error('No se ha seleccionado ningún video.');
    }
}

document.addEventListener('DOMContentLoaded', () => {
    const btnReproducirVideo = document.getElementById('btnReproducirVideo');
    const btnReproducirCancion = document.getElementById('btnReproducirCancion');

    if (btnReproducirVideo) {
        btnReproducirVideo.addEventListener('click', reproducirVideo);
    }

    if (btnReproducirCancion) {
        btnReproducirCancion.addEventListener('click', reproducirCancion);
    }
});

// Función para reproducir video de YouTube
function reproducirVideo() {
    const videoUrl = document.getElementById('videoUrl').value;
    if (videoUrl) {
        document.getElementById('videoPlayer').innerHTML = `<iframe width="560" height="315" src="${videoUrl.replace('watch?v=', 'embed/')}" frameborder="0" allowfullscreen></iframe>`;
    } else {
        mostrarMensaje('No se ha seleccionado ningún video.', 'danger');
        console.error('No se ha seleccionado ningún video.');
    }
}

// Función para reproducir canción de Spotify
function reproducirCancion() {
    const audioUrl = document.getElementById('audioUrl').value;
    if (audioUrl) {
        document.getElementById('audioPlayer').innerHTML = `<iframe src="https://open.spotify.com/embed/track/${audioUrl.split('/').pop()}" width="300" height="380" frameborder="0" allowtransparency="true" allow="encrypted-media"></iframe>`;
    } else {
        mostrarMensaje('No se ha seleccionado ninguna canción.', 'danger');
        console.error('No se ha seleccionado ninguna canción.');
    }
}