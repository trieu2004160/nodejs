const User = require("../models/User");

// Hiển thị form sửa học sinh
const showEditForm = async (req, res) => {
  const studentId = req.params.id;
  try {
    const student = await User.findById(studentId);
    if (!student) {
      return res.status(404).send("Không tìm thấy học sinh");
    }
    res.render("edit", { student });
  } catch (err) {
    console.error("Lỗi khi truy vấn:", err);
    res.status(500).send("Lỗi server");
  }
};

// Xử lý lưu thông tin đã sửa
const updateStudent = async (req, res) => {
  const studentId = req.params.id;
  const { name, email, city } = req.body;
  try {
    await User.findByIdAndUpdate(studentId, { name, email, city });
    res.redirect("/users");
  } catch (err) {
    console.error("Lỗi khi cập nhật:", err);
    res.status(500).send("Lỗi server");
  }
};

module.exports = {
  showEditForm,
  updateStudent,
};
