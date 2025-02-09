const mongoose = require("mongoose");

function connectDatabase(url) {
  mongoose
    .connect(url)
    .then(() => console.log("Database Connected"))
}


module.exports = {
    connectDatabase
}