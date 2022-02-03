const mysql = require('mysql2');

require("dotenv").config();

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'Blue86Jeep12!',
    database: 'employee_db'
});

module.exports = db;