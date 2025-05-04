const express = require("express");
const connection = require("../config/database");
const router = express.Router();

// http://localhost:5000/adduser

/*
  {
    "name":"Goukl",
    "age":"12",
    "email" : "gokul@gmail.com",
    "mobile":"1234567890",
    "category":"Student",
    "gender":"Male",
    "aadhar":"12",
    "pan":"12",
    "password":"2",
    "dob":"12"
  }
*/

router.post("/addfeedback", (req, res) => {
  const { name, email, feedback_type, feedback_on, feedback, rating } =
    req.body;

  const query = `
    INSERT INTO feedback (name, email, feedback_type, feedback_on, feedback, rating) 
    VALUES (?, ?, ?, ?, ?, ?);
  `;

  connection.query(
    query,
    [name, email, feedback_type, feedback_on, feedback, rating],
    (err, result) => {
      if (!err) {
        return res
          .status(200)
          .json({ message: "User feedback successfully", result });
      } else {
        return res.status(500).json({ error: "Database Error", details: err });
      }
    }
  );
});

// // http://localhost:5000/getuser/1
// router.get("/getuser/:id", (req, res) => {
//   const id = req.params.id;

//   const query = `SELECT * FROM user WHERE id = ?;`;

//   connection.query(query, [id], (err, result) => {
//     if (!err) {
//       return res.status(200).json(result);
//     } else {
//       return res.status(500).json(err);
//     }
//   });
// });

router.get("/allfeedback", (req, res) => {
  const query = `SELECT * FROM feedback`;

  connection.query(query, [], (err, result) => {
    if (!err) {
      return res.status(200).json(result);
    } else {
      return res.status(500).json(err);
    }
  });
});

module.exports = router;
