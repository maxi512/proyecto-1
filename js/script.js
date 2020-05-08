//Comportamiento por defecto
var state = new Ascii();
populateDropdown();
setTooltips();

function setTooltips() {
    $(document).ready(function() {
        $("#button-group").children().first().tooltip({
            title: "Muestra resultado en ASCII decimal",
            trigger: "hover"
        });

        $("#button-group ").children().last().tooltip({
            title: "Muestra resultado en Unicode Hexa",
            trigger: "hover"
        })
        $("#add").tooltip({
            title: "Guardar cadena ingresada",
            trigger: "hover"
        })

        $("#add").tooltip({
            title: "Guardar cadena ingresada",
            trigger: "hover"
        })
        $("#storage").tooltip({
            title: "Cadenas guardadas",
            trigger: "hover"
        })
    });
}

/**
 * Accion al seleccionar texto: Mustra el caracter asociado a la codificacion seleccionada
 */
function mostrarSeleccion() {
    texto = window.getSelection().toString();
    if (texto != "") {
        try {
            let mostrar = state.getMessageforAlert(texto);
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


/**
 * Imprime la salida de acuerdo al texto ingresado y la codificacion seleccionada
 */
function printOutput() {
    texto = document.getElementById("texto").value;
    string = state.calculateCodification(texto);
    document.getElementById("ascii").innerHTML = string;
}

//Accion a realizar cuando se modifica el texto
function onModified() {
    //Espera a que el texto este en el input
    setTimeout(printOutput, 0);
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
 * Cambia el estado a Ascii y actualiza
 */
function setStateAscii() {
    state = new Ascii();
    printOutput();
}

/**
 * Cambia el estado a Unicode y actualiza
 */
function setStateUnicode() {
    state = new Unicode();
    printOutput();
}