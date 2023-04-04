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

// const tourSchema = new mongoose.Schema({
//   name: {
//     type: String,
//     required: [true, "A tour must have a name"],
//     unique: true,
//   },
//   rating: {
//     type: Number,
//     default: 4.2,
//   },
//   price: {
//     type: Number,
//     required: [true, "A tour must have a price"],
//   },
// });

// const TourModel = mongoose.model("Tour", tourSchema);

// const tourDoc = new TourModel({
//   name: "Ikom monoliths",
//   rating: 3.6,
//   price: 460,
// });

// tourDoc
//   .save()
//   .then((doc) => {
//     console.log(doc);
//   })
//   .catch((err) => {
//     console.log(`Error: ${err}`);
//   });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server has started on port: ${PORT}`);
});
