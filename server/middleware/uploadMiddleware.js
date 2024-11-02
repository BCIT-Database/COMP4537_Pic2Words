import multer from "multer";

// memory storage
const storage = multer.memoryStorage();

// file filter
const fileFilter = (req, file, cb) => {
  // console.log("Received file with mimetype:", file.mimetype);

  if (
    file.mimetype.startsWith("image/") ||
    file.mimetype === "application/pdf"
  ) {
    cb(null, true);
  } else {
    // console.error("File rejected:", file.originalname);
    cb(new Error("Only images and PDF files are allowed"), false);
  }
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 10 * 1024 * 1024, // limit files to 10MB
  },
});

export default upload;
