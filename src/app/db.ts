// src/db.ts
import mysql from "mysql2/promise";

const pool = mysql.createPool({
  host: "192.168.100.170", // Адрес сервера MySQL
  user: "root", // Имя пользователя
  password: "root", // Пароль
  database: "delivery_test", // Имя базы данных
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default pool;