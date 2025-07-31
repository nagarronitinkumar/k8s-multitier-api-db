const { Pool } = require('pg');

const pool = new Pool({
  user: process.env.DATABASE_USER || 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  database: process.env.DATABASE_NAME || 'testdb',
  password: process.env.DATABASE_PASSWORD || '',
  port: parseInt(process.env.DATABASE_PORT) || 5432,
});

module.exports = pool;
