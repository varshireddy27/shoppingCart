const mongoose = require("mongoose");
async function connect_to_database() {
  await mongoose
    .connect("mongodb://localhost:27017/myapp")
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("Error connecting to MongoDB", err));
}

module.exports = connect_to_database;

