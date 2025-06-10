const express = require('express');
const app = express();
const PORT = 3000;

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.post("/api/salvar", (req, res) =>{
    const data = req.body;
    console.log("Dados recebidos:", data);
})

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});