const User = require("../models/User");

const getUser = async (req, res) => {
  const keyword = req.query.search || "";
  const page = parseInt(req.query.page) || 1;
  const limit = 5;
  const skip = (page - 1) * limit;
  const query = keyword
    ? {
        $or: [
          { name: { $regex: keyword, $options: "i" } },
          { email: { $regex: keyword, $options: "i" } },
          { city: { $regex: keyword, $options: "i" } },
        ],
      }
    : {};
  try {
    const totalRows = await User.countDocuments(query);
    const totalPages = Math.ceil(totalRows / limit) || 1;
    const results = await User.find(query).skip(skip).limit(limit);
    res.render("student", {
      students: results,
      currentPage: page,
      totalPages,
      hasPrevPage: page > 1,
      hasNextPage: page < totalPages,
      search: keyword,
    });
  } catch (err) {
    console.error("Lỗi khi truy vấn dữ liệu:", err);
    res.status(500).send("Lỗi khi truy vấn dữ liệu");
  }
};

module.exports = {
  getUser,
};
