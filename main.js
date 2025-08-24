
// Registrar Service Worker
if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("sw.js")
    .then(() => console.log("Service Worker registrado"))
    .catch(err => console.error("Error registrando Service Worker:", err));
}

const pacienteBuscar = document.querySelector("#paciente");
const buscar = document.querySelector(".buscar");
const añadir = document.querySelector(".añadir");
const mostrarPacientes = document.querySelector(".mostrar-pacientes");
const formulario = document.querySelector(".form-añadir");
const cerrar = document.querySelector(".cerrar");
const añadirPaciente = document.querySelector("#añadirPaciente");
const nombre = document.querySelector("#nombre");
const telefono = document.querySelector("#telefono");

// "Base de datos" simulada
const listaPacientes = [
    { nombre: "Marifer", telefono: 3331080912, faltas: 1 },
    { nombre: "Julian", telefono: 3331080913, faltas: 3 },
    { nombre: "Julio", telefono: 3331080914, faltas: 2 },
    { nombre: "Ramiro", telefono: 3331080915, faltas: 5 }
];

// -------- Persistencia en localStorage --------
function guardarPacientes() {
    localStorage.setItem("pacientes", JSON.stringify(listaPacientes));
}

function cargarDesdeLocalStorage() {
    const data = localStorage.getItem("pacientes");
    if (data) {
        listaPacientes.splice(0, listaPacientes.length, ...JSON.parse(data));
    }
}

// -------- Renderizado de pacientes --------
function cargarPacientes(pacientes) {
    mostrarPacientes.innerHTML = "";
    pacientes.forEach((p) => {
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

// -------- Inicialización --------
cargarDesdeLocalStorage();
cargarPacientes(listaPacientes);

// -------- Eventos --------

// Aumentar faltas
mostrarPacientes.addEventListener("click", (e) => {
    if (e.target.classList.contains("unaFaltaMas")) {
        const tel = e.target.dataset.tel;
        const paciente = listaPacientes.find(p => p.telefono == tel);

        if (paciente) {
            paciente.faltas++;
            guardarPacientes();               // 👈 Guardar cambios
            cargarPacientes(listaPacientes); // refrescar vista
        }
    }
});

// Buscar pacientes
function buscarPaciente() {
    const tel = pacienteBuscar.value.trim();
    const encontrado = listaPacientes.find(p => p.telefono == tel);

    if (encontrado) {
        cargarPacientes([encontrado]);
    } else {
        mostrarPacientes.innerHTML = "";
        const noEncontrado = document.createElement("p");
        noEncontrado.classList.add("no-encontrado");
        noEncontrado.textContent = "Paciente no encontrado";
        mostrarPacientes.appendChild(noEncontrado);
    }
}
buscar.addEventListener("click", buscarPaciente);

// Mostrar y cerrar formulario
añadir.addEventListener("click", () => {
    formulario.classList.add("mostrar");
});
cerrar.addEventListener("click", () => {
    formulario.classList.remove("mostrar");
});

// Añadir paciente
function añadirPacientes(e) {
    e.preventDefault();

    const nuevo = {
        nombre: nombre.value.trim(),
        telefono: Number(telefono.value.trim()),
        faltas: 1
    };

    if (nuevo.nombre === "" || !nuevo.telefono) {
        alert("Por favor llenar los campos requeridos");
        return;
    }

    const existe = listaPacientes.find(p => p.telefono === nuevo.telefono);

    if (existe) {
        alert("Este telefono ya ha sido registrado antes");
        cargarPacientes([existe]);
    } else {
        listaPacientes.push(nuevo);
        guardarPacientes(); // 👈 Guardar nuevo paciente
        cargarPacientes(listaPacientes);
    }

    nombre.value = "";
    telefono.value = "";
    formulario.classList.remove("mostrar");
}
añadirPaciente.addEventListener("click", añadirPacientes);
