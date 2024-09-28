const JWT = require("jsonwebtoken");
const UserSchema = require("../models/UserSchema");
const JWT_SECRET_KEY = process.env.JWT_SECRET_KEY;

const DecodeToken = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token)
    return res
      .status(400)
      .json({ success: false, error: "Invalid token or no token." });

  const data = JWT.verify(token, JWT_SECRET_KEY);
  
  const userData = await UserSchema.findById(data.user);
  if (!userData)
    return res
      .status(400)
      .json({ success: false, error: "The logged in user does not exist." });

  req.user = data.user;
  next();
};
module.exports = DecodeToken;
