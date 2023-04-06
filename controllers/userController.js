/* eslint-disable prefer-destructuring */
/* eslint-disable no-console */
// const fs = require("fs");

// let file = JSON.parse(fs.readFileSync(`${__dirname}/../data/users.json`));

// const rand = "0123456789abcdefghijklmnopqrstuvwxyz"; //STRING SET
//RANDOM STRING PROMISE
// const randomStringPro = (len, char) => {
//     return new Promise((reject, resolve) => {

//         if (len > 42) {
//             reject("The set length must be <= 42")
//         } else {
//             let data = ""

//             for (let i = len; i > 0; --i) {
//                 data += (char[Math.floor(Math.random() * char.length)])
//             }
//             resolve(data)
//         }

//     })
// }

// randomStringPro(48, rand)
//     .then((res) => {
//         console.log("This is a promise "+res)
//     })
//     .catch((err) => {
//         console.log(err)
//     })

//RANDOM STRING FUNCTION
// const randomString = (len, char) => {
//   let data = "";

//   // eslint-disable-next-line no-plusplus
//   for (let i = len; i > 0; --i) {
//     data += char[Math.floor(Math.random() * char.length)];
//   }
//   return data;
// };

// exports.checkId = (req, res, next, val) => {
//   req.val = val;
//   req.user = file.find((el) => req.val === el._id);
//   if (!req.user) {
//     return res.status(404).json({
//       status: "fail",
//       message: "user not found!",
//     });
//   }
//   next();
// };

// exports.updateFn = (req, res, next) => {
//   req.file = file.map((el) => {
//     if (req.val === el._id) {
//       // eslint-disable-next-line node/no-unsupported-features/es-syntax
//       return { ...el, ...req.body };
//     }
//     return el;
//   });
//   file = [...req.file];
//   next();
// };

// exports.createFn = (req, res, next) => {
//   const id = { _id: randomString(24, rand) };
//   file.push(Object.assign(id, req.body));
//   next();
// };
const TourModel = require("../models/tourModel");

exports.getAllUsers = async (req, res) => {
  try {
    // console.log(req.query);
    const query = req.query;
    const queryOBJ = { ...query };
    const exclude = ["limit", "page", "sort", "fields"];
    exclude.forEach((el) => delete queryOBJ[el]);

    let queryStr = JSON.stringify(queryOBJ);
    queryStr = JSON.parse(
      queryStr.replace(/\b(gt|gte|lt|lte)\b/g, (match) => `$${match}`)
    );

    // console.log(queryOBJ, query, queryStr);

    let tourDoc = TourModel.find(queryStr);

    //SORTING
    if (req.query.sort) {
      // console.log(req.query.sort);
      const sortBy = req.query.sort.split(",").join(" ");
      tourDoc = tourDoc.sort(sortBy);
    }

    //FIELDS
    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      // console.log(fields);
      tourDoc = tourDoc.select(fields);
    }

    //PAGINATION
    // console.log(req.query);
    const limit = +req.query.limit;
    const page = req.query.page * 1 || 1;
    const skip = Math.floor((page - 1) * limit);
    const numDoc = await TourModel.countDocuments();
    if (skip >= numDoc) {
      throw new Error("This page does not exist!!");
    }
    tourDoc = tourDoc.skip(skip).limit(limit);

    //EXECUTE THE QUERY
    tourDoc = await tourDoc;

    res.status(200).json({
      status: "success",
      results: tourDoc.length,
      data: tourDoc
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: err
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const tourDoc = await TourModel.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: tourDoc
    });
  } catch (err) {
    res.status(404).json({
      status: "fail",
      message: "Not Found!"
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const tourDoc = await TourModel.create(req.body);
    res.status(201).json({
      status: "success",
      data: tourDoc
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: `The following error was encountered when creating a tour:\n${err}`
    });
  }
};

exports.updateUser = async (req, res) => {
  try {
    await TourModel.findByIdAndUpdate(req.params.id, req.body);
    res.status(201).json({
      status: "success",
      message: "Updated successfully"
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: `Error: ${err}`
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const tourDoc = await TourModel.findByIdAndDelete(req.params.id);
    res.status(200).json({
      status: "success",
      message: `The tourist site ${tourDoc.name} has been successfully deleted`
    });
  } catch (err) {
    res.status(400).json({
      status: "fail",
      message: `Error: ${err}`
    });
  }
};
