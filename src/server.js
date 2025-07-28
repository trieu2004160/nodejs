const express = require("express");
const path = require("path");
require("dotenv").config();
const configViewEngine = require("./config/viewEngine.js");
const webRoutes = require("./routes/web.js");
const connection = require("./config/database.js");
const mysqlPool = require("./config/mysql.js");
const app = express();
const port = process.env.PORT || 3000;
const hostname = process.env.HOST_NAME || "localhost";
const routeAPI = require("./routes/api.js");
// 🟢 Đặt middleware xử lý form TRƯỚC khi khai báo router
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ⚙️ Cấu hình view engine
configViewEngine(app);

// 🛣️ Khai báo router
app.use("/", webRoutes);
app.use("/v1/api/", routeAPI);

// Route trang chủ hiển thị view student
app.get("/", (req, res) => {
  res.render("student", {
    students: [],
    hasPrevPage: false,
    hasNextPage: false,
    currentPage: 1,
    totalPages: 1,
    search: "",
  });
});

// 🚀 Khởi động server
(async () => {
  await connection(); // Kết nối MongoDB
  app.listen(port, hostname, () => {
    console.log(`Example app listening on http://${hostname}:${port}`);
  });
})();
