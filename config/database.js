const { createConnection } = require("mysql2");
require("dotenv").config();

const connection = createConnection({
  port: process.env.DATABASE_PORT,
  host: process.env.DATABASE_HOST,
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASS,
  database: process.env.DATABASE_NAME,
  connectionLimit: 10,
});

module.exports = connection;
