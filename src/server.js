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

connection(); // Kết nối đến MongoDB
// 🟢 Đặt middleware xử lý form TRƯỚC khi khai báo router
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// ⚙️ Cấu hình view engine
configViewEngine(app);

// 🛣️ Khai báo router
app.use("/", webRoutes);

// 🚀 Khởi động server
app.listen(port, hostname, () => {
  console.log(`Example app listening on http://${hostname}:${port}`);
});

const silence = new Kitten({ name: "hoi trieu it " });
silence.save();
console.log("Silence saved!");
