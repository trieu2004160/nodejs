const express = require("express");
const routerAPI = express.Router();
const {
  getuserapi,
  postuserapi,
  putupdateStudent,
  deleteuserapi,
} = require("../controller/apiController");
// Routes

routerAPI.get("/users", getuserapi); // Lấy danh sách người dùng từ API
routerAPI.post("/users", postuserapi); // Lấy danh sách người dùng từ API
routerAPI.put("/users", putupdateStudent); // Lấy danh sách người dùng từ API
routerAPI.delete("/users", deleteuserapi); // Lấy danh sách người dùng từ API

module.exports = routerAPI;
