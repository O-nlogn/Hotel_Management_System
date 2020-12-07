var sql = require('mysql');

// db config
const config = sql.createConnection({
    host: "localhost",
    user: "root", // your username
    password: "HW8418635@", // your password
    database: "hotel_system",
    dateStrings: "date"
});

module.exports = config;
