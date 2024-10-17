const chalk = require("chalk");
const mysql = require("mysql2");

const MYSQL_HOSTNAME = process.env.MYSQL_HOSTNAME;
const MYSQL_USER = process.env.MYSQL_USER;
const MYSQL_PASSWORD = process.env.MYSQL_PASSWORD;
const MYSQL_DB_NAME = process.env.MYSQL_DB_NAME;

console.log("MYSQL_HOSTNAME: ", MYSQL_HOSTNAME);
console.log("MYSQL_USER: ", MYSQL_USER);
console.log("MYSQL_PASSWORD: ", MYSQL_PASSWORD);
console.log("MYSQL_DB_NAME: ", MYSQL_DB_NAME);

const pool = mysql.createPool({
    host: MYSQL_HOSTNAME,
    user: MYSQL_USER,
    password: MYSQL_PASSWORD,
    database: MYSQL_DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
}).promise();

console.log(chalk.blueBright.underline(`Database Connected Successfully!`));

if (process.env.NODE_ENV !== "production") {
    console.log(chalk.bgRedBright.underline(`If you are running server on localhost, then change mysql connection details in env file --> config/db.js`));
}

module.exports = pool;
