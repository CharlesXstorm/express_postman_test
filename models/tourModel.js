const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.2,
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"],
  },
});

const TourModel = mongoose.model("Tour", tourSchema);

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
//   })

module.exports = TourModel;
