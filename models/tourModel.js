const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
    trim: true
  },
  ratingAverage: {
    type: Number,
    default: 4.2
  },
  ratingQuantity: {
    type: Number,
    default: 0
  },
  price: {
    type: Number,
    required: [true, "A tour must have a price"]
  },
  description: {
    type: String,
    required: [true, "A tour must have a description"],
    trim: true
  },
  summary: {
    type: String,
    required: [true, "A tour must have a summary"],
    trim: true
  },
  groupSize: {
    type: Number,
    required: [true, "A tour must have a group size"]
  },
  startDate: {
    type: Date,
    default: Date.now()
  }
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
