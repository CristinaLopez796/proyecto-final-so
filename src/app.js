const express = require('express');
const testRoutes = require('./routes/test.routes');

const app = express();

app.use(express.json());
app.use('/api', testRoutes);

module.exports = app;