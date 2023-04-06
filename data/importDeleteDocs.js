/* eslint-disable no-console */
const pat = require("path");

const dotenv = require("dotenv");

dotenv.config({ path: pat.join(__dirname, "../config.env") });

const fs = require("fs");

const file = JSON.parse(
  fs.readFileSync(pat.join(__dirname, "toursamples.json"))
);

const mongoose = require("mongoose");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log("Database connection is succesful!");
  });

const TourModel = require("../models/tourModel");

const deleteDocs = async () => {
  try {
    await TourModel.deleteMany();
    console.log("All docs have been deleted!!");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

const importDocs = async () => {
  try {
    await TourModel.create(file);
    console.log("All docs have been imported!!");
    process.exit();
  } catch (err) {
    console.log(err);
  }
};

if (process.argv[2] === "--delete") {
  deleteDocs();
}
if (process.argv[2] === "--import") {
  importDocs();
}
