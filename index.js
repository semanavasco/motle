const express = require("express");
const path = require("path");

const PORT = process.env.PORT || 3000;

const app = express();

app.set("views", path.join(__dirname + "/views"));
app.set("view engine", "ejs");

app.use(express.static(path.join(__dirname + "/public")));

app.get("/", (req, res) => {
  res.render("index", { PORT: PORT });
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT} : http://localhost:${PORT}/`);
});
