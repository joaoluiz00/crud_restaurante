//db.js

const mysql = require('mysql2/promise');

const conexao = mysql.createPool({
    host: '127.0.0.1', 
    user: 'root',
    password: '',
    database: 'crud_restaurante',
    port: 3306,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});

module.exports = conexao;

