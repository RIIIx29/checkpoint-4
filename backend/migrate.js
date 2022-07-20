require("dotenv").config();

const fs = require("fs");
const mysql = require("mysql2/promise");

const migrate = async () => {
  const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = process.env;

  const connection = await mysql.createConnection({
    host: DB_HOST,
    user: DB_USER,
    password: DB_PASSWORD,
    multipleStatements: true,
  });

  await connection.query(`drop database if exists ${DB_NAME}`);
  await connection.query(`create database ${DB_NAME}`);
  await connection.query(`use ${DB_NAME}`);

  const sql = fs.readFileSync("./database.sql", "utf8");
  const testUsers = fs.readFileSync("./testUsers.sql", "utf8");
  const testProject = fs.readFileSync("./testProject.sql", "utf-8");

  await connection.query(sql);
  await connection.query(testUsers);
  await connection.query(testProject);

  connection.end();
};

try {
  migrate();
} catch (err) {
  console.error(err);
}
