const express = require("express");
const app = express();

const morgan = require("morgan");

if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

const userRoutes = require("./routes/userRoutes");

app.use(express.json());

app.use("/api/v1/users", userRoutes);

module.exports = app;
