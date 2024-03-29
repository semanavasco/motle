const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();

app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname + "/public")));

app.get("/", (req, res) => {
  const mots = require(path.join(__dirname + "/public/assets/mots.json"));

  const mot = mots[Math.floor(Math.random() * mots.length)]
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();

  console.log(mot);

  res.render("index", { WORD: mot });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT} : http://localhost:${PORT}/`);
});
