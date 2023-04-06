const express = require("express");

const Router = express.Router();

const {
  getAllUsers,
  getUser,
  createUser,
  updateUser,
  deleteUser
  // checkId,
  // updateFn,
  // createFn,
} = require("../controllers/userController");

// Router.param("id", checkId);

Router.route("/").get(getAllUsers).post(createUser);

Router.route("/:id").get(getUser).patch(updateUser).delete(deleteUser);

module.exports = Router;
