var longUlt = [];

function detectar() {
    texto = document.getElementById("texto").value;
    var key = event.keyCode || event.charCode;
    textoAux = document.getElementById("ascii").innerHTML;

    if (texto != "") {
        //se puede acomodar
        if (key == 8) {
            pop = longUlt.pop()
            var res = textoAux.substring(0, textoAux.length - pop);
            document.getElementById("ascii").innerHTML = res;

        } else {
            if (event.key.length == 1) {
                var mostrar = texto.charCodeAt(texto.length - 1) + "";
                document.getElementById("ascii").innerHTML = document.getElementById("ascii").innerHTML + " " + mostrar;
                longUlt.push(parseInt(mostrar.length + 1));
            }
        }

    } else {
        document.getElementById("ascii").innerHTML = "";
    }



}

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