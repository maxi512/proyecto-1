/**
 * Verifica si hay que mostrar jumbotron
 */
function actualizar() {
    const checkbox = $("#checkbox");
    if (checkbox.is(":checked")) {
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
    $("#jumbotron").addClass('sr-only');
    $("#separador").addClass('sr-only');
}

/**
 * Muestra Jumbotron
 */
function mostrarJumbotron() {
    $("#jumbotron").removeClass('sr-only');
    $("#separador").removeClass('sr-only');
}