const express = require('express');
const app = express();
const PORT = process.env.PORT;
const connection = require('./db'); // Assuming db.js is in the same directory
require('dotenv').config();

app.use(express.json());

app.get('/', (req, res) => {
  res.status(200).send('Hello, World!');
});

app.post("/api/salvar", async (req, res) => {
  const sensores = req.body;

  // Inicializa vetores para pitch e yaw
  const pitchs = Array(4).fill(null);
  const yaws = Array(4).fill(null);
  let sensorId = null;

  sensores.forEach(s => {
    const id = s.sensor_id;
    if (id >= 0 && id <= 3) {
      pitchs[id] = s.pitch;
      yaws[id] = s.yaw;
    }
    sensorId = id;
  });

  const pacienteId = 1;
  const now = new Date();

  try {
    const [result] = await pool.query(
      `INSERT INTO dados (
        yaw0, yaw1, yaw2, yaw3,
        pitch0, pitch1, pitch2, pitch3,
        sensorId, createdAt, updatedAt, PacienteId
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
      [
        yaws[0], yaws[1], yaws[2], yaws[3],
        pitchs[0], pitchs[1], pitchs[2], pitchs[3],
        sensorId, now, now, pacienteId
      ]
    );

    res.status(200).json({
      message: "Dados salvos com sucesso!",
      insertId: result.insertId
    });
  } catch (error) {
    console.error("Erro ao inserir no banco:", error);
    res.status(500).json({ error: "Erro ao salvar no banco de dados" });
  }
});


app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});