import bcrypt from "bcryptjs";
import { getDbConnection } from "../config/dbConfig.js";

export const createUser = async (email, password) => {
  const db = getDbConnection("customer"); // 역할에 따라 연결 풀 가져오기
  console.log("Db query function available:", !!db.query); // db.query가 함수인지 확인

  const [result] = await db.query(
    "INSERT INTO users (email, password) VALUES (?, ?)",
    [email, password]
  );

  return result.insertId;
};

// Find user by email
export const findUserByEmail = async (email, role = "customer") => {
  const db = getDbConnection(role);
  const [rows] = await db.query("SELECT * FROM users WHERE email = ?", [email]);
  return rows[0];
};

// Find user by ID
export const findUserById = async (userId, role = "customer") => {
  const db = getDbConnection(role);
  const [rows] = await db.query("SELECT * FROM users WHERE id = ?", [userId]);
  return rows[0];
};
