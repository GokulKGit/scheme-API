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
    "community":"ANY",
    "gender":"Male",
    "aadhar":"12",
    "pan":"12",
    "password":"2",
    "dob":"12"
  }
*/

router.post("/adduser", (req, res) => {
  const {
    name,
    age,
    email,
    mobile,
    category,
    community,
    gender,
    aadhar,
    pan,
    password,
    dob,
  } = req.body;

  const query = `
    INSERT INTO user (name, age, email, mobile, category, community, gender, aadhar, pan, password, dob) 
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);
  `;

  connection.query(
    query,
    [name, age, email, mobile, category, community, gender, aadhar, pan, password, dob],
    (err, result) => {
      if (!err) {
        return res
          .status(200)
          .json({ message: "User added successfully", result });
      } else {
        return res.status(500).json({ error: "Database Error", details: err });
      }
    }
  );
});


router.post("/login", (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }

  const query = `
    SELECT * FROM user WHERE email = ? AND password = ?;
  `;

  connection.query(query, [email, password], (err, result) => {
    if (err) {
      return res.status(500).json({ error: "Database Error", details: err });
    }

    if (result.length > 0) {
      return res.status(200).json({
        message: "User login successful",
        user: result[0], // You can customize what fields to send
      });
    } else {
      return res.status(401).json({ error: "Invalid email or password" });
    }
  });
});


// http://localhost:5000/getuser/1
router.get("/getuser/:id", (req, res) => {
  const id = req.params.id;

  const query = `SELECT * FROM user WHERE id = ?;`;

  connection.query(query, [id], (err, result) => {
    if (!err) {
      return res.status(200).json(result);
    } else {
      return res.status(500).json(err);
    }
  });
});

// http://localhost:5000/getusercategory/12
router.get("/getusercategory/:community", (req, res) => {
  const id = req.params.community;

  const query = `SELECT * FROM user WHERE community = ?;`;

  connection.query(query, [id], (err, result) => {
    if (!err) {
      return res.status(200).json(result);
    } else {
      return res.status(500).json(err);
    }
  });
});


router.get("/alluser", (req, res) => {
  const query = `SELECT * FROM user`;

  connection.query(query, [], (err, result) => {
    if (!err) {
      return res.status(200).json(result);
    } else {
      return res.status(500).json(err);
    }
  });
});

module.exports = router;
