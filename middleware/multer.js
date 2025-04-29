import multer from "multer";

const storageConfig = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "documents");
  },
  filename: (req, file, cb) => {
    console.log(file)
    cb(null, file.originalname);
  },
});

export default multer({ storage: storageConfig })
