import { MESSAGES } from "../constants/messages.js";

const passwordValidation = (res, password) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,12}$/;

  if (password.length < 8 || password.length > 12) {
    return res.status(400).json({
      success: false,
      message: MESSAGES.passwordMessage_1,
    });
  }
  if (!/[a-z]/.test(password)) {
    return res.status(400).json({
      success: false,
      message: MESSAGES.passwordMessage_2,
    });
  }
  if (!/[A-Z]/.test(password)) {
    return res.status(400).json({
      success: false,
      message: MESSAGES.passwordMessage_3,
    });
  }
  if (!/\d/.test(password)) {
    return res.status(400).json({
      success: false,
      message: MESSAGES.passwordMessage_4,
    });
  }
  if (!passwordRegex.test(password)) {
    return res.status(400).json({
      success: false,
      message: MESSAGES.passwordMessage,
    });
  }

  return { success: true };
};

const authValidation = (res, username, password, email) => {
  const emailRegx =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  if (!emailRegx.test(email)) {
    return res
      .status(400)
      .json({ success: false, message: MESSAGES.emailMessage });
  }
  const isPasswordValid = passwordValidation(res, password);
  if (!isPasswordValid.success) {
    return res
      .status(400)
      .json({ success: false, message: MESSAGES.passwordMessage });
  }
  const usernameRegex = /^[a-zA-Z0-9]{3,20}$/;
  if (username || username !== "") {
    if (!usernameRegex.test(username)) {
      return res
        .status(400)
        .json({ success: false, message: MESSAGES.usernameMewssage });
    }
  }
  return { success: true };
};

export default authValidation;
