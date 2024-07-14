const express = require("express");
const usersController = require("../controllers/usersController");
const idHandler = require("../middlewares/idHandler");

const router = express.Router();

router
  .route("/")
  .get(usersController.getUsers)
  .post(usersController.createUser);

router
  .route("/:id")
  .get(idHandler, usersController.getUser)
  .delete(idHandler, usersController.deleteUser)
  .put(idHandler, usersController.updateUser);

module.exports = router;