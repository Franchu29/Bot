const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const express = require('express');
const app = express();
const questionBank = require('./preguntas');

// Crear una instancia del cliente de WhatsApp
const client = new Client({
  authStrategy: new LocalAuth(), // Autenticación local para mantener la sesión
});

// Evento para generar el código QR
client.on('qr', (qr) => {
  qrcode.generate(qr, { small: true }); // Genera el QR en la terminal
  console.log('Escanea el código QR con WhatsApp');
});

// Evento que se activa cuando el cliente está listo
client.on('ready', () => {
  console.log('Cliente de WhatsApp está listo!');
});

// Variable para rastrear la pregunta actual
let currentQuestionId = null;

// Evento para manejar los mensajes entrantes
client.on('message', async (message) => {
  try {
    const userMessage = message.body.trim();

    // Si el mensaje es un número, procesamos las preguntas
    if (!isNaN(userMessage)) {
      const number = parseInt(userMessage, 10);

      if (currentQuestionId) {
        // Subcategorías o sub-subcategorías
        const subquestions = questionBank[currentQuestionId]?.subquestions;

        if (number === 0) {
          // Regresar al menú principal o al nivel anterior
          const parentId = currentQuestionId.split('.').slice(0, -1).join('.');
          currentQuestionId = parentId || null; // Si no hay nivel anterior, vuelve al menú principal

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
            // Detectar preguntas de sub-subcategorías (3 niveles como 1.1.1)
            if (currentQuestionId.split('.').length === 3) {
              await message.reply('Estamos procesando tu solicitud');
            }
            return message.reply(nextQuestion?.answer || "Opción no válida.");
          }
        } else {
          return message.reply("Opción no válida. Selecciona un número válido de la lista o escribe 0 para regresar.");
        }
      } else {
        // Preguntas generales (nivel principal)
        const question = questionBank[number];
        if (question) {
          // Detectar preguntas generales específicas (6, 7, 8)
          if ([6, 7, 8, 9].includes(number)) {
            await message.reply('Estamos procesando tu solicitud');
          }

          if (question.subquestions) {
            currentQuestionId = number.toString(); // Actualizamos el nivel actual
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
      // Mensaje no es un número
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
  if (subquestions) { // Comprobamos que haya subpreguntas
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

// Iniciar el cliente de WhatsApp
client.initialize();

// Ruta para obtener preguntas específicas
app.get('/question/:id', (req, res) => {
  const questionId = req.params.id;
  const question = questionBank[questionId];

  if (question) {
    res.json({ question: question.question, answer: question.answer });
  } else {
    res.status(404).send('Pregunta no encontrada');
  }
});

// Iniciar el servidor Express
app.listen(3000, () => {
  console.log('Servidor escuchando en puerto 3000');
});