const { Client } = require('whatsapp-web.js');
const qrcode = require('qrcode');
const express = require('express');
const app = express();
const questionBank = require('./preguntas'); // Banco de preguntas
const { exec } = require('child_process');

let client = null; // Variable para mantener la instancia del cliente
let qrCodeImageUrl = null; // Variable para guardar el QR generado
let isAuthenticated = false; // Indicador para saber si hay una sesión activa
let currentQuestionId = null; // Inicializar currentQuestionId
const users = {}; // Variable para guardar los usuarios

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
  client.on('message', async message => {
    const userId = message.from;
    console.log('Mensaje recibido de:', userId);

    if (!users[userId]) {
        users[userId] = {
            currentQuestionId: null, 
            state: 'inicio' 
        };
    }

    const user = users[userId];
    const userMessage = message.body.trim();

    try {
      if (!isNaN(userMessage)) {
          const number = parseInt(userMessage, 10);

          // Lógica para manejar números
          if (user.currentQuestionId) { 
              const subquestions = questionBank[user.currentQuestionId]?.subquestions;

              //Compara para ver si el número es 0
              if (number === 0) {
                  const parentId = user.currentQuestionId.split('.').slice(0, -1).join('.');
                  user.currentQuestionId = parentId || null;

                  if (!user.currentQuestionId) {
                      const questionsList = getQuestionsList();
                      const messasgeFinal= `En AR juegos nos dedicamos a la venta de juegos, NO tenemos servicio de arriendo.`
                      return message.reply(`Has regresado al menú principal:\n\n${questionsList}\n${messasgeFinal}`);
                  } else {
                      const parentQuestion = questionBank[user.currentQuestionId];
                      const suboptions = getSubquestionsList(parentQuestion?.subquestions);
                      return message.reply(`${parentQuestion?.question}\n\n${suboptions}`);
                  }
              } else if (subquestions && subquestions[number]) {
                  user.currentQuestionId = `${user.currentQuestionId}.${number}`;
                  const nextQuestion = questionBank[user.currentQuestionId];

                  if (nextQuestion?.subquestions) {
                      const suboptions = getSubquestionsList(nextQuestion?.subquestions);
                      return message.reply(`${nextQuestion?.question}\n\n${suboptions}`);
                  } else {
                      if (user.currentQuestionId.split('.').length === 3) {
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
                  if ([5, 6, 7, 8].includes(number)) {
                      await message.reply('Estamos procesando tu solicitud');
                  }

                  if (question.subquestions) {
                      user.currentQuestionId = number.toString();
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
          // Si el mensaje no es un número, reiniciar la conversación
          user.currentQuestionId = null; // Reiniciamos el estado del usuario
          const questionsList = getQuestionsList();
          const replyMessage = `Hola buenas, soy un Bot de la Empresa AR Juegos. Estoy aquí para responder alguna de las siguientes preguntas:`;
          const messasgeFinal= `En AR juegos nos dedicamos a la venta de juegos, NO tenemos servicio de arriendo.`
          return message.reply(`${replyMessage}\n\n${questionsList}\n${messasgeFinal}`);
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
      if (count >= 8) break; // Limitar a las primeras 8 preguntas
      questionsList += `${count + 1}. ${questionBank[key]?.question}\n`;
      count++;
    }
    return questionsList;
  }

  client.initialize(); // Inicializar el cliente
};

// Inicializar el cliente por primera vez
initializeClient();

//Rutas Web de HTML que Renderiza en el Navegador

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
          <p>Este código QR se actualiza automáticamente si es necesario.</p>
        </body>
        <script>
          setTimeout(function() {
            window.location.reload();
          }, 1000); // Recarga la página cada 1 segundo
        </script>
        </html>
      `);
    } else {
      res.send(`
        <html>
        <head>
          <title>Código QR de WhatsApp</title>
        </head>
        <body style="text-align: center; font-family: Arial, sans-serif;">
          <h1>No hay un Código QR disponible. Por favor, espera un momento...</h1>
        </body>
        <script>
          setTimeout(function() {
            window.location.reload();
          }, 2000); // Recarga cada 2 segundos hasta que el QR esté disponible
        </script>
        </html>
      `);
    }
  } else {
    res.send(`
      <html>
      <head>
        <title>Sesión activa</title>
      </head>
      <body style="text-align: center; font-family: Arial, sans-serif;">
        <h1>Ya hay una sesión activa en el cliente de WhatsApp.</h1>
      </body>
              <script>
          setTimeout(function() {
            window.location.reload();
          }, 1000); // Recarga cada 1 segundo hasta que el QR esté disponible
        </script>
      </html>
    `);
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

app.all('/restart-bot', (req, res) => {
  exec('pm2 restart bot', (error, stdout, stderr) => {
    if (error) {
      console.error(`Error al reiniciar el bot: ${error.message}`);
      return res.status(500).send('Error al reiniciar el bot.');
    }

    if (stderr) {
      console.error(`Stderr: ${stderr}`);
      return res.status(500).send('Error al reiniciar el bot.');
    }

    console.log(`Bot reiniciado exitosamente: ${stdout}`);
    res.status(200).send('Bot reiniciado exitosamente.');
  });
});

app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="es">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Panel de Administración</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          background-color: #f4f4f4;
        }
        .container {
          text-align: center;
        }
        button {
          padding: 10px 20px;
          font-size: 16px;
          cursor: pointer;
          margin: 10px;
        }
        button#restart {
          background-color: #f44336; /* Rojo */
          color: white;
        }
        button#qr {
          background-color: #4CAF50; /* Verde */
          color: white;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>Panel de Administración</h1>
        <button id="restart" onclick="reiniciarBot()">Reiniciar Bot</button>
        <button id="qr" onclick="window.location.href='/qr'">Ver QR</button>
      </div>

      <script>
        function reiniciarBot() {
          // Realizar la solicitud fetch para reiniciar el bot
          fetch('/restart-bot', {
            method: 'POST', // o 'GET' según lo que hayas configurado en el backend
            headers: {
              'Content-Type': 'application/json'
            }
          })
          .then(response => {
            if (response.ok) {
              alert('Bot reiniciado exitosamente.');
            } else {
              alert('Error al reiniciar el bot.');
            }
          })
          .catch(error => {
            alert('Error al realizar la solicitud: ' + error);
          });
        }
      </script>
    </body>
    </html>
  `);
});

// Iniciar el servidor Express
const PORT = process.env.PORT || 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Servidor escuchando en puerto ${PORT}.`);
});
