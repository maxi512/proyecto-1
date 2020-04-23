var lastString = "";

/**
 * Accion al seleccionar: Pendiente
 */
function mostrarSeleccion() {
    texto = window.getSelection().toString();
    if (texto != "") {

    }
}
/**
 * Oculta Jumbotron
 */
function ocultar() {
    document.getElementById("jumbotron").style.display = "none";
}

/**
 * Muestra Jumbotron
 */
function mostrar() {
    document.getElementById("jumbotron").style.display = "block";
}

/**
 * Convierte una cadena en sus valores unicode
 * @param {String} texto del cual se quiere saber sus valores unicode
 */
function calcularCodigosUnicode(texto) {
    var output = "";
    var pair = "";
    var i = 0;
    while (i < texto.length) {
        codePoint = texto.codePointAt(i);
        add = "";
        //Es surrogate pair?
        if (codePoint >= 55296) {
            //Armo texto con surrogate pair
            pair = texto.charAt(i) + texto.charAt(i + 1) + "";
            add = pair.charCodeUTF32();
            //Salteo surrogate trail
            i++;
        } else {
            add = codePoint;
        }
        output += "U+" + add.toString(16) + " ";
        i++;
    }

    lastString = output.toUpperCase();
    return lastString;
}

/**
 * Verifica si hay que modificar el texto
 */
function onModified1() {
    texto = document.getElementById("texto").value;

    if (texto != lastString) {
        document.getElementById("ascii").innerHTML = calcularCodigosUnicode(texto);
    }

}

//Espera a que se pueda leer el texto
function onModified() {
    setTimeout(onModified1, 0);
}

/**
 * verifica si hay que modificar el texto al presionar supr o backspace
 */
function myKeyDown() {
    var key = event.keyCode || event.charCode;
    if (key == 8 || key == 46) {
        onModified();
    }
}

/**
 * Obtiene Unicode de surrogate pairs
 */
String.prototype.charCodeUTF32 = function() {
    return ((((this.charCodeAt(0) - 0xD800) * 0x400) + (this.charCodeAt(1) - 0xDC00) + 0x10000));
};
/**
 * Action on paste
 */
function myPaste() {
    setTimeout(onModified1, 0);

}