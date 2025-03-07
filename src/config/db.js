const { Client } = require ('pg');
require('dotenv').config();

const client = new Client ({
    user: process.env.PG_USER,
    host: process.env.PG_HOST,
    database: process.env.PG_DATABASE_NAME,
    password: process.env.PG_PASSWORD,
    port: process.env.PG_PORT,
});

client.connect().then(()=> console.log('Connected to the Database!')).catch(err => console.error(err));

module.exports = client;