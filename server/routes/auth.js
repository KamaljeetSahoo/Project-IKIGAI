const express = require("express");
const router = express.Router();
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const fetchUser = require("../middleware/fetchUser");
const env = require("dotenv/config");
const User = require("../models/User");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const JWT_SECRET = "secretkeyforsession";

// AUTH ROUTES :
// Route1: signup
router.post("/signup", async (req, res) => {
  let success = false;
  try {
    //check whteher user with this email exists
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      return res.status(400).send({
        success,
        error: "Please give unique email value,  as email already registered",
      });
    }
    //hash password
    var salt = await bcrypt.genSalt(10);
    console.log(req.body.password);
    var secPass = await bcrypt.hash(req.body.password, salt);
    //if no user exists, then create new user
    user = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: secPass,
      role: req.body.role,
      phone: req.body.phone,
      img: req.body.img,
      enrolledUnder: req.body.enrolledUnder,
    });
    const data = {
      session: {
        id: user.id,
      },
    };
    const authToken = jwt.sign(data, JWT_SECRET);
    success = true;
    res.json({ success, authToken, user });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success,
      error: error.message,
    });
  }
});

//Route2: login: authenticate
router.post(
  "/login",
  body("email", "Enter a valid email").isEmail(),
  async (req, res) => {
    let success = false;
    console.log("inside login");
    // Finds the validation errors in this request and wraps them in an object with handy functions
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success, errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
      //check whether user with this email exists
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).send({
          success,
          error: "Please try to login with correct credentials",
        });
      }
      const passwordCompare = await bcrypt.compare(password, user.password);
      if (!passwordCompare) {
        return res.status(400).send({
          success,
          error: "Please try to login with correct credentials",
        });
      }
      const data = {
        session: {
          id: user.id,
        },
      };
      const authToken = jwt.sign(data, JWT_SECRET);
      success = true;
      res.json({ success, authToken, user });
    } catch (error) {
      console.log(error.message);
      res.status(500).send("Oops internal server error occured");
    }
  }
);

// ROUTE3: Get logged in user details: login required
router.get("/getUser", fetchUser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Oops internal server error occured");
  }
});
// ROUTE34: Get  details of all mentors
router.get("/getAllusers", fetchUser, async (req, res) => {
  try {
    const data = await User.find({ role: "employee" });
    res.send(data);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Oops internal server error occured");
  }
});

// ROUTE5: Get particular user details: login required
router.get("/getDetails/:id", fetchUser, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Oops internal server error occured");
  }
});

// ROUTE6: Get particular employee details for voew profile from Employer: login required
router.get("/getDetailsofEmployee/:id", fetchUser, async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    res.send(user);
  } catch (error) {
    console.log(error.message);
    res.status(500).send("Oops internal server error occured");
  }
});

module.exports = router;
