const userModel = require("../Model/UserSchema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {
  // --------------------------- registration
  CreateUser: async (req, res) => {
    try {
      const { name, email, password } = req.body;
      if (!name) {
        return res.status(400).json({
          success: false,
          message: "Plaese Enter Your UserName",
        });
      }
      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Plaese Enter Your Email",
        });
      }
      if (!password) {
        return res.status(400).json({
          success: false,
          message: "Plaese Enter Your Password",
        });
      }

      const Existuser = await userModel.findOne({ email });
      if (Existuser) {
        return res.status(400).json({
          success: false,
          message: "Email already exist please login",
        });
      } else {
        return res.status(400).json({
          success: false,
          message: "Only Owner Signup , user Signup Available Soon",
        });
      }

      // await userModel.create({
      //   name,
      //   email,
      //   password,
      // });
      // res.status(200).json({
      //   success: true,
      //   message: "Account create successfuly",
      // });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
  //   ====================================== login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      if (!email) {
        return res.status(400).json({
          success: false,
          message: "Plaese Enter Your Email",
        });
      }
      if (!password) {
        return res.status(400).json({
          success: false,
          message: "Plaese Enter Your Password",
        });
      }

      const isUser = await userModel.findOne({ email });
      if (!isUser) {
        return res.status(400).json({
          success: false,
          message: "Email not Exist Plaese SignUp",
        });
      }

      const isMatch = await bcrypt.compare(password, isUser.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Plaese Enter Valid Information",
        });
      }

      const Token = await jwt.sign({ id: isUser._id }, process.env.JWT_KEY, {
        expiresIn: "60d",
      });

      res.status(200).json({
        success: true,
        message: "Login Successfuly",
        Token,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
  // ================= get login user
  loginuser: async (req, res) => {
    try {
      const user = await userModel.findById(req.user._id);
      if (!user) {
        return res.status(400).json({
          success: false,
          message: "Plaese Login Your Token Expire",
        });
      }

      res.status(200).json({
        success: true,
        user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  },
};
