/* eslint-disable no-console */
const fs = require("fs");

const file = require("./dataEntry");

fs.writeFile(
  `${__dirname}/toursamples.json`,
  JSON.stringify(file.toursample),
  () => {
    console.log("converted successfully!!");
    process.exit();
  }
);
