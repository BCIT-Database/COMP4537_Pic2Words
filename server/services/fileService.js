const cloudStorage = require("cloud-storage-library");

const uploadFile = async (filePath) => {
  try {
    const result = await cloudStorage.upload(filePath);
    return result.url;
  } catch (error) {
    throw new Error("File upload failed: " + error);
  }
};

module.exports = { uploadFile };
