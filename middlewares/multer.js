const multer = require("multer");
const path = require("path");
const fs = require("fs");
const { v4: uuid } = require("uuid");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    let uploadPath = "uploads/users";
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },

  filename: function (req, file, cb) {
    const prefix = req.body.f_Email || file.originalname;
    const filename = prefix.replace(/[[^a-zA-Z0-9]]/g, "_");
    cb(null, filename + "_" + uuid() + path.extname(file.originalname));
  },
});

const fileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/jpg" ||
    file.mimetype === "image/png"
  )
    cb(null, true);
  else {
    cb(new Error("Invalid file type, only images are allowed!"), false);
  }
};

const upload = multer({ storage, fileFilter });
module.exports = upload;
