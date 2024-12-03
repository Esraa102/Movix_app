import jwt, { decode } from "jsonwebtoken";
import { User } from "../models/user.model.js";
import { ENV_VARS } from "../config/env_Vars.js";
import { MESSAGES } from "../constants/messages.js";

const verifyToken = async (req, res, next) => {
  const token = req.cookies.movix_token;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Invalid Or Expired Token, You Need To Log In ",
    });
  } else {
    try {
      const decoded = jwt.verify(token, ENV_VARS.JWT_SECRET);
      if (!decoded) {
        return res.status(401).json({
          success: false,
          message: "Invalid Or Expired Token, You Need To Log In ",
        });
      } else {
        const authUser = await User.findOne({ _id: decoded._id }).select(
          "-password"
        );
        if (!authUser) {
          return res.status(404).json({
            success: false,
            message: "User Not Found",
          });
        }
        req.user = authUser;
        next();
      }
    } catch (error) {
      console.log("Error in verify token" + error.message);
      return res
        .status(500)
        .json({ success: false, message: MESSAGES.serverMessage });
    }
  }
};

export default verifyToken;
