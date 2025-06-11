const express = require('express');
const app = express();
const PORT = process.env.PORT;
const connection = require('./db'); // Assuming db.js is in the same directory
require('dotenv').config();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Hello, World!');
});

app.post("/api/salvar", (req, res) =>{
    const data = req.body;
    console.log("Dados recebidos:", data);
    res.status(200).json({
      message: "Dados recebidos com sucesso!",
      data: data
    })
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});