import { getDbConnection } from "../config/dbConfig.js";
import { initUserTable } from "./initTables.js";

const executeQueryWithRetry = async (db, query, params) => {
  try {
    const [result] = await db.query(query, params);
    return result;
  } catch (error) {
    if (error.code === "ER_NO_SUCH_TABLE") {
      // When the table does not exist, create the table and retry the query
      await initUserTable(db); // create the table
      // Retry the query
      const [result] = await db.query(query, params);
      return result;
    } else {
      throw error; // throw error if it's not a table creation error
    }
  }
};

export const createUser = async (email, password) => {
  const db = getDbConnection("user");
  const query = "INSERT INTO users (email, password) VALUES (?, ?)";
  const params = [email, password];

  const result = await executeQueryWithRetry(db, query, params);
  return result.insertId;
};

// Find user by email
export const findUserByEmail = async (email, role = "user") => {
  const db = getDbConnection(role);
  const query =
    "SELECT user_id, email, password, role FROM users WHERE email = ?";
  const params = [email];

  const rows = await executeQueryWithRetry(db, query, params);
  return rows[0];
};

// Find user by ID
export const findUserById = async (userId, role = "user") => {
  console.log("Received userId:", userId);
  const db = getDbConnection(role);
  const query =
    "SELECT user_id, email, password, role FROM users WHERE user_id = ?";
  const params = [userId];

  const rows = await executeQueryWithRetry(db, query, params);

  console.log("Rows:", rows);
  return rows[0];
};

// Update user password
export const updateUserPassword = async (userId, password, role = "user") => {
  try {
    console.log("Updating password for userId:", userId);

    const db = getDbConnection(role);
    const query = "UPDATE users SET password = ? WHERE user_id = ?";
    const params = [password, userId];

    const result = await executeQueryWithRetry(db, query, params);

    console.log("Password update result:", result);
    if (result.affectedRows === 0) {
      throw new Error("User not found or no rows affected");
    }

    return "Password updated successfully";
  } catch (error) {
    console.error("Error updating user password:", error.message);
    throw new Error("Failed to update password");
  }
};
