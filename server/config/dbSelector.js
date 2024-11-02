import { adminDb, customerDb } from "./dbConfig.js";

export const getDbConnection = (role) => {
  if (role === "admin") {
    return adminDb;
  } else {
    return customerDb;
  }
};
