import mongoose from "mongoose";
import { ENV_VARS } from "./env_Vars.js";

export const connectToDB = async () => {
  try {
    await mongoose.connect(ENV_VARS.MONGODB_URI);
    console.log("Connected!!");
  } catch (error) {
    console.log(`DB Connection Error: ${error.message}`);
    process.exit(1);
  }
};
