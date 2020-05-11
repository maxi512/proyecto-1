/**
 * Almacena en el local storage la cadena actual y lo añade al dropdown menu correspondiente
 */
function addUserInput() {
    const toStore = $("#texto").val();
    const dropdown = $("#dropdownStorage");

    const storedInputs = getStoredInputs();
    if (JSON.stringify(storedInputs) === JSON.stringify([])) {
        saveUserInput(storedInputs, toStore);
    } else {
        //Solo guardo si el input no es igual al ultimo guardado y no es vacio
        const firstDropdownElement = dropdown.children().first()
        if (toStore != firstDropdownElement.text() && toStore !== "") {
            saveUserInput(storedInputs, toStore);
        }
    }
}

/**
 * Guarda en el local storage
 * @param {Array} storedInputs arreglo con los elementos guardados en el local storage
 * @param {String} toStore nuevo input a guardar
 */
function saveUserInput(storedInputs, toStore) {
    const dropdown = $("#dropdownStorage");
    ///añado al arreglo
    addToArray(storedInputs, toStore);
    //guardo
    localStorage.setItem("userInputs", JSON.stringify(storedInputs));
    //actualizo dropdown
    const newItem = createDropdownItem(toStore)
    dropdown.prepend(newItem);
    alertStoredString(toStore);
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
 * Setea el item "userInputs" en un arreglo vacio
 */
function cleanLocalStorage() {
    localStorage.setItem("userInputs", JSON.stringify([]));
}

/**
 * Devuelve true si las userInputs almacenadas en el localStorage son 0
 * Devuelve false en caso contrario
 */
function isEmptyUserInputs() {
    const userInputs = JSON.parse(localStorage.getItem("userInputs"));
    return userInputs.length == 0;
}