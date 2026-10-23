import mysql from "mysql2/promise";

const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  port: Number(process.env.DB_PORT || 3306),
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

const db2 = mysql.createPool({
  host: process.env.DB2_HOST,
  user: process.env.DB2_USER,
  port: Number(process.env.DB_PORT || 3306),
  password: process.env.DB2_PASSWORD,
  database: process.env.DB2_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  
});

export { db, db2 };