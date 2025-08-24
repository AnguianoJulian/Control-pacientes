// Service Worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js")
    .then(() => console.log("Service Worker registrado"))
    .catch(err => console.error("Error registrando Service Worker:", err));
}

const pacienteBuscar = document.querySelector("#paciente");
const buscar = document.querySelector(".buscar");
const abrirModal = document.querySelector(".abrir-modal");
const mostrarPacientes = document.querySelector(".mostrar-pacientes");
const formulario = document.querySelector(".form-añadir");
const cerrar = document.querySelector(".cerrar");
const añadirPaciente = document.querySelector("#añadirPaciente");
const nombre = document.querySelector("#nombre");
const telefono = document.querySelector("#telefono");

let listaPacientes = JSON.parse(localStorage.getItem("pacientes")) || [
    { nombre: "Marifer", telefono: 3331080912, faltas: 1 },
    { nombre: "Julian", telefono: 3331080913, faltas: 3 },
    { nombre: "Julio", telefono: 3331080914, faltas: 2 },
    { nombre: "Ramiro", telefono: 3331080915, faltas: 5 }
];

function guardarPacientes() {
    localStorage.setItem("pacientes", JSON.stringify(listaPacientes));
}

function cargarPacientes(pacientes) {
    mostrarPacientes.innerHTML = "";
    pacientes.forEach(p => {
        const div = document.createElement("div");
        div.classList.add("pacientes");
        div.innerHTML = `
            <p>${p.nombre}</p>
            <p>${p.telefono}</p>
            <p class="faltas">${p.faltas} faltas</p>
            <button class="unaFaltaMas" data-tel="${p.telefono}">Añadir falta</button>
        `;
        mostrarPacientes.appendChild(div);
    });
}

// Inicializar
cargarPacientes(listaPacientes);

// Eventos
mostrarPacientes.addEventListener("click", e => {
    if(e.target.classList.contains("unaFaltaMas")) {
        const tel = e.target.dataset.tel;
        const paciente = listaPacientes.find(p => p.telefono == tel);
        if(paciente){
            paciente.faltas++;
            guardarPacientes();
            cargarPacientes(listaPacientes);
        }
    }
});

buscar.addEventListener("click", () => {
    const tel = pacienteBuscar.value.trim();
    const encontrado = listaPacientes.find(p => p.telefono == tel);
    if(encontrado){
        cargarPacientes([encontrado]);
    } else {
        mostrarPacientes.innerHTML = "<p class='no-encontrado'>Paciente no encontrado</p>";
    }
});

abrirModal.addEventListener("click", () => formulario.style.display = "flex");
cerrar.addEventListener("click", () => formulario.style.display = "none");

añadirPaciente.addEventListener("click", e => {
    e.preventDefault();
    const nuevo = {
        nombre: nombre.value.trim(),
        telefono: Number(telefono.value.trim()),
        faltas: 1
    };
    if(!nuevo.nombre || !nuevo.telefono){
        alert("Por favor llenar todos los campos");
        return;
    }
    const existe = listaPacientes.find(p => p.telefono === nuevo.telefono);
    if(existe){
        alert("Este teléfono ya está registrado");
        return;
    }
    listaPacientes.push(nuevo);
    guardarPacientes();
    cargarPacientes(listaPacientes);
    nombre.value = "";
    telefono.value = "";
    formulario.style.display = "none";
});
