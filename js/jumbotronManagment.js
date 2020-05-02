/**
 * Verifica si hay que mostrar jumbotron
 */
function actualizar() {
    checkbox = document.getElementById("checkbox");
    if (checkbox.checked) {
        localStorage.setItem("mostrarJumbotron", "false");
    } else {
        localStorage.setItem("mostrarJumbotron", "true");
    }
}

/**
 * Verifica la variable guardada en local storage para determinar
 * si se debe mostrar o no el jumbotron
 */
function verificarMostrarJumbotron() {
    if (localStorage.getItem("mostrarJumbotron") === "false") {
        ocultarJumbotron();
    } else {
        mostrarJumbotron();
    }
}

/**
 * Oculta Jumbotron
 */
function ocultarJumbotron() {
    document.getElementById("jumbotron").classList.add('sr-only');
    document.getElementById("separador").classList.add('sr-only');
}

/**
 * Muestra Jumbotron
 */
function mostrarJumbotron() {
    document.getElementById("jumbotron").classList.remove('sr-only');
    document.getElementById("separador").classList.remove('sr-only');
}