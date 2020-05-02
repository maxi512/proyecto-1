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

        //Muestro alerta
        alertStoredString(toStore)
    }

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
 * Muestra alerta cuando se guarda una cadena en el local storage
 * @param {*} msg cadena que se guardo
 */
function alertStoredString(msg) {
    document.getElementById("cadenaGuardada").textContent = msg;
    $('#alert').slideDown();
    setTimeout(function() { $('.alert').slideUp(); }, 1500);
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
    //Actualizo
    onModified1();


}