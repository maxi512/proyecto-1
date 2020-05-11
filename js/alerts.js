/**
 * Muestra alerta cuando se guarda una cadena en el local storage
 * @param {*} msg cadena que se guardo
 */
function alertStoredString(msg) {
    console.log(msg);
    $("#cadenaGuardada").text(msg);
    animateAlert("alert");
}

/**
 * Muestra las alerta correspondiente al vaciar los inputs
 */
function showEmptyStorageAlert() {
    animateAlert("alertEmpty");
}

/**
 * Muestra la seleccion del usuario convertida a caracter
 * @param {*} msg caracter que selecciono el usuario
 */
function alertShowSelectedText(msg) {
    $("#showInfo").text(msg);
    animateAlert("alert2", 2000);
}


/**
 * Realiza la animacion de un alert
 * @param {String} id del alert a animar
 * @param {Int} timeout para la animacion, por defecto es 1500
 */
function animateAlert(id, timeout = 1500) {
    $('#' + id).slideDown();
    setTimeout(function() { $('#' + id).slideUp(); }, timeout);
}