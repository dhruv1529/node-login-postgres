require("dotenv").config();
const user = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      msg: "Please provide email and password",
    });
  }
  const result = await user.findOne({ where: { email } });
  if (!result || !(await bcrypt.compare(password, result.password))) {
    return res.status(401).json({
      success: false,
      msg: "Invalid Cred",
    });
  }
  const users = {
    data: result,
    token: generateToken(result.id),
  };
  res.json({
    success: true,
    data: users,
    msg: "Login successful",
  });
};

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};
module.exports = login;
