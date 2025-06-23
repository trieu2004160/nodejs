const mongoose = require("mongoose");

const kittySchema = new mongoose.Schema({
  name: String,
});
const Kitten = mongoose.model("eric", kittySchema);
console.log("Kitten saved successfully!");

module.exports = Kitten;
