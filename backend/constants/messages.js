import { ENV_VARS } from "../config/env_Vars.js";

export const MESSAGES = {
  allRequiredMessage: "All Fields Are Required",
  emailMessage: "Please Enter Valid Email",
  passwordMessage: "Password is invalid",
  passwordMessage_1: "Password must be between 8 and 12 characters.",
  passwordMessage_2: "Password must contain at least one lowercase letter.",
  passwordMessage_3: "Password must contain at least one uppercase letter.",
  passwordMessage_4: "Password must contain at least one number.",
  usernameMewssage:
    "Username should be 8 to 12 characters, no special character",
  userMessage: "User is Already Existed",
  serverMessage: "Internal Server Error",
  userCreated: "User Created Successfully",
  logoutMessage: "Sad to see you leave!",
  userIsUnathorized: "User is unathorized",
  user_404: "Wrong Credentials",
};

export const tokenOptions = {
  httpOnly: true,
  sameSite: "Strict",
  maxAge: 86400000 * 7, // 7 days in milliseconds
  secure: ENV_VARS.NODE_ENV != "development",
};
