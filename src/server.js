const express = require("express");
const path = require("path");
require("dotenv").config();
const configViewEngine = require("./config/viewEngine.js");
const webRoutes = require("./routes/web.js");
const connection = require("./config/database.js");
const mysqlPool = require("./config/mysql.js");
const Kitten = require("./models/Kitten.js"); // Import model Kitten
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

// 🚀 Khởi động server
(async () => {
  await connection();
  const names = ["hoi trieu it ", "Silence", "Zildjian", "hieu"];
  const existedNames = await Kitten.find({ name: { $in: names } }).distinct(
    "name"
  );
  const toCreate = names.filter((name) => !existedNames.includes(name));
  await Promise.all(toCreate.map((name) => new Kitten({ name }).save()));
  app.listen(port, hostname, () => {
    console.log(`Example app listening on http://${hostname}:${port}`);
  });
})();

// Test kết nối MySQL
const test = mysqlPool.getConnection((err, connection) => {
  if (err) {
    console.error("Lỗi kết nối MySQL:", err);
    return;
  }
  console.log("Kết nối MySQL thành công!");
  connection.release(); // Giải phóng kết nối sau khi sử dụng
});
