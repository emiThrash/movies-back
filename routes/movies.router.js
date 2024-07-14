const express = require("express");
const moviesController = require("../controllers/moviesController");
const idHandler = require("../middlewares/idHandler");

const router = express.Router();

router
  .route("/")
  .get(moviesController.getMovies)
  .post(moviesController.createMovie);

router
  .route("/:id")
  .get(idHandler, moviesController.getMovie)
  .delete(idHandler, moviesController.deleteMovie)
  .put(idHandler, moviesController.updateMovie);

module.exports = router;