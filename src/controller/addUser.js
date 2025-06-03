const connection = require("../config/database");

const addstudent = (req, res) => {
  res.render("addstudent");
};

const saveStudent = (req, res) => {
  const { name, email, city } = req.body;
  console.log("Body", req.body);
  connection.query(
    "INSERT INTO Users (name, email, city) VALUES (?, ?, ?)",
    [name, email, city],
    (err, results) => {
      if (err) {
        console.error("Error inserting data:", err);
        return res.status(500).send("Error inserting data");
      }
      console.log("Data inserted successfully:", results);
      res.redirect("/users"); // Redirect to the user list after saving
    }
  );
};

module.exports = {
  addstudent,
  saveStudent,
};
