//Comportamiento por defecto
var state = new Ascii();
populateDropdown();

/**
 * Accion al seleccionar texto: Mustra el caracter asociado a la codificacion seleccionada
 */
function mostrarSeleccion() {
    texto = window.getSelection().toString();
    if (texto != "") {
        try {
            let mostrar = state.getAlertMessage(texto);
            //Muestro msg
            alertShowSelectedText(mostrar);
        } catch (RangeError) {
            //No hago nada
        };

    }
}

/**
 * Muestra la seleccion del usuario convertida a caracter
 * @param {*} msg caracter que selecciono el usuario
 */
function alertShowSelectedText(msg) {
    document.getElementById("showInfo").textContent = msg;
    $('#alert2').slideDown();
    setTimeout(function() { $('#alert2').slideUp(); }, 2000);
}


///////////////////////////////Actualiza textos////////////////////////////////
/**
 * Imprime la salida de acuerdo al texto ingresado y la codificacion seleccionada
 */
function onModified1() {
    texto = document.getElementById("texto").value;
    string = state.calcularCodigo(texto);
    document.getElementById("ascii").innerHTML = string;


}

//Espera a que se pueda leer el texto
function onModified() {
    setTimeout(onModified1, 0);
}

/**
 * verifica si hay que modificar el texto al presionar supr o backspace
 */
function myKeyDown() {
    const key = event.keyCode || event.charCode;
    if (key == 8 || key == 46) {
        onModified();
    }
}

/**
 * Obtiene el valor unicode a partir de un surrogate pair
 * @param {String} surrogatePair del cual se quiere saber su codificacion 
 */
function charCodeUTF32(surrogatePair) {
    return ((((surrogatePair.charCodeAt(0) - 0xD800) * 0x400) + (surrogatePair.charCodeAt(1) - 0xDC00) + 0x10000));
}

/**
 * Action on paste
 */
function myPaste() {
    setTimeout(onModified1, 0);

}

///////////////////////////////Actualiza textos////////////////////////////////

/////////////////////////////////ACtualiza states/////////////////////////////

/**
 * Cambia el estado a Ascii y actualiza
 */
function setStateAscii() {
    state = new Ascii();
    onModified1();
}

/**
 * Cambia el estado a Unicode y actualiza
 */
function setStateUnicode() {
    state = new Unicode();
    onModified1();
}

/////////////////////////////////Actualiza states/////////////////////////////