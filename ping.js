const axios = require('axios');

// URL del servidor
const pingUrl = 'https://bot-xw2f.onrender.com/status';

function autoPing() {
  axios
    .get(pingUrl)
    .then((response) => {
      console.log(`Auto-ping exitoso: ${response.status} URL: ${pingUrl}`);
    })
    .catch((error) => {
      console.error('Error en el auto-ping:', error.message);
    });
}

// Exportar la función para ser usada en el archivo principal
module.exports = () => {
  // Ejecutar auto-ping cada 5 minutos
  setInterval(autoPing, 60000);
};
