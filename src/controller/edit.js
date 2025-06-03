const connection = require("../config/database");

// Hiển thị form sửa học sinh
const showEditForm = (req, res) => {
  const studentId = req.params.id;
  const sql = "SELECT * FROM Users WHERE id = ?";
  connection.query(sql, [studentId], (err, results) => {
    if (err) {
      console.error("Lỗi khi truy vấn:", err);
      return res.status(500).send("Lỗi server");
    }
    if (results.length === 0) {
      return res.status(404).send("Không tìm thấy học sinh");
    }
    res.render("edit", { student: results[0] });
  });
};

// Xử lý lưu thông tin đã sửa
const updateStudent = (req, res) => {
  const studentId = req.params.id;
  const { name, email, city } = req.body;

  const sql = "UPDATE Users SET name = ?, email = ?, city = ? WHERE id = ?";
  connection.query(sql, [name, email, city, studentId], (err, result) => {
    if (err) {
      console.error("Lỗi khi cập nhật:", err);
      return res.status(500).send("Lỗi server");
    }
    res.redirect("/users");
  });
};

module.exports = {
  showEditForm,
  updateStudent,
};
