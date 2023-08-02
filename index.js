import express from "express";
import mysql from "mysql2";
import bodyParser from "body-parser";

const app = express();

const dbConfig = {
  host: "localhost",
  user: "root",
  password: "123456789",
  database: "image_uploader_db",
};

const connection = mysql.createConnection(dbConfig);

connection.connect(function (err) {
  if (err) {
    console.error("error connecting: " + err.stack);
    return;
  }

  console.log("conexion exitosa");
});

// Configurar body-parser para manejar JSON y formularios
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.json({ message: "a little dragon" });
});

app.get("/image-uploaded/:id", (req, res) => {
  const imageId = req.params.id;
  console.log(imageId);
  res.send(imageId);
});

const port = 3000;

app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
