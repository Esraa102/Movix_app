import jwt from "jsonwebtoken";
import { ENV_VARS } from "../config/env_Vars.js";

const generateToken = (userData) => {
  const token = jwt.sign(
    {
      _id: userData._id,
      username: userData.username,
      email: userData.email,
      image: userData.image,
    },
    ENV_VARS.JWT_SECRET,
    { expiresIn: "7d" }
  );

  return token;
};

export default generateToken;
