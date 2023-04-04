/* eslint-disable no-console */
const dotenv = require("dotenv");

dotenv.config({ path: "./config.env" });

const mongoose = require("mongoose");

const app = require("./app");

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    // console.log(con.connections);
    console.log("Database connection is succesful!");
  });

// console.log(app.get("env"));
// console.log(process.env)

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server has started on port: ${PORT}`);
});
