const express = require("express");
const path = require("path");

const router = express.Router();

router.route("^/$|/index(.html)?").get((req, res) => {
  res.sendFile(path.join(__dirname, "..", "pages", "index.html"));
});

module.exports = router;
