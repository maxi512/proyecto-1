var state = "";
populateDropdown();

function mostrarSeleccion() {
    texto = window.getSelection().toString();
    if (texto != "") {
        let mostrar = "";
        if (state === "Unicode") {
            try {
                //Puede ser que el usuario seleccione algo que no es una codificacion
                aux = texto.substr(2, texto.length - 1);
                mostrar = "'" + String.fromCodePoint(parseInt(aux, 16)) + "'";
            } catch (RangeError) {
                //No hago nada
            }

        } else {
            mostrar = "'" + String.fromCodePoint(parseInt(texto)) + "'";
        }

        //Muestro msg
        alertShowSelectedText(mostrar);
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


///////////////////////////////Jumbotron////////////////////////////////
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
 * Accion al seleccionar: Pendiente
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

//////////////////////////////////////////////////////////////


///////////////////////////////Codificaciones////////////////////////////////
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
            add = charCodeUTF32(pair);
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
        //Si pertenece a Ascii extendido
        if (charCode <= 255) {
            add = charCode;
        } else {
            //Si es un surrogate pair
            if (charCode >= 55296) {
                i++;
            }
            //Not an Ascii
            add = "NaA"
        }
        output += add + " "
        i++;
    }

    return output;

}
///////////////////////////////Codificaciones////////////////////////////////

///////////////////////////////Actualiza textos////////////////////////////////
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
    state = "Ascii"
    onModified1();
}

/**
 * Cambia el estado a Unicode y actualiza
 */
function setStateUnicode() {
    state = "Unicode"
    onModified1();
}

/////////////////////////////////Actualiza states/////////////////////////////

////////////////////////////////Storage managment/////////////////////////////

/**
 * Almacena en el local storage la cadena actual y lo añade al dropdown menu correspondiente
 */
function addUserInput() {
    const toStore = document.getElementById("texto").value;
    const dropdown = document.getElementById("dropdownStorage");

    //Solo guardo si el input no es igual al ultimo guardado y no es vacio
    if (toStore != dropdown.firstChild.textContent && toStore !== "") {
        //obtengo guardadas
        const storedInputs = getStoredInputs();
        ///añado al arreglo
        addToArray(storedInputs, toStore);
        //guardo
        localStorage.setItem("userInputs", JSON.stringify(storedInputs));
        //actualizo dropdown
        var newItem = createDropdownItem(toStore)
        dropdown.prepend(newItem);

        alertStoredString(toStore)
    }

}

/**
 * Muestra alerta cuando se guarda una cadena en el local storage
 * @param {*} msg cadena que se guardo
 */
function alertStoredString(msg) {
    document.getElementById("cadenaGuardada").textContent = msg;
    $('#alert').slideDown();
    setTimeout(function() { $('.alert').slideUp(); }, 1500);
}


/**
 * obtiene las ultimas cadenas guardadas del local storage
 */
function getStoredInputs() {
    let storedInputs = JSON.parse(localStorage.getItem("userInputs"));
    if (storedInputs == null)
        storedInputs = [];
    return storedInputs;
}

/**
 * Añade a un arreglo una cadena de caracteres, si el tamaño se agranda por encima
 * del limite, hace un shift
 * @param {*} arr array al que se le quiere agregar una cadena
 * @param {String} toStore cadena que se quiere almacenar
 */
function addToArray(arr, toStore) {
    arr.push(toStore);
    if (arr.length > 5) {
        arr.shift();
        removeLastElementInDropdown();
    }

}

/**
 * Llena el dropdown menu a partir de lo que esta guardado en el local storage
 */
function populateDropdown() {
    let dropdown = document.getElementById("dropdownStorage");
    const storedInputs = getStoredInputs();
    for (let i = 0; i < storedInputs.length; i++) {
        const inputStored = storedInputs[i];
        const dropdownItem = createDropdownItem(inputStored);
        dropdown.prepend(dropdownItem);
    }
}

/**
 * Crea y devuelve un dropdown-item con el comportamiento deseado
 * @param {String} text que se desea usar como textContent del item creado 
 */
function createDropdownItem(text) {
    let newItem = document.createElement("a");
    newItem.classList.add("dropdown-item");
    newItem.href = "#";
    newItem.textContent = text;
    newItem.addEventListener('click', onClickDropdownItem)
    return newItem;
}

/**
 * Remueve el ultimo elemento del dropdown menu que contiene las cadenas en local storage
 */
function removeLastElementInDropdown() {
    const dropdown = document.getElementById("dropdownStorage");
    dropdown.removeChild(dropdown.lastChild);
}

/**
 * Accion al clickear sobre un dropdown-item:
 * Setear el texto del input con su textContent
 */
function onClickDropdownItem() {
    const text = this.textContent;
    const input = document.getElementById('texto');
    input.value = text;
    onModified1();


}
////////////////////////////////Storage managment/////////////////////////////