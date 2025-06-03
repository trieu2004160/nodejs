const connection = require("../config/database");

const getUser = (req, res) => {
  const keyword = req.query.search || ""; // Đổi từ keyword thành search để khớp với form
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const offset = (page - 1) * limit;
  const keywordSQL = `%${keyword}%`;

  const countQuery = `
    SELECT COUNT(*) AS total 
    FROM Users 
    WHERE name LIKE ? OR email LIKE ?
  `;

  connection.query(countQuery, [keywordSQL, keywordSQL], (err, countResult) => {
    if (err) {
      console.error("Lỗi khi đếm:", err);
      return res.status(500).send("Lỗi khi đếm");
    }

    const totalRows = countResult[0].total;
    const totalPages = Math.ceil(totalRows / limit);

    const dataQuery = `
      SELECT * 
      FROM Users 
      WHERE name LIKE ? OR email LIKE ?
      LIMIT ? OFFSET ?
    `;

    connection.query(
      dataQuery,
      [keywordSQL, keywordSQL, limit, offset],
      (err, results) => {
        if (err) {
          console.error("Lỗi khi truy vấn dữ liệu:", err);
          return res.status(500).send("Lỗi khi truy vấn dữ liệu");
        }

        res.render("student", {
          students: results,
          currentPage: page,
          totalPages,
          hasPrevPage: page > 1,
          hasNextPage: page < totalPages,
          search: keyword,
        });
      }
    );
  });
};

module.exports = {
  getUser,
};
