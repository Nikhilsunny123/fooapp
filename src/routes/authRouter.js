import express from "express";
import { check, validationResult } from "express-validator";
import bcrypt from "bcrypt";
import AuthApp from "../models/authModel";
import jwtToken from "../common/jwtToken";

const authAppRouter = express.Router();

//signup user
authAppRouter.post(
  "/signup",
  [
    check("email").notEmpty().withMessage("Invalid email"),
    check("fullname").notEmpty().withMessage("Invalid fullname"),
    check("password").notEmpty().withMessage("Invalid password"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, fullname, password } = req.body;
      console.log(req.body);
      const user = await AuthApp.findOne({ email });

      if (user) {
        return res
          .status(500)
          .json({ message: "this email already have an account" });
      } else {
        const securepassword = await bcrypt.hash(password, 10);

        const newUser = new AuthApp({
          email,
          fullname,
          role: "user",
          password: securepassword,
        });
        console.log(newUser);
        await newUser.save();

        return res.status(200).json({
          message: "User created successfully",
          data: fullname,
        });
      }
    } catch (error) {
      return res.status(400).json({ message: error });
    }
  }
);

//login user

authAppRouter.post(
  "/login",
  [
    check("email").notEmpty().withMessage("Invalid email"),
    check("role").notEmpty().withMessage("Invalid email"),
    check("password").notEmpty().withMessage("Invalid password"),
  ],
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const { email, password, role } = req.body;

      const user = await AuthApp.findOne({ email });

      console.log(user, "line 73");
      if (!user) {
        return res.status(500).json({ message: "user doesnt exist" });
      } else if (user.role === role) {
        bcrypt.compare(password, user.password, (err, result) => {
          if (err) {
            return res.status(500).json({ message: "Password is incorrect" });
          } else {
            const token = jwtToken(user);
            console.log(result, "line 82");
            return res.status(200).json({
              message: "Login successfully",
              data: user.fullname,
              token: token,
            });
          }
        });
      } else {
        return res.status(500).json({ message: "user doesnt exist" });
      }
    } catch (error) {
      return res.status(400).json({ message: "Server error" });
    }
  }
);

export default authAppRouter;
