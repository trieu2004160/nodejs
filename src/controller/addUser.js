// const connection = require("../config/database");

const addstudent = (req, res) => {
  res.render("addstudent");
};
const User = require("../models/User");
const saveStudent = async (req, res) => {
  let result = await User.findOne({ email: req.body.email });
  if (result) {
    return res.status(400).send("Email already exists");
  }
  console.log(req.body);
  const { name, email, city } = req.body;
  try {
    await User.create({ name, email, city });
    res.redirect("/users");
  } catch (err) {
    console.error("Error inserting data:", err);
    res.status(500).send("Error inserting data");
  }
};

module.exports = {
  addstudent,
  saveStudent,
};
