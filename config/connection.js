let mysql = require("mysql");

// "production": {
//     "use_env_variable": "JAWSDB_URL",
//     "dialect": "mysql",
// }

if (process.env.JAWSDB_URL) {
    connection = mysql.createConnection(process.env.JAWSDB_URL);
} else {
    let connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "Herbie101!",
    database: "pets_db"
});
} 

connection.connect(function(err) {
    if (err) {
    console.error("error connecting: " + err.stack);
    return;
    }
    console.log("connected as id " + connection.threadId);
});

module.exports = connection;
