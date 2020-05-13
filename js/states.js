class State {
    constructor() {}
    calculateCodification() {}
    getMessageforAlert(texto) {}
}


class Unicode extends State {
    constructor() {
        super();
    }
    calculateCodification(texto) {
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
                add = this.charCodeUTF32(pair);
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
     * Obtiene el valor unicode a partir de un surrogate pair
     * @param {String} surrogatePair del cual se quiere saber su codificacion 
     */
    charCodeUTF32(surrogatePair) {
        return ((((surrogatePair.charCodeAt(0) - 0xD800) * 0x400) + (surrogatePair.charCodeAt(1) - 0xDC00) + 0x10000));
    }

    getMessageforAlert(texto) {
        let aux = texto.substr(2, texto.length - 1);
        return "'" + String.fromCodePoint(parseInt(aux, 16)) + "'";
    }
}

class Ascii extends State {
    constructor() {
        super();
    }
    calculateCodification(texto) {
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
    getMessageforAlert(texto) {
        return "'" + String.fromCodePoint(parseInt(texto)) + "'";
    }
}