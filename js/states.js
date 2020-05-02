class State {
    constructor() {}
    calcularCodigo() {}
    getAlertMessage(texto) {

    }
}


class Unicode extends State {
    constructor() {
        super();
    }
    calcularCodigo(texto) {
        let output = "";
        let pair = "";
        let i = 0;
        let codePoint = "";
        let add = "";
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
    getAlertMessage(texto) {
        let aux = texto.substr(2, texto.length - 1);
        return "'" + String.fromCodePoint(parseInt(aux, 16)) + "'";
    }
}

class Ascii extends State {
    constructor() {
        super();
    }
    calcularCodigo(texto) {
        let output = "";
        let i = 0;
        let charCode = "";
        let add = "";
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
    getAlertMessage(texto) {
        return "'" + String.fromCodePoint(parseInt(texto)) + "'";
    }
}