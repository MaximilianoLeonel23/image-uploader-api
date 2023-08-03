import express from "express";
import cors from "cors";
import fs from "fs";
const app = express();
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());

import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Images");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("image"), (req, res) => {
  const uploadFilename = req.file.filename;
  console.log("uploadFilename", uploadFilename);

  res.status(201).json({ message: "Imagen subida", fileName: uploadFilename });
});

app.get("/images/:nameImage", (req, res) => {
  const nameImage = req.params.nameImage;
  const filePath = path.join(__dirname, "Images", nameImage);

  fs.access(filePath, fs.constants.F_OK, (error) => {
    if (error) {
      res.status(404).json({ message: "La imagen no fue encontrada" });
    } else {
      res.sendFile(filePath);
    }
  });
});

const port = process.env.PORT ?? 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
