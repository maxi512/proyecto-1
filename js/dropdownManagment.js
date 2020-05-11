/**
 * Borra las cadenas almacenadas y muestra una alerta
 */
function emptyDropdown() {
    if (!isEmptyUserInputs()) {
        $('#dropdownStorage').empty();
        cleanLocalStorage();
        showEmptyStorageAlert();
    }

}

/**
 * Llena el dropdown menu a partir de lo que esta guardado en el local storage
 */
function populateDropdown() {
    let dropdown = $("#dropdownStorage");
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
    newItem.addEventListener('click', onClickDropdownItem);
    return newItem;
}

/**
 * Remueve el ultimo elemento del dropdown menu que contiene las cadenas en local storage
 */
function removeLastElementInDropdown() {
    const dropdown = $("#dropdownStorage");
    dropdown.children().last().remove();
}

/**
 * Accion al clickear sobre un dropdown-item:
 * Setear el texto del input con su textContent
 */
function onClickDropdownItem() {
    const text = this.textContent;
    $('#texto').val(text);
    //Actualizo
    printOutput();

}