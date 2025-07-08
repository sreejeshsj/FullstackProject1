import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import validator from "validator";
import jwt from "jsonwebtoken";

const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};
const userRegister = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const user = await userModel.findOne({ email });

    if (user) {
      return res.json({
        sucess: false,
        message:
          "User with email is already exisit, Please provide another email",
      });
    }
    //validating email and password

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please Enter a valid email",
      });
    }

    if (password.length < 8) {
      return res.json({
        sucess: false,
        message: "Password should contain atleast 8 character",
      });
    }
    //hashing the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    //creating new user

    const newUser = await userModel.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = createToken(newUser._id);

    res.json({
      sucess: true,
      message: "User is created Successfully",
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      success: false,
      message: "Somthing went wrong while trying Register",
      err,
    });
  }
};
const userLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.json({
        message: "User with email is not exist",
      });
    }

    //compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    } else {
      const token = createToken(user._id);

      res.json({
        success: true,
        message: "Logged In Successfully",
        token,
      });
    }
  } catch (err) {
    console.log(err);
    res.json({
      success: false,
      message: "Something went wrong while trying login",
    });
  }
};

const adminLogin = async (req, res) => {};
export { userLogin, userRegister, adminLogin };
