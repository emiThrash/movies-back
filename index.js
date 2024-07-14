
const express = require("express");
require("dotenv").config();
const { logger } = require("./middlewares/loginMidd");
const errorHandler = require("./middlewares/errorHandler");
const path = require("path");

const app = express();


app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(express.json());

const PORT = process.env.SERVER_PORT || 3000;

app.all("*", (req, res) => {
    res.status(404);
  
    if (req.accepts("html")) {
      res.sendFile(path.join(__dirname, "pages", "404.html"));
    } else if (req.accepts("json")) {
      res.json({ error: "404 not found" });
    } else {
      res.type("txt").send("404 not found");
    }
  });

app.use("/", express.static(path.join(__dirname, "public")));
app.use("/movies", require("./routes/movies.router")); 
app.use("/", require("./routes/root.router"));
app.use("/users", require("./routes/user.router"));


app.use(errorHandler);

app.listen(PORT, () => console.log(`Servidor funcionando en http://localhost:${PORT}`));