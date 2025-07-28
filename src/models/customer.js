const mongoose = require("mongoose");

const customerSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    address: String,
    phone: String,
    email: String,
    image: String,
    decription: String,
  },
  {
    timestamps: true,
    //      "createdAt":
    //   "updatedAt": được thêm tự động
  }
);
const Customer = mongoose.model("customer", customerSchema);
module.exports = Customer;
