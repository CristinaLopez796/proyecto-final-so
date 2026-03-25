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

module.exports = router;