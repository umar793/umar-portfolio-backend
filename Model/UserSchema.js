const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");

const Schema = mongoose.Schema;

const usreSchema = new Schema({
  name: {
    type: String,
    required: [true, "Plaese Enter Your UserName"],
    maxLength: [50, "UserName cannot be exceed 50 character"],
  },
  email: {
    type: String,
    required: [true, "Please Enter Your Email"],
    validate: [validator.isEmail, "Plaese Enter a valid Email"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Please Enter Your Password"],
    minLength: [8, "Password should be greater then 8 character"],
    maxLength: [20, "Password cannot be greater then 20 character"],
  },
  role: {
    type: String,
    default: "user",
  },
});

usreSchema.pre("save", function () {
  if (this.isModified("password")) {
    this.password = bcrypt.hashSync(this.password, 10);
  }
});

const userModel = mongoose.model("user", usreSchema);
module.exports = userModel;
