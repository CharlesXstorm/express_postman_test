
const express = require("express")

const Router = express.Router()

const {getAllUsers,getUser,createUser,updateUser,checkId,updateFn, createFn} = require("../controllers/userController")

Router.param("id",checkId)

Router.route("/")
    .get(getAllUsers)
    .post(createFn,createUser)

Router.route("/:id")
    .get(getUser)
    .patch(updateFn,updateUser)

module.exports = Router