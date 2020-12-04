var sql = require('mysql');

// db config
const config = sql.createConnection({
    host: "localhost",
    user: "root", // your username
    password: "1234", // your password
    database: "hotel_system",
    dateStrings: "date"
});
// please rename this filename: db.js
module.exports = config;
