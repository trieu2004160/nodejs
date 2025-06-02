const connection = require("../config/database");
let users = [];

const gethomepage = (req, res) => {
  connection.query("select * from Users", function (err, results, fields) {
    users = results;
    console.log(">>>results=", results);
    // console.log(">>>users=", users);
    res.send(JSON.stringify(users));
  });
};
const getabc = (req, res) => {
  res.send("this my test abc");
};
module.exports = {
  gethomepage,
  getabc,
};
