var Simbolo = /** @class */ (function () {
    function Simbolo(cadena, tipo) {
        this.cadena = cadena;
        this.tipo = tipo;
        this.longitud = cadena.length;
    }
    Simbolo.prototype.getCadena = function () {
        return this.cadena;
    };
    Simbolo.prototype.setCadena = function (cadena) {
        this.cadena = cadena;
    };
    Simbolo.prototype.getTipo = function () {
        return this.tipo;
    };
    Simbolo.prototype.setTipo = function (tipo) {
        this.tipo = tipo;
    };
    Simbolo.prototype.getLongitud = function () {
        return this.longitud;
    };
    Simbolo.prototype.setLongitud = function (longitud) {
        this.longitud = longitud;
    };
    Simbolo.prototype.toString = function () {
        return "Cadena:" + this.cadena + " Tipo:" + this.tipo;
    };
    return Simbolo;
}());
var Scanner = /** @class */ (function () {
    function Scanner() {
    }
    Scanner.esReservada = function (palabra) {
        var inicio = 0;
        var fin = this.PALABRAS_R.length - 1;
        while (inicio <= fin) {
            var medio = parseInt((inicio + fin) / 2);

            if (this.PALABRAS_R[medio].localeCompare(palabra) == 0) {
                return true;
            }
            else if (this.PALABRAS_R[medio].localeCompare(palabra) > 0) {
                fin = medio - 1;
            }
            else if (this.PALABRAS_R[medio].localeCompare(palabra) < 0) {
                inicio = medio + 1;
            }
        }
        return false;
    };
    Scanner.esTipoDato = function (palabra) {
        var inicio = 0;
        var fin = this.TIPOS_DATO.length - 1;
        while (inicio <= fin) {
            var medio = parseInt((inicio + fin) / 2);
            if (this.TIPOS_DATO[medio].localeCompare(palabra) == 0) {
                return true;
            }
            else if (this.TIPOS_DATO[medio].localeCompare(palabra) > 0) {
                fin = medio - 1;
            }
            else if (this.TIPOS_DATO[medio].localeCompare(palabra) < 0) {
                inicio = medio + 1;
            }
        }
        return false;
    };
    Scanner.obtenerSimbolo = function (cadena) {
        console.log(cadena.length);
        if (this.indice <= cadena.length) {
            while (cadena.charAt(this.indice) == ' ' || cadena.charAt(this.indice) == '\n') {
                this.indice++;
                if (this.indice == cadena.length) {
                    return null;
                }
            }

            if (cadena.charAt(this.indice) == '/' && cadena.charAt(this.indice + 1) =='*') {
                console.log("Entro mult");
                this.indice += 2;
               /* do {
                    this.indice++;
                } while (cadena.charAt(this.indice) != '*' && cadena.charAt(this.indice+1) != '/');
                */
               while(cadena.charAt(this.indice) != '*' && cadena.charAt(this.indice+1) != '/'){
                   this.indice++;
               }
                this.indice += 2;
                return new Simbolo("","Comentario Multilinea");
            }

        
            
             
            if (cadena.charAt(this.indice) == '/' && cadena.charAt(this.indice+1) == '/') {
                this.indice += 2;
                do {
                    this.indice++;
                } while (cadena.charAt(this.indice) != '\n');
                this.indice += 1;
                return new Simbolo("","Comentario Simple");
            }
            if (cadena.charAt(this.indice) >= 'a' && cadena.charAt(this.indice) <= 'z'
                || cadena.charAt(this.indice) >= 'A' && cadena.charAt(this.indice) <= 'Z'
                || cadena.charAt(this.indice) == '_') {
                return this.esIdentificador(cadena, this.indice);
            }
            if (cadena.charAt(this.indice) >= '0' && cadena.charAt(this.indice) <= '9') {
                return this.esNumero(cadena, this.indice);
            }
            if (cadena.charAt(this.indice) == '=' && cadena.charAt(this.indice + 1) == '='
                || cadena.charAt(this.indice) == '>' || cadena.charAt(this.indice) == '<'
                || cadena.charAt(this.indice) == '!' && cadena.charAt(this.indice + 1) == '=') {
                return this.esOperadorR(cadena, this.indice);
            }
            if (cadena.charAt(this.indice) == '&' || cadena.charAt(this.indice) == '|'
                || cadena.charAt(this.indice) == '!') {
                return this.esOperadorL(cadena, this.indice);
            }
            if (cadena.charAt(this.indice) == '+' || cadena.charAt(this.indice) == '-'
                || cadena.charAt(this.indice) == '*' || cadena.charAt(this.indice) == '/'
                || cadena.charAt(this.indice) == '%') {
                return this.esOperadorA(cadena, this.indice);
            }
            if (cadena.charAt(this.indice) == '"') {
                return this.esCadena(cadena, this.indice);
            }
            if (cadena.charAt(this.indice) == '\'') {
                return this.esCaracter(cadena, this.indice);
            }
            if (cadena.charAt(this.indice) >= '!' && cadena.charAt(this.indice) <= '/'
                || cadena.charAt(this.indice) >= ':' && cadena.charAt(this.indice) <= '@'
                || cadena.charAt(this.indice) >= '[' && cadena.charAt(this.indice) <= '`'
                || cadena.charAt(this.indice) >= '{' && cadena.charAt(this.indice) <= '¡' ) {
                var otro = "";
                otro += cadena.charAt(this.indice);
                this.indice++;
                return new Simbolo(otro, "Otro");
            }
            
        }
    };
    Scanner.esIdentificador = function (cadena, indice) {
        var id = "";
        var simbolo;
        while (cadena.charAt(indice) >= 'a' && cadena.charAt(indice) <= 'z'
            || cadena.charAt(indice) >= 'A' && cadena.charAt(indice) <= 'Z'
            || cadena.charAt(indice) >= '0' && cadena.charAt(indice) <= '9'
            || cadena.charAt(indice) == '_') {
            id += cadena.charAt(indice);
            indice++;
        }
        this.indice = indice;
        if (this.esReservada(id)) {
            return simbolo = new Simbolo(id, "Palabra Reservada");
        }
        else if (this.esTipoDato(id)) {
            return simbolo = new Simbolo(id, "Tipo de Dato");
        }
        else {
            return simbolo = new Simbolo(id, "Identificador");
        }
    };
    Scanner.esNumero = function (cadena, indice) {
        var numero = "";
        var simbolo;
        while (cadena.charAt(indice) >= '0' && cadena.charAt(indice) <= '9'
            || cadena.charAt(indice) == '.') {
            numero += cadena.charAt(indice);
            indice++;
        }
        this.indice = indice;
        return simbolo = new Simbolo(numero, "Numero");
    };
    Scanner.esOperadorR = function (cadena, indice) {
        var operador = "";
        var simbolo;
        while (cadena.charAt(indice) == '=' || cadena.charAt(indice) == '!'
            || cadena.charAt(indice) == '>' || cadena.charAt(indice) == '<') {
            operador += cadena.charAt(indice);
            indice++;
        }
        this.indice = indice;
        if (operador === "<<" || operador === ">>") {
            return simbolo = new Simbolo(operador, "Flujo de programa");
        }
        else {
            return simbolo = new Simbolo(operador, "Operador Relacional");
        }
    };
    Scanner.esOperadorL = function (cadena, indice) {
        var operador = "";
        var simbolo;
        while (cadena.charAt(indice) == '&' || cadena.charAt(indice) == '|'
            || cadena.charAt(indice) == '!') {
            operador += cadena.charAt(indice);
            indice++;
        }
        this.indice = indice;
        return simbolo = new Simbolo(operador, "Operador Logico");
    };
    Scanner.esOperadorA = function (cadena, indice) {
        var operador = "";
        var simbolo;
        while (cadena.charAt(indice) == '+' || cadena.charAt(indice) == '-'
            || cadena.charAt(indice) == '*' || cadena.charAt(indice) == '/'
            || cadena.charAt(indice) == '%' || cadena.charAt(indice) == '=') {
            operador += cadena.charAt(indice);
            indice++;
        }
        this.indice = indice;
        return simbolo = new Simbolo(operador, "Operador Aritmetico");
    };
    Scanner.esCadena = function (cadena, indice) {
        var cad = "";
        var simbolo;
        do {
            cad += cadena.charAt(indice);
            indice++;
        } while (cadena.charAt(indice) != '"');
        cad += cadena.charAt(indice++);
        this.indice = indice;
        return simbolo = new Simbolo(cad, "Cadena");
    };
    Scanner.esCaracter = function (cadena, indice) {
        var caracter = "";
        var simbolo;
        do {
            caracter += cadena.charAt(indice);
            indice++;
        } while (cadena.charAt(indice) != '\'');
        caracter += cadena.charAt(indice++);
        this.indice = indice;
        return simbolo = new Simbolo(caracter, "Caracter");
    };
    Scanner.indice = 0;
    Scanner.PALABRAS_R = ["break", "case", "catch", "class", "const", "continue", "default",
        "delete", "do", "else","endif", "endwhile" ,"enum", "false", "for", "friend",
        "goto", "if", "inline", "namespace", "new", "operator", "private",
        "protected", "public", "register", "return", "signed", "sizeof", "static",
        "struct", "switch", "this", "throw", "true", "try", "typedef", "typeid", "typename",
        "union", "unsigned", "using", "virtual", "volatile", "while"];
    Scanner.TIPOS_DATO = ["bool", "byte", "double", "float", "int", "long", "short", "void"];
    return Scanner;
}());


var Nodo = /** @class */ (function () {
    function Nodo(valor, sgte) {
        this.valor = valor;
        this.sgte = sgte;
    }
    return Nodo;
}());
var Pila = /** @class */ (function () {
    function Pila() {
        this.tope = null;
    }
    Pila.prototype.estaVacia = function () {
        return this.tope === null;
    };
    Pila.prototype.cima = function () {
        if (this.tope == null) {
            return null;
        }
        else {
            return this.tope.valor;
        }
    };
    Pila.prototype.apilar = function (valor) {
        if (this.tope === null) {
            this.tope = new Nodo(valor, null);
        }
        else {
            var nuevo = new Nodo(valor, this.tope);
            this.tope = nuevo;
        }
    };
    Pila.prototype.desapilar = function () {
        var valor;
        if (this.tope != null) {
            valor = this.tope.valor;
            this.tope = this.tope.sgte;
        }
        else {
            valor = null;
        }
        return valor;
    };
    Pila.prueba = function () {
        var pilita = new Pila();
        pilita.apilar("Hola");
        pilita.apilar("Mundo");
        pilita.apilar("TS");
        console.log(pilita.desapilar());
        console.log(pilita.desapilar());
        console.log(pilita.desapilar());
        console.log(pilita.desapilar());
    };
    return Pila;
}());


var AFDP = /** @class */ (function () {
    function AFDP() {
        this.pila = new Pila();
    }
    AFDP.prototype.completarPila = function (texto) {
        var QF = 100;
        var QE = -1;
        var Q = 0;
        console.log(QF + " " + QE);
        while (Q != QF && Q != QE) {
            var simbolo = Scanner.obtenerSimbolo(texto);
            if(simbolo == undefined){
                break;
            }
            console.log(simbolo);
            console.log(this.pila);
            
            if (simbolo != null && simbolo != undefined) {
                if (simbolo.getCadena() === "if" || simbolo.getCadena() === "else"
                    || simbolo.getCadena() === "while" || simbolo.getCadena() === "endif"
                    || simbolo.getCadena() ==="endwhile"  || simbolo.getCadena() === "$") {
                    switch (Q) {
                        case 0:
                            if (simbolo.getCadena().localeCompare("if") && this.pila.estaVacia()) {
                                this.pila.apilar(simbolo);
                                Q = 1;
                            }
                            else if (simbolo.getCadena().localeCompare("while") && this.pila.estaVacia()) {
                                this.pila.apilar(simbolo);
                                Q = 1;
                            }
                            else {
                                Q = QE;
                            }
                            console.log("Paso estado 0");
                            break;
                        case 1:
                            if (!this.pila.estaVacia()) {
                                console.log("RPTA");
                               
                                console.log(this.pila.cima().getCadena() === "if");
                                console.log(simbolo.getCadena() === "endif");
                               
                                if (simbolo.getCadena() === "if" || simbolo.getCadena() === "while") {
                                    this.pila.apilar(simbolo);
                                }
                                else if (simbolo.getCadena() === "else" && this.pila.cima().getCadena()==="if") {
                                    this.pila.apilar(simbolo);
                                }
                                else if (simbolo.getCadena() === "endif" && this.pila.cima().getCadena()=== "else") {
                                    this.pila.desapilar();
                                    this.pila.desapilar();
                                }
                                else if (simbolo.getCadena() === "endif" && this.pila.cima().getCadena()=== "if") {
                                    this.pila.desapilar();
                                    console.log("Desapilo");
                                }
                                else if (simbolo.getCadena() === "endwhile" && this.pila.cima().getCadena()==="while") {
                                    this.pila.desapilar();
                                }
                                else {
                                    console.log("errorrrr");
                                    Q = QE;
                                    break;
                                }
                            }
                            else if (simbolo.getCadena() === "$" && this.pila.estaVacia()) {
                                Q = QF;
                                
                                break;
                            }
                            else if (simbolo.getCadena() === "if" && this.pila.estaVacia()) {
                                this.pila.apilar(simbolo);
                            }
                            else if (simbolo.getCadena() === "while" && this.pila.estaVacia()) {
                                this.pila.apilar(simbolo);
                            }
                            else {
                                Q = QE;
                                break;
                            }
                            console.log(Q);
                            break;
                    }
                }
            }
        }
        if (Q === QF) {
            console.log("Reconoce");
        }
        else {
            console.log("Error");
        }
    };
    return AFDP;
}());

/* Codigo JavaScript */
let textArea_txt;
let simbolos;

function showTable() {
    let div1 = document.getElementById("tabla_resultados");

    if (div1.hasChildNodes()) {
        while (div1.childNodes.length >= 1) {
            div1.removeChild(div1.firstChild);
        }
    }

    let tabla = document.createElement("table");
    let thead = document.createElement("thead");
    let tbody = document.createElement("tbody");
    let th1 = document.createElement("th");
    let th2 = document.createElement('th');
    let trh = document.createElement('tr');
    th1.innerText = "Simbolo";
    th2.innerText = "Tipo";
    trh.appendChild(th1);
    trh.appendChild(th2);


    thead.appendChild(trh);
    tabla.appendChild(thead);
    tabla.appendChild(tbody);

    Scanner.indice = 0;
    let simbolo;

    do {
        simbolo = Scanner.obtenerSimbolo(textArea_txt);
        if (simbolo != null) {
            let trRow = document.createElement("tr");
            let td1 = document.createElement("td");
            td1.innerText = simbolo.cadena;
            let td2 = document.createElement("td");
            td2.innerText = simbolo.tipo;
            trRow.appendChild(td1);
            trRow.appendChild(td2);
            tbody.appendChild(trRow);
        }
    } while (simbolo != null);

    div1.appendChild(tabla);
}


function getText() {
    textArea_txt = document.getElementById("textarea_code").value;
    updateCountsTextArea(textArea_txt);
}

function updateCountsTextArea(txt) {
    let c_id = 0;
    let c_op = 0;
    let c_kw = 0;
    let c_num = 0;
    let c_char = 0;
    let c_str = 0;
    let c_dt = 0;
    let c_other = 0;
    Scanner.indice = 0;
    let simbolo;

    do {
        simbolo = Scanner.obtenerSimbolo(txt);
        console.log(simbolo);
        if (simbolo != null || simbolo != undefined) {
            switch (simbolo.getTipo()) {
                case "Palabra Reservada":
                    c_kw++;
                    break;

                case "Identificador":
                    c_id++;
                    break;

                case "Numero":
                    c_num++;
                    break;

                case "Operador Relacional":
                case "Operador Logico":
                case "Operador Aritmetico":
                    c_op++;
                    break;

                case "Caracter":
                    c_char++;
                    break;

                case "Cadena":
                    c_str++;
                    break;

                case "Tipo de Dato":
                    c_dt++;
                    break;

                case "Otro":
                    c_other++;
                    break;

            }
        }
    } while (simbolo != null);

    document.getElementById("kw").innerHTML = c_kw;
    document.getElementById("op").innerHTML = c_op;
    document.getElementById("num").innerHTML = c_num;
    document.getElementById("char").innerHTML = c_char;
    document.getElementById("id").innerHTML = c_id;
    document.getElementById("str").innerHTML = c_str;
    document.getElementById("dt").innerHTML = c_dt;
    document.getElementById("other").innerHTML = c_other;


}

function leerArchivo(e) {
    var archivo = e.target.files[0];
    if (!archivo) {
        return;
    }
    var lector = new FileReader();
    lector.onload = function (e) {
        var contenido = e.target.result;
        document.getElementById("textarea_code").value = contenido;
    };
    var cadena = lector.readAsText(archivo);

}

function mostrarContenido(contenido) {
    var elemento = document.getElementById('contenido-archivo');
    elemento.innerHTML = contenido;
}

document.getElementById('file-input')
    .addEventListener('change', leerArchivo, false);


let auto = new AFDP();
console.log("sdasd");
console.log(auto);
auto.completarPila("/*adhahda*/ if // askjhasd\n endif while if else endif endwhile$");

