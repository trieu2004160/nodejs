const express = require("express");
const path = require("path");
require("dotenv").config();
const configViewEngine = require("./config/viewEngine.js");
const webRoutes = require("./routes/web.js"); // ✅ đúng tên biến
const app = express();
const port = process.env.PORT || 3000;
const hostname = process.env.HOST_NAME || "localhost"; // ✅ dự phòng nếu .env chưa có
const connection = require("./config/database.js");
// config view engine
configViewEngine(app);

// khai báo router
app.use("/", webRoutes);

//connect data
connection.query("select * from Users", function (err, results, fields) {
  console.log(">>>results=", results);
});
app.listen(port, hostname, () => {
  console.log(`Example app listening on http://${hostname}:${port}`);
});
