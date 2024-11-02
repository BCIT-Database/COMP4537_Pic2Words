import Receipt from "../models/receiptModel.js";

export const saveReceiptToDatabase = async (receiptData) => {
  try {
    const receipt = new Receipt(receiptData);
    await receipt.save();
    return receipt;
  } catch (error) {
    console.error("Error saving receipt to database:", error);
    throw new Error("Failed to save receipt to database");
  }
};
