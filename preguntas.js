
const questionBank = {
    1: { question: "¿Dónde estás ubicados?", answer: "Estamos ubicados en calle El Reten 604, Placilla. Valparaiso." },
    2: { question: "¿Realizan despacho?", answer: "Si, despachamos a todo Chile." },
    3: { question: "¿Cuánto demora el envío?", answer: "Depende de tu comuna. Puedes simular una compra y te aparecerá el tiempo de entrega." },
    4: { question: "¿Necesitas arrendar juegos?", answer: "En AR Juegos solo vendemos juegos inflables y mecánicos, no tenemos el servicio de arriendo." },
    5: {
      question: "¿Qué productos venden?",
      subquestions: {
        1: "Juegos Inflables",
        2: "Juegos Mecánicos",
        3: "Camas Elásticas",
        4: "Repuestos para camas elásticas",
        5: "Turbinas para juegos inflables",
      },
      returnMessage: "Escribe el número de la categoría para más información, o escribe 0 para regresar al menú principal.",
    },
    5.1: {
      question: "Juegos Inflables Disponibles",
      subquestions: {
        1: "Carrera Con Obstáculos",
        2: "Castillo de Bloques",
        3: "Castillo Tobogán",
        4: "Pelotas Chocadoras - Diámetro 1,20MTS Rojo",
        5: "Pelotas Chocadoras - Diámetro 1,20MTS Azul",
        6: "Piscina Infable 10 MTS x 8 MTS x 65 Cm de Alto",
        7: "Piscina Infable 8 MTS x 6 MTS x 65 Cm de Alto",
        8: "Reloj Derribador 5 Metros de Diametro",
        9: "Reloj Derribador 7 Metros de Diametro",
        10: "Tobogan con Obstaculos",
        11: "Tobogan con Piscina Desmontable",
        12: "Tobogan Doble Edad de Piedra - 7 MTS Largo x 5.5 MTS Ancho X 5 MTS Alto",
        13: "Tobogan Inflable Azul Verde",
        14: "Tobogan Inflable Rojo Amarillo",
        15: "Toro Mecánico",
      },
      returnMessage: "Selecciona un número para ver más detalles o escribe 0 para regresar al menú anterior.",
    },
        "5.1.1": {
        question: "Detalles del producto: Carrera Con Obstáculos",
        answer: "Carrera Con Obstáculos. Precio: $2.368.100 CLP. https://arjuegos.cl/products/carrera-con-obstaculos",
        returnMessage: "Escribe 0 para regresar al menú anterior.",
      },
      "5.1.2": {
        question: "Detalles del producto: Castillo de Bloques",
        answer: "Castillo de Bloques. Precio: $2.201.500 CLP. https://arjuegos.cl/products/castillo-de-bloques",
        returnMessage: "Escribe 0 para regresar al menú anterior.",
      },
        "5.1.3": {
        question: "Detalles del producto: CASTILLO TOBOGAN",
        answer: "CASTILLO TOBOGAN. Precio: $2.249.100 CLP. https://arjuegos.cl/products/castillo-tobogan",
        returnMessage: "Escribe 0 para regresar al menú anterior.",
      },
        "5.1.4": {
        question: "Detalles del producto: PELOTAS CHOCADORAS - DIAMETRO 1,20MTS ROJO",
        answer: "PELOTAS CHOCADORAS - DIAMETRO 1,20MTS ROJO. Precio: $141.000 CLP https://arjuegos.cl/products/pelotas-chocadoras-diametro-1-20mts-rojo",
        returnMessage: "Escribe 0 para regresar al menú anterior.",
      },
        "5.1.5": {
        question: "Detalles del producto: PELOTAS CHOCADORAS DIAMETRO 1.20MTS AZUL",
        answer: "PELOTAS CHOCADORAS DIAMETRO 1.20MTS AZUL. Precio: $141.000 CLP. https://arjuegos.cl/products/pelotas-chocadoras",
        returnMessage: "Escribe 0 para regresar al menú anterior.",
      },
        "5.1.6": {
        question: "Detalles del producto: PISCINA INFLABLE 10 mts LARGO  X 8 mts",
        answer: "PISCINA INFLABLE 10 mts LARGO  X 8 mts. Precio: $1.963.500 CLP. https://arjuegos.cl/products/piscina-inflable",
        returnMessage: "Escribe 0 para regresar al menú anterior.",
      },
        "5.1.7": {
        question: "Detalles del producto: PISCINA INFLABLE 8 mts LARGO  X 6 mts ANCHO",
        answer: "PISCINA INFLABLE 8 mts LARGO  X 6 mts ANCHO. Precio: $1.368.500 CLP. https://arjuegos.cl/products/piscina-inflable-1",
        returnMessage: "Escribe 0 para regresar al menú anterior.",
      },
        "5.1.8": {
        question: "Detalles del producto: RELOJ DERRIBADOR 5 METROS DE DIAMETRO",
        answer: "RELOJ DERRIBADOR 5 METROS DE DIAMETRO. Precio: $4.641.000 CLP. https://arjuegos.cl/products/reloj-derribador-5-metros-de-diametro",
        returnMessage: "Escribe 0 para regresar al menú anterior.",
      },
        "5.1.9": {
        question: "Detalles del producto: RELOJ DERRIBADOR 7 METROS DE DIAMETRO",
        answer: "RELOJ DERRIBADOR 7 METROS DE DIAMETRO. Precio: $5.831.000 CLP. https://arjuegos.cl/products/reloj-derribador-7-metros-de-diametro",
        returnMessage: "Escribe 0 para regresar al menú anterior.",
      },
        "5.1.10": {
        question: "Detalles del producto: TOBOGAN CON OBSTACULOS",
        answer: "TOBOGAN CON OBSTACULOS. Precio: $2.249.100 CLP. https://arjuegos.cl/products/tobogan-con-obstaculos",
        returnMessage: "Escribe 0 para regresar al menú anterior.",
      },
        "5.1.11": {
        question: "Detalles del producto: TOBOGAN CON PISCINA DESMONTABLE - MEDIDAS 9 LARGO X 5 ANCHO X 3,5 ALTO",
        answer: "TOBOGAN CON PISCINA DESMONTABLE - MEDIDAS 9 LARGO X 5 ANCHO X 3,5 ALTO. Precio: $2.915.500 CLP . https://arjuegos.cl/products/tobogan-con-piscina-desmontable-medidas-9-largo-x-5-ancho-x-3-5-alto",
        returnMessage: "Escribe 0 para regresar al menú anterior.",
      },
        "5.1.12": {
        question: "Detalles del producto: TOBOGAN DOBLE EDAD DE PIEDRA - MEDIDAS 7 mts LARGO X 5.5 mts ANCHO X 5 mts ALTO",
        answer: "TOBOGAN DOBLE EDAD DE PIEDRA - MEDIDAS 7 mts LARGO X 5.5 mts ANCHO X 5 mts ALTO. Precio: $3.308.200 CLP. https://arjuegos.cl/products/tobogan-doble-edad-de-piedra-medidas-7-mts-largo-x-5-5-mts-ancho-x-5-mts-alto",
        returnMessage: "Escribe 0 para regresar al menú anterior.",
      },
        "5.1.13": {
        question: "Detalles del producto: TOBOGAN INFLABLE AZUL VERDE",
        answer: "TOBOGAN INFLABLE AZUL VERDE. Precio: $1.951.600 CLP . https://arjuegos.cl/products/tobogan-inflable-azul-verde",
        returnMessage: "Escribe 0 para regresar al menú anterior.",
      },
        "5.1.14": {
        question: "Detalles del producto: TOBOGAN INFLABLE ROJO AMARILLO",
        answer: "TOBOGAN INFLABLE ROJO AMARILLO. Precio: $1.951.600 CLP. https://arjuegos.cl/products/tobogan-inflable-rojo-amarillo",
        returnMessage: "Escribe 0 para regresar al menú anterior.",
      },
        "5.1.15": {
        question: "Detalles del producto: TORO MECANICO",
        answer: "TORO MECANICO. Precio: $5.831.000 CLP. https://arjuegos.cl/products/toro-mecanico",
        returnMessage: "Escribe 0 para regresar al menú anterior.",
      },
    "5.2": {
      question: "Juegos Mecánicos Disponibles",
      subquestions: {
        1: "Toro Mecánico",
        2: "Reloj Derribador 5 MTS",
      },
      returnMessage: "Selecciona un número para ver más detalles del producto o escribe 0 para regresar al menú anterior.",
    },
      "5.2.1": {
        question: "Detalles del producto: RELOJ DERRIBADOR 5 METROS DE DIAMETRO",
        answer: "RELOJ DERRIBADOR 5 METROS DE DIAMETRO. Precio: $4.641.000 CLP. https://arjuegos.cl/products/reloj-derribador-5-metros-de-diametro",
        returnMessage: "Escribe 0 para regresar al menú anterior.",
      },
      "5.2.2": {
        question: "Detalles del producto: RELOJ DERRIBADOR 7 METROS DE DIAMETRO",
        answer: "RELOJ DERRIBADOR 7 METROS DE DIAMETRO. Precio: $5.831.000 CLP. https://arjuegos.cl/products/reloj-derribador-7-metros-de-diametro",
        returnMessage: "Escribe 0 para regresar al menú anterior.",
      },
        "5.2.3": {
        question: "Detalles del producto: TORO MECANICO",
        answer: "TORO MECANICO. Precio: $5.831.000 CLP. https://arjuegos.cl/products/toro-mecanico",
        returnMessage: "Escribe 0 para regresar al menú anterior.",
      },
    5.3: {
      question: "Camas Elásticas",
      subquestions: {
        1: "Cama Elástica 3,66 MTS Diámetro",
        2: "Malla de Protección Interior para Cama Elástica",
      },
      returnMessage: "Selecciona un número para ver más detalles o escribe 0 para regresar al menú anterior.",
    },
        "5.3.1": {
        question: "Detalles del producto: CAMA ELASTICA DE 3,66 METROS DE DIAMETRO",
        answer: "CAMA ELASTICA DE 3,66 METROS DE DIAMETRO. Precio: $295.000 CLP. https://arjuegos.cl/products/cama-elastica-de-3-66-metros-de-diametro",
        returnMessage: "Escribe 0 para regresar al menú anterior.",
      },
        "5.3.2": {
          question: "Detalles del producto: MALLA DE PROTECCIÓN INTERIOR PARA CAMA ELÁSTICA 3,96 MTS DE DIÁMETRO 13FT",
          answer: "MALLA DE PROTECCIÓN INTERIOR PARA CAMA ELÁSTICA 3,96 MTS DE DIÁMETRO 13FT. Precio: $62.000 CLP. https://arjuegos.cl/products/malla-de-proteccion-3-96-interior",
          returnMessage: "Escribe 0 para regresar al menú anterior.",
        },
    5.4: {
      question: "Repuestos para Camas Elásticas",
      subquestions: {
        1: "Cama Elástica 3,66 MTS Diámetro",
        2: "Malla de Protección Interior para Cama Elástica",
      },
      returnMessage: "Selecciona un número para ver más detalles o escribe 0 para regresar al menú anterior.",
    },
          "5.4.1": {
          question: "Detalles del producto: CUBRE RESORTE 1,83 - 6 FT",
          answer: "CUBRE RESORTE 1,83 - 6 FT. Precio: $32.000 CLP. https://arjuegos.cl/products/cubre-resorte-1-83-6-ft",
          returnMessage: "Escribe 0 para regresar al menú anterior.",
          },
        "5.4.2": {
          question: "Detalles del producto: CUBRE RESORTE 2,44 - 8 FT",
          answer: "CUBRE RESORTE 2,44 - 8 FT. Precio: $49.000 CLP. https://arjuegos.cl/products/cubre-resorte-2-44-8-ft",
          returnMessage: "Escribe 0 para regresar al menú anterior.",
        },
          "5.4.3": {
          question: "Detalles del producto: CUBRE RESORTE 3,05 - 10 FT",
          answer: "CUBRE RESORTE 3,05 - 10 FT. Precio: $59.000 CLP. https://arjuegos.cl/products/cubre-resorte-3-05-10-ft",
          returnMessage: "Escribe 0 para regresar al menú anterior.",
        },
          "5.4.4": {
          question: "Detalles del producto: CUBRE RESORTE 3,66 - 12 FT",
          answer: "CUBRE RESORTE 3,66 - 12 FT. Precio: $62.000 CLP. https://arjuegos.cl/products/cubre-resorte-3-66-12-ft",
          returnMessage: "Escribe 0 para regresar al menú anterior.",
        },
          "5.4.5": {
          question: "Detalles del producto: CUBRE RESORTE 3,96 - 13 FT",
          answer: "CUBRE RESORTE 3,96 - 13 FT. Precio: $59.000 CLP. https://arjuegos.cl/products/cubre-resorte-3-96-13-ft",
          returnMessage: "Escribe 0 para regresar al menú anterior.",
        },
          "5.4.6": {
          question: "Detalles del producto: CUBRE RESORTE DE 4,27 - 14 FT",
          answer: "CUBRE RESORTE DE 4,27 - 14 FT. Precio: $79.000 CLP. https://arjuegos.cl/products/cubre-resorte-de-4-27-14-ft",
          returnMessage: "Escribe 0 para regresar al menú anterior.",
        },
          "5.4.7": {
          question: "Detalles del producto: ESCALERA PARA CAMA ELASTICA",
          answer: "ESCALERA PARA CAMA ELASTICA. Precio: $23.500 CLP. https://arjuegos.cl/products/escalera-para-cama-elastica",
          returnMessage: "Escribe 0 para regresar al menú anterior.",
        },
          "5.4.8": {
          question: "Detalles del producto: MALLA DE PROTECCION 1,83",
          answer: "MALLA DE PROTECCION 1,83. Precio: $34.000 CLP. https://arjuegos.cl/products/malla-de-proteccion-1-83",
          returnMessage: "Escribe 0 para regresar al menú anterior.",
        },
          "5.4.9": {
          question: "Detalles del producto: MALLA DE PROTECCION 2,44 - 8 FT",
          answer: "MALLA DE PROTECCION 2,44 - 8 FT. Precio: $45.000 CLP. https://arjuegos.cl/products/malla-de-proteccion-2-44-8-ft",
          returnMessage: "Escribe 0 para regresar al menú anterior.",
        },
          "5.4.10": {
          question: "Detalles del producto: MALLA DE PROTECCION 3 METROS - 10 FT",
          answer: "MALLA DE PROTECCION 3 METROS - 10 FT. Precio: $49.000 CLP. https://arjuegos.cl/products/malla-de-proteccion-3-metros-10-ft",
          returnMessage: "Escribe 0 para regresar al menú anterior.",
        },
          "5.4.11": {
          question: "Detalles del producto: MALLA DE PROTECCION 3,66 - INTERIOR",
          answer: "MALLA DE PROTECCION 3,66 - INTERIOR. Precio: $59.000 CLP. https://arjuegos.cl/products/malla-de-proteccion-3-66-out-side",
          returnMessage: "Escribe 0 para regresar al menú anterior.",
        },
          "5.4.12": {
          question: "Detalles del producto: MALLA DE PROTECCION 4,27 INTERIOR",
          answer: "MALLA DE PROTECCION 4,27 INTERIOR. Precio: $62.000 CLP. https://arjuegos.cl/products/malla-de-proteccion-4-27-interior",
          returnMessage: "Escribe 0 para regresar al menú anterior.",
        },
          "5.4.13": {
          question: "Detalles del producto: MALLA DE PROTECCIÓN EXTERIOR PARA CAMA ELASTICA 3,66 MTS DE DIÁMETRO 12FT",
          answer: "MALLA DE PROTECCIÓN EXTERIOR PARA CAMA ELASTICA 3,66 MTS DE DIÁMETRO 12FT. Precio: $59.000 CLP. https://arjuegos.cl/products/malla-de-proteccion-3-66-exterior",
          returnMessage: "Escribe 0 para regresar al menú anterior.",
        },
          "5.4.14": {
          question: "Detalles del producto: MALLA DE PROTECCIÓN INTERIOR PARA CAMA ELÁSTICA 3,96 MTS DE DIÁMETRO 13FT",
          answer: "MALLA DE PROTECCIÓN INTERIOR PARA CAMA ELÁSTICA 3,96 MTS DE DIÁMETRO 13FT. Precio: $62.000 CLP. https://arjuegos.cl/products/malla-de-proteccion-3-96-interior",
          returnMessage: "Escribe 0 para regresar al menú anterior.",
        },
            "5.4.15": {
          question: "Detalles del producto: MALLA DE SALTO 1,83 PARA 36 RESORTES",
          answer: "MALLA DE SALTO 1,83 PARA 36 RESORTES. Precio: $38.000 CLP. https://arjuegos.cl/products/malla-de-salto-1-83-para-36-resortes",
          returnMessage: "Escribe 0 para regresar al menú anterior.",
        },
          "5.4.16": {
          question: "Detalles del producto: MALLA DE SALTO 3,05 METROS PARA 60 RESORTES - DIAMETRO LONA 2,61 MTS",
          answer: "MALLA DE SALTO 3,05 METROS PARA 60 RESORTES - DIAMETRO LONA 2,61 MTS. Precio: $42.000 CLP. https://arjuegos.cl/products/malla-de-salto-3-05-metros-para-60-resortes-diametro-lona-2-61-mts",
          returnMessage: "Escribe 0 para regresar al menú anterior.",
        },
          "5.4.17": {
          question: "Detalles del producto: MALLA DE SALTO 3,20 - PARA 72 RESORTES - CAMA ELASTICA 3,66",
          answer: "MALLA DE SALTO 3,20 - PARA 72 RESORTES - CAMA ELASTICA 3,66. Precio: $58.000 CLP. https://arjuegos.cl/products/malla-de-salto-3-20-para-72-resortes-cama-elastica-3-66",
          returnMessage: "Escribe 0 para regresar al menú anterior.",
        },
          "5.4.18": {
          question: "Detalles del producto: MALLA DE SALTO 3,96 PARA 80 RESORTES",
          answer: "MALLA DE SALTO 3,96 PARA 80 RESORTES. Precio: $60.000 CLP . https://arjuegos.cl/products/malla-de-salto-3-96-para-80-resortes",
          returnMessage: "Escribe 0 para regresar al menú anterior.",
        },
          "5.4.19": {
          question: "Detalles del producto: MALLA DE SALTO 4,27 PARA 80 RESORTES",
          answer: "MALLA DE SALTO 4,27 PARA 80 RESORTES. Precio: $67.000 CLP. https://arjuegos.cl/products/malla-de-salto-4-27-para-80-resortes",
          returnMessage: "Escribe 0 para regresar al menú anterior.",
        },
          "5.4.20": {
          question: "Detalles del producto: PAR DE ESPONJAS CUBRE PILARES, PARA TUBO (2,5CM)",
          answer: "PAR DE ESPONJAS CUBRE PILARES, PARA TUBO (2,5CM). Precio: $8.500 CLP. https://arjuegos.cl/products/par-de-esponjas-cubre-pilares-para-tubo-2-5cm-1",
          returnMessage: "Escribe 0 para regresar al menú anterior.",
        },
          "5.4.21": {
          question: "Detalles del producto: SET DE 10 RESORTES 14,5 CM",
          answer: "SET DE 10 RESORTES 14,5 CM. Precio: $14.000 CLP. https://arjuegos.cl/products/resortes-14-5-cm",
          returnMessage: "Escribe 0 para regresar al menú anterior.",
        },
          "5.4.22": {
          question: "Detalles del producto: SET DE 10 RESORTES DE 17 CM",
          answer: "SET DE 10 RESORTES DE 17 CM. Precio: $14.000 CLP. https://arjuegos.cl/products/set-de-10-resortes-de-17-cm",
          returnMessage: "Escribe 0 para regresar al menú anterior.",
        },
          "5.4.23": {
          question: "Detalles del producto: SET DE 6 PARES DE ESPONJAS CUBRE PILARES, PARA TUBO (2,5CM)",
          answer: "SET DE 6 PARES DE ESPONJAS CUBRE PILARES, PARA TUBO (2,5CM). Precio: $7.500 CLP. https://arjuegos.cl/products/par-de-esponjas-cubre-pilares-para-tubo-2-5cm",
          returnMessage: "Escribe 0 para regresar al menú anterior.",
        },
          "5.4.24": {
          question: "Detalles del producto: SET DE 6 PERNOS",
          answer: "SET DE 6 PERNOS. Precio: $13.200 CLP. https://arjuegos.cl/products/set-de-pernos",
          returnMessage: "Escribe 0 para regresar al menú anterior.",
        },
    5.5: {
      question: "Turbinas Disponibles",
      subquestions: {
        1: "Turbina 1100 Watts 1,5 HP",
        2: "Turbina 1500 Watts 2 HP",
        3: "Turbina 950 Watts 1 HP",
      },
      returnMessage: "Selecciona un número para ver más detalles o escribe 0 para regresar al menú anterior.",
    },
        "5.5.1": {
        question: "Detalles del producto: TURBINA 1100 WATTS 1,5 HP",
        answer: "TURBINA 1100 WATTS 1,5 HP. Precio: $239.000 CLP. https://arjuegos.cl/products/turbina-1100-watts-1-5-hp",
        returnMessage: "Escribe 0 para regresar al menú anterior.",
      },
        "5.5.2": {
          question: "Detalles del producto: TURBINA 1500 WATTS 2 HP",
          answer: "TURBINA 1500 WATTS 2 HP. Precio: $274.000 CLP. https://arjuegos.cl/products/turbina-1500-watts-2-hp",
          returnMessage: "Escribe 0 para regresar al menú anterior.",
        },
          "5.5.3": {
          question: "Detalles del producto: TURBINA 950 WATTS 1 HP",
          answer: "TURBINA 950 WATTS 1 HP. Precio: $225.000 CLP. https://arjuegos.cl/products/turbina-680-watts-0-75-hp",
          returnMessage: "Escribe 0 para regresar al menú anterior.",
        },
    6: { question: "¿Quiero saber el precio de sus productos?", answer: "Puedes revisar nuestro sitio web: https://arjuegos.cl/." },
    7: { question: "¿Tienen ofertas?", answer: "Revisa nuestras ofertas en el sitio web: https://arjuegos.cl/collections/ofertas." },
    8: { question: "Favor enviar catálogo", answer: "Visita nuestro sitio web para ver el catálogo completo: https://arjuegos.cl/." },
    9: { question: "¿Cómo puedo contactarlos?", answer: "Puedes contactarnos a través de nuestro formulario de contacto: https://wa.me/926834706" },
  };

module.exports = questionBank;