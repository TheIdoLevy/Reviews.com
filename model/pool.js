const Pool = require('pg').Pool;
const dotenv = require('dotenv').config();

const pool = new Pool({
    host: process.env.HOST,
    port: process.env.DB_PORT,
    user: process.env.USERNAME,
    password: process.env.PASSWORD,
    database: process.env.DATABASE,
});

module.exports = pool;