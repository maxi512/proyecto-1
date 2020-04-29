var state = ""

/**
 * Accion al seleccionar: Pendiente
 */

function verificarMostrarJumbotron() {
    if (localStorage.getItem("mostrarJumbotron") === "false") {
        ocultarJumbotron();
    } else {
        mostrarJumbotron();
    }
}

function mostrarSeleccion() {
    texto = window.getSelection().toString();
    if (texto != "") {

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

    return output.toUpperCase();
}
/**
 * Convierte una cadena en sus valores unicode
 * @param {String} texto del cual se quiere saber sus valores unicode
 */
function calcularCodigosAscii(texto) {
    var output = "";
    var i = 0;
    while (i < texto.length) {
        add = "";
        charCode = texto.charCodeAt(i);
        if (charCode <= 255) {
            add = charCode;
        } else {
            if (charCode >= 55296) {
                i++;
            }
            add = "NaA"
        }
        output += add + " "
        i++;
    }

    return output;

}

/**
 * Modifica la salida de acuerdo al texto ingresado y la codificacion seleccionada
 */
function onModified1() {
    texto = document.getElementById("texto").value;
    string = ""
    if (state === "Unicode") {
        string = calcularCodigosUnicode(texto);
    } else {
        string = calcularCodigosAscii(texto)
    }
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

function setStateAscii() {
    state = "Ascii"
    onModified1();
}

function setStateUnicode() {
    state = "Unicode"
    onModified1();
}