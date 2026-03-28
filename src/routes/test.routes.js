const express = require('express');
const router = express.Router();
const pool = require('../config/db');

router.get('/', (req, res) => {
  res.json({
    message: 'API funcionando correctamente'
  });
});

router.get('/db-test', async (req, res) => {
  try {
    const result = await pool.query('SELECT NOW()');

    res.json({
      message: 'Conexión a PostgreSQL exitosa',
      serverTime: result.rows[0].now
    });
  } catch (error) {
    console.error('Error al conectar con la base de datos:', error.message);

    res.status(500).json({
      message: 'Error de conexión con la base de datos',
      error: error.message
    });
  }
});

router.get('/tasks', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM tasks ORDER BY id ASC');

    res.json({
      message: 'Lista de tareas',
      data: result.rows
    });
  } catch (error) {
    console.error('Error al obtener tareas:', error.message);

    res.status(500).json({
      message: 'Error al obtener tareas',
      error: error.message
    });
  }
});

module.exports = router;