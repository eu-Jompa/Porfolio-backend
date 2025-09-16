require("dotenv").config();
const express = require("express");
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

const { envioEmail } = require("./contato"); // note as chaves, porque exportamos { envioEmail }

app.get("/health", (req, res) => res.status(200).send("OK"));
// Rota teste
app.get('/', (req, res) => {
  res.status(200).send("Servidor rodando");
});

// Rota contato
app.post("/contato", async (req, res) => {
  const { nome, email, mensagem } = req.body;

  try {
    await envioEmail({ nome, email, mensagem });
    res.status(200).send("Mensagem enviada com sucesso!");
  } catch (error) {
    console.error(error);
    res.status(400).json({ erro: error.message });
  }
});

// Rota GET só para teste
app.get("/contato", (req, res) => {
  res.status(200).send("Contato funcionando");
});

app.listen(PORT, () => {
  console.log(`Servidor rodando em porfolio-backend-zeta.vercel.app:${PORT}`);
});



