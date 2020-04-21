var longUlt = [];

function mostrarSeleccion() {
    texto = window.getSelection().toString();
    if (texto != "") {
        alert(texto);
    }
}

function ocultar() {
    document.getElementById("jumbotron").style.display = "none";
}

function mostrar() {
    document.getElementById("jumbotron").style.display = "block";
}


function myKeyPress(e) {
    var keynum;

    if (window.event) { // IE                    
        keynum = e.keyCode;
    } else if (e.which) { // Netscape/Firefox/Opera                   
        keynum = e.which;
    }

    texto = document.getElementById("texto").value;
    textoAux = document.getElementById("ascii").innerHTML;

    console.log("El key num es: " + keynum + "y es de tipo:" + typeof(keynum));

    if (event.key.length == 1) {
        document.getElementById("ascii").innerHTML = textoAux + " " + keynum;

        console.log("Puse en pila: " + parseInt(keynum.toString().length + 1));
        longUlt.push(parseInt(keynum.toString().length + 1));
    }

}

//Detecto backspace
//Falta detectar supr
function myKeyDown() {
    var key = event.keyCode || event.charCode;

    textoAux = document.getElementById("ascii").innerHTML;

    if (key == 8) {
        pop = longUlt.pop();
        console.log("Saque de pila: " + pop);
        var res = textoAux.substring(0, textoAux.length - pop);
        document.getElementById("ascii").innerHTML = res;
    }
}