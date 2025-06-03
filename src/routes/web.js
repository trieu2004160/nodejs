const express = require("express");
const router = express.Router();

// Import các controller
const { getUser } = require("../controller/User");
const { addstudent, saveStudent } = require("../controller/addUser");
const { showEditForm, updateStudent } = require("../controller/edit");
const { deleteStudent } = require("../controller/delete");

// Routes
router.get("/users", getUser); // Hiển thị danh sách học sinh
router.get("/add-student", addstudent); // Hiển thị form thêm học sinh
router.post("/add-student", saveStudent); // Xử lý thêm học sinh
router.get("/edit-student/:id", showEditForm);
router.post("/edit-student/:id", updateStudent);
router.get("/delete-student/:id", deleteStudent); // route xóa

module.exports = router;
