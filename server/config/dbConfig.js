import mysql from "mysql2/promise";

const adminConfig = {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_ADMIN_USER,
  password: process.env.MYSQL_ADMIN_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  multipleStatements: false,
  namedPlaceholders: true,
};

const customerConfig = {
  host: process.env.MYSQL_HOST,
  port: process.env.MYSQL_PORT,
  user: process.env.MYSQL_CUSTOMER_USER,
  password: process.env.MYSQL_CUSTOMER_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  multipleStatements: false,
  namedPlaceholders: true,
};

// Create connection pools
export const adminDb = mysql.createPool(adminConfig);
export const customerDb = mysql.createPool(customerConfig);
