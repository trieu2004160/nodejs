const { model } = require("mongoose");
const Users = require("../models/User");
const getuserapi = async (req, res) => {
  const result = await Users.find({});
  return res.status(200).json({
    data: result,
    error: 0,
  });
};

// dùng để post dữ liệu người dùng mới không
const postuserapi = async (req, res) => {
  let email = req.body.email;
  let name = req.body.name;
  let city = req.body.city;
  let user = await Users.create({
    name: name,
    email: email,
    city: city,
  });
  return res.status(300).json({
    message: "User created successfully",
    error: 0,
  });
};

const putupdateStudent = async (req, res) => {
  const { id, name, email, city } = req.body;
  if (!id || !name || !email || !city)
    return res
      .status(400)
      .json({ message: "Missing required fields", error: 1 });
  try {
    const user = await Users.findByIdAndUpdate(
      id,
      { name, email, city },
      { new: true }
    );
    if (!user)
      return res.status(404).json({ message: "User not found", error: 1 });
    res.json({ message: "User updated successfully", error: 0, data: user });
  } catch (err) {
    console.error("Update user error:", err);
    res.status(500).json({ message: "Server error", error: 1 });
  }
};
module.exports = {
  getuserapi,
  postuserapi,
  putupdateStudent,
};
