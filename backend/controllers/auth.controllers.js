import bcryptjs from "bcryptjs";
import authValidation from "../validation/authValidation.js";
import { User } from "../models/user.model.js";
import { MESSAGES, tokenOptions } from "../constants/messages.js";
import generateToken from "../utils/generateToken.js";

const signUp = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: MESSAGES.allRequiredMessage });
    }

    const isAllValid = authValidation(res, username, password, email);
    if (!isAllValid.success) {
      return isAllValid;
    }

    const isUserExistByEmail = await User.findOne({ email });
    const isUserExistByUsername = await User.findOne({ username });
    if (isUserExistByEmail || isUserExistByUsername) {
      return res
        .status(400)
        .json({ success: false, message: MESSAGES.userMessage });
    }

    //hash user password
    const salt = await bcryptjs.genSalt(10);
    const hashedPassword = await bcryptjs.hash(password, salt);
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
      image: `https://avatar.iran.liara.run/username?username=${username.toString()}`,
    });
    // generate token if user created and save user in db
    if (!newUser) {
      return res
        .status(400)
        .json({ success: true, message: "Failed to create your account" });
    } else {
      res.clearCookie("movix_token", { httpOnly: true });
      const accessToken = generateToken(newUser);
      return res
        .cookie("movix_token", accessToken, tokenOptions)
        .status(201)
        .json({
          success: true,
          message: MESSAGES.userCreated,
          user: { ...newUser._doc, password: "" },
        });
    }
  } catch (error) {
    console.log("Error in signup()" + error.message);
    return res
      .status(500)
      .json({ success: false, message: MESSAGES.serverMessage });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: MESSAGES.allRequiredMessage });
    }
    const isAllValid = authValidation(res, "", password, email);
    if (!isAllValid.success) {
      return isAllValid;
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "User is unathorized" });
    } else {
      const isPasswordCorrect = await bcryptjs.compare(password, user.password);
      if (isPasswordCorrect) {
        res.clearCookie("movix_token", { httpOnly: true });
        const accessToken = generateToken(user);
        return res
          .cookie("movix_token", accessToken, tokenOptions)
          .status(200)
          .json({
            success: true,
            message: "Welcome Back!",
            user: { ...user._doc, password: "" },
          });
      } else {
        return res
          .status(400)
          .json({ success: false, message: "Wrong Credentials" });
      }
    }
  } catch (error) {
    console.log("Error in login()", error.message);
    res.status(500).json({ success: false, message: MESSAGES.serverMessage });
  }
};

const logout = (req, res) => {
  try {
    if (req.user) {
      res.clearCookie("movix_token");
      res.status(200).json({ success: true, message: MESSAGES.logoutMessage });
    } else {
      res.status(403).json({
        success: false,
        message: "Your session has been expired, you need to log in first",
      });
    }
  } catch (error) {
    console.log("Error in logout()", error.message);
    res.status(500).json({ success: false, message: MESSAGES.serverMessage });
  }
};

const checkAuth = async (req, res) => {
  if (req.user) {
    try {
      const isExist = await User.findOne({ _id: req.user._id });
      if (!isExist) {
        return res
          .status(404)
          .json({ success: false, message: MESSAGES.user_404 });
      } else {
        let history = req.user._doc.searchHistory;
        history = req.user._doc.searchHistory.sort(
          (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
        );

        return res.status(200).json({
          success: true,
          user: { ...req.user._doc, searchHistory: history },
        });
      }
    } catch (error) {
      console.log(error.message);
      return res
        .status(500)
        .json({ success: false, message: MESSAGES.serverMessage });
    }
  } else {
    return res
      .status(401)
      .json({ success: false, message: "You're not authorzied" });
  }
};
const deleteAccount = async (req, res) => {
  if (req.user) {
    try {
      const isExist = await User.findOne({ _id: req.user._id });
      if (!isExist) {
        return res
          .status(404)
          .json({ success: false, message: MESSAGES.user_404 });
      } else {
        await User.findOneAndDelete({ _id: req.user._id });
        return res.status(200).json({ success: true });
      }
    } catch (error) {
      console.log(error.message);
      return res
        .status(500)
        .json({ success: false, message: MESSAGES.serverMessage });
    }
  }
};
export { signUp, login, logout, checkAuth, deleteAccount };
