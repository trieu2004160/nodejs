const express = require("express");
const path = require("path");
require("dotenv").config();
const configViewEngine = require("./config/viewEngine.js");
const webRoutes = require("./routes/web.js");
const connection = require("./config/database.js");

const app = express();
const port = process.env.PORT || 3000;
const hostname = process.env.HOST_NAME || "localhost";

// 🟢 Đặt middleware xử lý form TRƯỚC khi khai báo router
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ⚙️ Cấu hình view engine
configViewEngine(app);

// 🛣️ Khai báo router
app.use("/", webRoutes);

// 🧪 Kết nối database (test thử)
connection.query("SELECT * FROM Users", function (err, results, fields) {
  console.log(">>>results=", results);
});

// 🚀 Khởi động server
app.listen(port, hostname, () => {
  console.log(`Example app listening on http://${hostname}:${port}`);
});
