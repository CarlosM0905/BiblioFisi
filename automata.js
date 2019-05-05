//Deifiniendo atributos y métodos principales
var Simbolo = /** @class */ (function() {
  function Simbolo(cadena, tipo) {
    this.cadena = cadena;
    this.tipo = tipo;
    this.longitud = cadena.length;
  }
  Simbolo.prototype.getCadena = function() {
    return this.cadena;
  };
  Simbolo.prototype.setCadena = function(cadena) {
    this.cadena = cadena;
  };
  Simbolo.prototype.getTipo = function() {
    return this.tipo;
  };
  Simbolo.prototype.setTipo = function(tipo) {
    this.tipo = tipo;
  };
  Simbolo.prototype.getLongitud = function() {
    return this.longitud;
  };
  Simbolo.prototype.setLongitud = function(longitud) {
    this.longitud = longitud;
  };
  Simbolo.prototype.toString = function() {
    return "Cadena:" + this.cadena + " Tipo:" + this.tipo;
  };
  return Simbolo;
}());

//Definiendo Es reservada
var Scanner = /** @class */ (function() {
  function Scanner() {}
  Scanner.esReservada = function(palabra) {
    var inicio = 0;
    var fin = this.PALABRAS_R.length - 1;
    while (inicio <= fin) {
      var medio = parseInt((inicio + fin) / 2);

      if (this.PALABRAS_R[medio].localeCompare(palabra) == 0) {
        return true;
      } else if (this.PALABRAS_R[medio].localeCompare(palabra) > 0) {
        fin = medio - 1;
      } else if (this.PALABRAS_R[medio].localeCompare(palabra) < 0) {
        inicio = medio + 1;
      }
    }
    return false;
  };

  //Definiendo es Tipo Dato
  Scanner.esTipoDato = function(palabra) {
    var inicio = 0;
    var fin = this.TIPOS_DATO.length - 1;
    while (inicio <= fin) {
      var medio = parseInt((inicio + fin) / 2);
      if (this.TIPOS_DATO[medio].localeCompare(palabra) == 0) {
        return true;
      } else if (this.TIPOS_DATO[medio].localeCompare(palabra) > 0) {
        fin = medio - 1;
      } else if (this.TIPOS_DATO[medio].localeCompare(palabra) < 0) {
        inicio = medio + 1;
      }
    }
    return false;
  };

  //Definiendo Obtener Simbolo
  Scanner.obtenerSimbolo = function(cadena) {
    if (this.indice <= cadena.length) {
      while (cadena.charAt(this.indice) == ' ' || cadena.charAt(this.indice) == '\n') {
        this.indice++;
        if (this.indice == cadena.length) {
          return null;
        }
      }

      if (cadena.charAt(this.indice) == '/' && cadena.charAt(this.indice + 1) == '*') {
        console.log("Entro mult");
        this.indice += 2;

        while (cadena.charAt(this.indice) != '*' && cadena.charAt(this.indice + 1) != '/') {
          this.indice++;
        }
        this.indice += 2;
        return new Simbolo("", "Comentario Multilinea");
      }

      if (cadena.charAt(this.indice) == '/' && cadena.charAt(this.indice + 1) == '/') {
        this.indice += 2;
        do {
          this.indice++;
        } while (cadena.charAt(this.indice) != '\n');
        this.indice += 1;
        return new Simbolo("", "Comentario Simple");
      }

      if (cadena.charAt(this.indice) >= 'a' && cadena.charAt(this.indice) <= 'z' ||
        cadena.charAt(this.indice) >= 'A' && cadena.charAt(this.indice) <= 'Z' ||
        cadena.charAt(this.indice) == '_') {
        return this.esIdentificador(cadena, this.indice);
      }

      if (cadena.charAt(this.indice) >= '0' && cadena.charAt(this.indice) <= '9') {
        return this.esNumero(cadena, this.indice);
      }

      if (cadena.charAt(this.indice) == '=' && cadena.charAt(this.indice + 1) == '=' ||
        cadena.charAt(this.indice) == '>' || cadena.charAt(this.indice) == '<' ||
        cadena.charAt(this.indice) == '!' && cadena.charAt(this.indice + 1) == '=') {
        return this.esOperadorR(cadena, this.indice);
      }

      if (cadena.charAt(this.indice) == '&' || cadena.charAt(this.indice) == '|' ||
        cadena.charAt(this.indice) == '!') {
        return this.esOperadorL(cadena, this.indice);
      }

      if (cadena.charAt(this.indice) == '+' || cadena.charAt(this.indice) == '-' ||
        cadena.charAt(this.indice) == '*' || cadena.charAt(this.indice) == '/' ||
        cadena.charAt(this.indice) == '%') {
        return this.esOperadorA(cadena, this.indice);
      }

      if (cadena.charAt(this.indice) == '"') {
        return this.esCadena(cadena, this.indice);
      }

      if (cadena.charAt(this.indice) == '\'') {
        return this.esCaracter(cadena, this.indice);
      }

      if (cadena.charAt(this.indice) >= '!' && cadena.charAt(this.indice) <= '/' ||
        cadena.charAt(this.indice) >= ':' && cadena.charAt(this.indice) <= '@' ||
        cadena.charAt(this.indice) >= '[' && cadena.charAt(this.indice) <= '`' ||
        cadena.charAt(this.indice) >= '{' && cadena.charAt(this.indice) <= '¡') {
        var otro = "";
        otro += cadena.charAt(this.indice);
        this.indice++;
        return new Simbolo(otro, "Otro");
      }
    }
  };

  //Definiendo si es identificador
  Scanner.esIdentificador = function(cadena, indice) {
    var id = "";
    var simbolo;
    while (cadena.charAt(indice) >= 'a' && cadena.charAt(indice) <= 'z' ||
      cadena.charAt(indice) >= 'A' && cadena.charAt(indice) <= 'Z' ||
      cadena.charAt(indice) >= '0' && cadena.charAt(indice) <= '9' ||
      cadena.charAt(indice) == '_') {
      id += cadena.charAt(indice);
      indice++;
    }
    this.indice = indice;
    if (this.esReservada(id)) {
      return simbolo = new Simbolo(id, "Palabra Reservada");
    } else if (this.esTipoDato(id)) {
      return simbolo = new Simbolo(id, "Tipo de Dato");
    } else {
      return simbolo = new Simbolo(id, "Identificador");
    }
  };

  //Definiendo si es número
  Scanner.esNumero = function(cadena, indice) {
    var numero = "";
    var simbolo;
    while (cadena.charAt(indice) >= '0' && cadena.charAt(indice) <= '9' ||
      cadena.charAt(indice) == '.') {
      numero += cadena.charAt(indice);
      indice++;
    }
    this.indice = indice;
    return simbolo = new Simbolo(numero, "Numero");
  };

  //Definiendo Operador Relacional
  Scanner.esOperadorR = function(cadena, indice) {
    var operador = "";
    var simbolo;
    while (cadena.charAt(indice) == '=' || cadena.charAt(indice) == '!' ||
      cadena.charAt(indice) == '>' || cadena.charAt(indice) == '<') {
      operador += cadena.charAt(indice);
      indice++;
    }
    this.indice = indice;
    if (operador === "<<" || operador === ">>") {
      return simbolo = new Simbolo(operador, "Flujo de programa");
    } else {
      return simbolo = new Simbolo(operador, "Operador Relacional");
    }
  };

  //Definiendo Operador Lógico
  Scanner.esOperadorL = function(cadena, indice) {
    var operador = "";
    var simbolo;
    while (cadena.charAt(indice) == '&' || cadena.charAt(indice) == '|' ||
      cadena.charAt(indice) == '!') {
      operador += cadena.charAt(indice);
      indice++;
    }
    this.indice = indice;
    return simbolo = new Simbolo(operador, "Operador Logico");
  };

  //Definiendo Operador Aritmetico
  Scanner.esOperadorA = function(cadena, indice) {
    var operador = "";
    var simbolo;
    while (cadena.charAt(indice) == '+' || cadena.charAt(indice) == '-' ||
      cadena.charAt(indice) == '*' || cadena.charAt(indice) == '/' ||
      cadena.charAt(indice) == '%' || cadena.charAt(indice) == '=') {
      operador += cadena.charAt(indice);
      indice++;
    }
    this.indice = indice;
    return simbolo = new Simbolo(operador, "Operador Aritmetico");
  };

  //Definiendo si es cadena
  Scanner.esCadena = function(cadena, indice) {
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

  //Definiendo Caracter
  Scanner.esCaracter = function(cadena, indice) {
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
    "delete", "do", "else", "endif", "endwhile", "enum", "false", "for", "friend",
    "goto", "if", "inline", "namespace", "new", "operator", "private",
    "protected", "public", "register", "return", "signed", "sizeof", "static",
    "struct", "switch", "this", "throw", "true", "try", "typedef", "typeid", "typename",
    "union", "unsigned", "using", "virtual", "volatile", "while"
  ];
  Scanner.TIPOS_DATO = ["bool", "byte", "double", "float", "int", "long", "short", "void"];
  return Scanner;
}());
//-- Scanner methods and attributes defined


//Here starts what homework was

//--Defining attributes and methods for Pile
var Nodo = /** @class */ (function() {
  function Nodo(valor, sgte) {
    this.valor = valor;
    this.sgte = sgte;
  }
  return Nodo;
}());

var Pila = /** @class */ (function() {
  function Pila() {
    this.tope = null;
  }

  Pila.prototype.estaVacia = function() {
    return this.tope === null;
  };

  Pila.prototype.cima = function() {
    if (this.tope == null) {
      return null;
    } else {
      return this.tope.valor;
    }
  };

  Pila.prototype.apilar = function(valor) {
    if (this.tope === null) {
      this.tope = new Nodo(valor, null);
    } else {
      var nuevo = new Nodo(valor, this.tope);
      this.tope = nuevo;
    }
  };

  Pila.prototype.desapilar = function() {
    var valor;
    if (this.tope != null) {
      valor = this.tope.valor;
      this.tope = this.tope.sgte;
    } else {
      valor = null;
    }
    return valor;
  };

  return Pila;
}());
//Methods and Attributes for file defined

//Defining AFPD Methods
//Most important part of the code
var AFDP = /** @class */ (function() {
  function AFDP() {
    this.pila = new Pila();
  }
  AFDP.prototype.completarPila = function(texto) {
    var QF = 100;
    var QE = -1;
    var Q = 0;

    while (Q != QF && Q != QE) {
      var simbolo = Scanner.obtenerSimbolo(texto);
      if (simbolo == undefined) {
        break;
      }

      if (simbolo != null && simbolo != undefined) {
        if (simbolo.getCadena() === "if" || simbolo.getCadena() === "else" ||
          simbolo.getCadena() === "while" || simbolo.getCadena() === "endif" ||
          simbolo.getCadena() === "endwhile" || simbolo.getCadena() === "$") {
          switch (Q) {
            case 0:
              if (simbolo.getCadena().localeCompare("if") && this.pila.estaVacia()) {
                this.pila.apilar(simbolo);
                Q = 1;
              } else if (simbolo.getCadena().localeCompare("while") && this.pila.estaVacia()) {
                this.pila.apilar(simbolo);
                Q = 1;
              } else {
                Q = QE;
              }

              break;

            case 1:
              if (!this.pila.estaVacia()) {

                if (simbolo.getCadena() === "if" || simbolo.getCadena() === "while") {
                  this.pila.apilar(simbolo);
                } else if (simbolo.getCadena() === "else" && this.pila.cima().getCadena() === "if") {
                  this.pila.apilar(simbolo);
                } else if (simbolo.getCadena() === "endif" && this.pila.cima().getCadena() === "else") {
                  this.pila.desapilar();
                  this.pila.desapilar();
                } else if (simbolo.getCadena() === "endif" && this.pila.cima().getCadena() === "if") {
                  this.pila.desapilar();
                } else if (simbolo.getCadena() === "endwhile" && this.pila.cima().getCadena() === "while") {
                  this.pila.desapilar();
                } else {
                  Q = QE;
                  break;
                }
              } else if (simbolo.getCadena() === "$" && this.pila.estaVacia()) {
                Q = QF;
                break;
              } else if (simbolo.getCadena() === "if" && this.pila.estaVacia()) {
                this.pila.apilar(simbolo);
              } else if (simbolo.getCadena() === "while" && this.pila.estaVacia()) {
                this.pila.apilar(simbolo);
              } else {
                Q = QE;
                break;
              }
              break;
          }
        }
      }
    }
    if (Q === QF) {
      console.log("Reconoce");
    } else {
      console.log("Error");
    }
  };
  return AFDP;
}());

//AFPD Methods defined

//Non-Logic necessary here, just view optical
/* Codigo JavaScript */

let textArea_txt;

//Reading text from text area
function leerArchivo(e) {
  var archivo = e.target.files[0];
  if (!archivo) {
    return;
  }
  var lector = new FileReader();
  lector.onload = function(e) {
    var contenido = e.target.result;
    document.getElementById("textarea_code").value = contenido;
  };
  var cadena = lector.readAsText(archivo);
}

//Get text from TxtArea
function getText() {
  textArea_txt = document.getElementById("textarea_code").value;
  showResults(textArea_txt);
}

function showResults(txt) {
  let auto = new AFDP();
  auto.completarPila(txt);

}

//Shows what the file has
function mostrarContenido(contenido) {
  var elemento = document.getElementById('contenido-archivo');
  elemento.innerHTML = contenido;
}

document.getElementById('file-input')
  .addEventListener('change', leerArchivo, false);
