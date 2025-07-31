const express = require('express');
const pool = require('./db');
const app = express();
const PORT = process.env.PORT || 3000;


app.get('/', async (req, res) => {
  res.send('Welcome to Multi-tier Kubernetes Demo.');
});


app.get('/users', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM users LIMIT 10');
    res.json(result.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Database error');
  }
});

app.listen(PORT, () => {
  console.log(`API service running on port ${PORT}`);
});