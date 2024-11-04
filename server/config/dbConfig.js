import dotenv from "dotenv";
dotenv.config();
import mysql from "mysql2/promise";

const adminConfig = {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_ADMIN_USER,
  password: process.env.MYSQL_ADMIN_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

const customerConfig = {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_CUSTOMER_USER,
  password: process.env.MYSQL_CUSTOMER_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

export const adminDb = mysql.createPool(adminConfig);
export const customerDb = mysql.createPool(customerConfig);

export const getDbConnection = (role) => {
  const db = role === "admin" ? adminDb : customerDb;
  if (process.env.NODE_ENV !== "production") {
    console.log(`Using ${role}Db`);
  }
  return db;
};
