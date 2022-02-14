const express = require("express");

const PORT = process.env.PORT || 8080;
const frase = "Hola mundo como estan?";
const usuarios = [
  { id: 1, nombre: "dedwison" },
  { id: 2, nombre: "shamil" },
];

const app = express();

// middlewares
app.use(express.json());

//rutas

//query
app.get("/api/usuarios", (req, res) => {
  const { nombre } = req.query;
  console.log(nombre);
  res.json(usuarios);
});

//params

app.get("/api/usuarios/:idUsuario", (req, res) => {
  const { idUsuario } = req.params;
  console.log(req.params);
  const usuario = usuarios.find((usuario) => usuario.id === +idUsuario);
  res.json(usuario);
});

app.get("/api/frase", (req, res) => {
  res.json(frase);
});

app.get("/api/letras/:num", (req, res) => {
  const { num } = req.params;
  if (isNaN(+num))
    return res.json({ error: "El paramentro debe ser un número" });
  if (+num < 1 || +num > frase.length)
    return res.json({ error: "El paramentro está fuera de rango" });
  res.json({ letra: frase[+num - 1] });
});

app.get("/api/palabras/:num", (req, res) => {
  const { num } = req.params;
  const palabras = frase.split(" ");
  if (+num < 1 || +num > palabras.length)
    return res.json({ error: "El paramentro está fuera de rango" });
  res.json({ palabra: palabras[+num - 1] });
});

//POST

app.post("/api/usuarios", (req, res) => {
  console.log("PETICION POST RECIBIDAEXIT");
  console.log(req.body);
  res.json({ body: req.body });
});

const connectedServer = app.listen(PORT, () => {
  console.log(`Server is up and running on port: ${PORT}`);
});

connectedServer.on("error", (error) => {
  console.log(error.message);
});
