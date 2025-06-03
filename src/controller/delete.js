const connection = require("../config/database");

const deleteStudent = (req, res) => {
  const studentId = req.params.id;

  connection.query(
    "DELETE FROM Users WHERE id = ?",
    [studentId],
    (err, result) => {
      if (err) {
        console.error("Lỗi khi xóa:", err);
        return res.status(500).send("Đã xảy ra lỗi.");
      }

      // Sau khi xoá, chuyển về trang danh sách
      res.redirect("/users");
    }
  );
};

module.exports = {
  deleteStudent, // thêm vào để export ra ngoài
};
