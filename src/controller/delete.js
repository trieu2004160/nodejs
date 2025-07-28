const User = require("../models/User");

const deleteStudent = async (req, res) => {
  const studentId = req.params.id;
  try {
    await User.findByIdAndDelete(studentId);
    res.redirect("/users");
  } catch (err) {
    console.error("Lỗi khi xóa:", err);
    res.status(500).send("Đã xảy ra lỗi khi xóa học sinh.");
  }
};

module.exports = {
  deleteStudent,
};
