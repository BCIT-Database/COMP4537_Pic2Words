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

const userConfig = {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_CUSTOMER_USER,
  password: process.env.MYSQL_CUSTOMER_PASSWORD,
  database: process.env.MYSQL_DATABASE,
};

export const adminDb = mysql.createPool(adminConfig);
export const userDb = mysql.createPool(userConfig);

// export const getDbConnection = (role) => {
//   const db = role === "admin" ? adminDb : userDb;
//   console.log(`Using ${role}Db`);
//   return db;
// };

export function getDbConnection(role) {
  console.log(`role ${role}`);
  if (role === "admin") {
    console.log(`Using ${role}Db`);
    return adminDb;
  }
  console.log(`Using ${role}Db`);
  return userDb;
}
