const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { body, validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const jwtSecret = "MyNameIsSrshtiBhosle18052002";

router.post(
  "/createuser",
  [
    body("username").isLength({ max: 20 }),
    body("password").isLength({ min: 5 }),
    body("email", "Enter a valid email").isEmail(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const salt = await bcrypt.genSalt(10);
    const secPassword = await bcrypt.hash(req.body.password, salt);

    try {
      await User.create({
        username: req.body.username,
        password: secPassword,
        email: req.body.email,
        location: req.body.location,
      });
      // await User.create({
      //   username: "Srushti",
      //   password: "srush99",
      //   email: "srushti@gmail.com",
      //   location: "mumbai",
      // });

      res.json({ success: true });
    } catch (error) {
      res.json({ success: false });
      console.error(error);
    }
  }
);

router.post(
  "/loginuser",
  [
    body("email", "Enter a valid email").isEmail(),
    body("password").isLength({ min: 5 }),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    let email = req.body.email;
    try {
      const userData = await User.findOne({ email });
      console.log("User Data:", userData);

      if (!userData) {
        return res
          .status(400)
          .json({ errors: "Try logging with correct credentials" });
      }

      const comparePass = await bcrypt.compare(
        req.body.password,
        userData.password
      );

      if (!comparePass) {
        return res
          .status(400)
          .json({ errors: "Try logging with correct credentials" });
      }

      const hash =
        "$2a$10$DWPztYqOLNpEbWRBmJWs8OPISWkDmqI3hsiwFKN.tYNI4oJbpIJHK";
      const password = "12345";

      bcrypt.compare(password, hash, (err, result) => {
        console.log("result",result); // Should print 'true' if the password matches
      });

      const data = {
        user: {
          id: userData.id,
        },
      };

      const authToken = jwt.sign(data, jwtSecret);

      return res.json({ success: true, authToken: authToken });
    } catch (error) {
      res.json({ success: false });
      console.error(error);
    }
  }
);

module.exports = router;

// email : srushti@gmail.com
// password: 12345

// email : abc@gmail.com
// password: 123456