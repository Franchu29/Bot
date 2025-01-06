const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const express = require('express');
const app = express();
const questionBank = require('./preguntas'); // Banco de preguntas

let client = null; // Variable para mantener la instancia del cliente
let qrCodeImageUrl = null; // Variable para guardar el QR generado
let isAuthenticated = false; // Indicador para saber si hay una sesión activa
let currentQuestionId = null; // Inicializar currentQuestionId

let lastQRCodeGenerationTime = 0; // Última vez que se generó un QR
const QR_GENERATION_INTERVAL = 30 * 60 * 1000; // Intervalo de 30 minutos (en milisegundos)

// Función para inicializar el cliente
const initializeClient = () => {
  client = new Client({
    puppeteer: {
      args: ['--no-sandbox', '--disable-setuid-sandbox'], // Desactiva el sandboxing
    },
  });

  // Evento para generar el código QR
  client.on('qr', (qr) => {
    if (!isAuthenticated) {
      qrcode.toDataURL(qr, (err, url) => {
        if (err) {
          console.error('Error generando el código QR:', err);
          return;
        }
        qrCodeImageUrl = url;
        console.log('El código QR está disponible. Escanéalo con WhatsApp.');
      });
    }
  });  

  // Evento que se activa cuando el cliente está autenticado
  client.on('authenticated', () => {
    console.log('Cliente autenticado.');
    qrCodeImageUrl = null; // Limpiar el QR después de la autenticación
    isAuthenticated = true; // Marcar la sesión como activa
  });

  // Evento que se activa cuando el cliente está listo
  client.on('ready', () => {
    console.log('Cliente de WhatsApp está listo!');
  });

  // Evento que se activa si la autenticación falla
  client.on('auth_failure', () => {
    console.error('Error de autenticación. Se necesita un nuevo código QR.');
    isAuthenticated = false; // Marcar como no autenticado
  });

  // Evento que se activa cuando el cliente se desconecta
  client.on('disconnected', (reason) => {
    console.error(`Cliente desconectado. Razón: ${reason}`);
    client = null; // Limpiar la instancia del cliente
    qrCodeImageUrl = null; // Limpiar el QR
    isAuthenticated = false; // Marcar como no autenticado
    console.log('Reiniciando cliente de WhatsApp...');
    initializeClient(); // Reiniciar el cliente
  });

  // Evento para manejar los mensajes entrantes y las preguntas
  client.on('message', async (message) => {
    try {
      const userMessage = message.body.trim();

      // Si el mensaje es un número, procesamos las preguntas
      if (!isNaN(userMessage)) {
        const number = parseInt(userMessage, 10);

        if (currentQuestionId) {
          const subquestions = questionBank[currentQuestionId]?.subquestions;

          if (number === 0) {
            const parentId = currentQuestionId.split('.').slice(0, -1).join('.');
            currentQuestionId = parentId || null;

            if (!currentQuestionId) {
              const questionsList = getQuestionsList();
              return message.reply(`Has regresado al menú principal:\n\n${questionsList}`);
            } else {
              const parentQuestion = questionBank[currentQuestionId];
              const suboptions = getSubquestionsList(parentQuestion?.subquestions);
              return message.reply(`${parentQuestion?.question}\n\n${suboptions}`);
            }
          } else if (subquestions && subquestions[number]) {
            currentQuestionId = `${currentQuestionId}.${number}`;
            const nextQuestion = questionBank[currentQuestionId];

            if (nextQuestion?.subquestions) {
              const suboptions = getSubquestionsList(nextQuestion?.subquestions);
              return message.reply(`${nextQuestion?.question}\n\n${suboptions}`);
            } else {
              if (currentQuestionId.split('.').length === 3) {
                await message.reply('Estamos procesando tu solicitud');
              }
              return message.reply(nextQuestion?.answer || "Opción no válida.");
            }
          } else {
            return message.reply("Opción no válida. Selecciona un número válido de la lista o escribe 0 para regresar.");
          }
        } else {
          const question = questionBank[number];
          if (question) {
            if ([6, 7, 8, 9].includes(number)) {
              await message.reply('Estamos procesando tu solicitud');
            }

            if (question.subquestions) {
              currentQuestionId = number.toString();
              const suboptions = getSubquestionsList(question.subquestions);
              return message.reply(`${question?.question}\n\n${suboptions}`);
            } else {
              return message.reply(question?.answer || "Opción no válida.");
            }
          } else {
            return message.reply("Número no válido. Por favor, selecciona una opción del menú principal.");
          }
        }
      } else {
        const questionsList = getQuestionsList();
        const replyMessage = `Hola buenas, soy un Bot de la Empresa AR Juegos. Estoy aquí para responder alguna de las siguientes preguntas:`;
        return message.reply(`${replyMessage}\n\n${questionsList}`);
      }
    } catch (error) {
      console.error('Error al manejar el mensaje:', error);
    }
  });

  // Función para obtener el listado de subpreguntas
  function getSubquestionsList(subquestions) {
    let suboptions = '';
    if (subquestions) {
      Object.keys(subquestions).forEach((key, index) => {
        suboptions += `${index + 1}. ${subquestions[key]}\n`;
      });
    } else {
      suboptions = 'No hay subpreguntas disponibles.';
    }
    suboptions += '\n0. Regresar al menú principal';
    return suboptions;
  }

  // Función para obtener el listado de preguntas
  function getQuestionsList() {
    let questionsList = '';
    let count = 0;
    for (const key in questionBank) {
      if (count >= 9) break; // Limitar a las primeras 8 preguntas
      questionsList += `${count + 1}. ${questionBank[key]?.question}\n`;
      count++;
    }
    return questionsList;
  }

  client.initialize(); // Inicializar el cliente
};

// Inicializar el cliente por primera vez
initializeClient();

// Ruta para mostrar el QR en una página web
app.get('/qr', (req, res) => {
  if (!isAuthenticated) { // Mostrar QR solo si no está autenticado
    if (qrCodeImageUrl) {
      res.send(`
        <html>
        <head>
          <title>Código QR de WhatsApp</title>
        </head>
        <body style="text-align: center; font-family: Arial, sans-serif;">
          <h1>Escanea este Código QR con WhatsApp</h1>
          <img src="${qrCodeImageUrl}" alt="Código QR" style="width:300px;height:300px;">
        </body>
        </html>
      `);
    } else {
      res.send('<h1>No hay un Código QR disponible. Por favor, espera un momento...</h1>');
    }
  } else {
    res.send('<h1>Ya hay una sesión activa. No se necesita un nuevo QR.</h1>');
  }
});

// Ruta para verificar el estado del servidor
app.get('/status', (req, res) => {
  res.status(200).send('Bot está funcionando correctamente.');
});

// Ruta para desconectar manualmente el cliente
app.post('/logout', async (req, res) => {
  try {
    if (client) {
      await client.destroy(); // Finaliza la sesión activa del cliente
      console.log('Cliente de WhatsApp desconectado.');
      isAuthenticated = false; // Marcar como no autenticado
      res.status(200).send('Cliente de WhatsApp desconectado exitosamente.');
    } else {
      res.status(400).send('No hay cliente activo para desconectar.');
    }
  } catch (error) {
    console.error('Error al desconectar el cliente:', error);
    res.status(500).send('Error al desconectar el cliente.');
  }
});

// Iniciar el servidor Express
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en puerto ${PORT}.`);
});
