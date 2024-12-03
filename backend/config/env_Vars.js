import dotenv from "dotenv";
dotenv.config();

export const ENV_VARS = {
  PORT: process.env.PORT || 5000,
  MONGODB_URI: process.env.MONGODB_URI,
  JWT_SECRET: process.env.JWT_SECRET,
  NODE_ENV: process.env.NODE_ENV,
  TMD_API_KEY: process.env.TMD_API_KEY,
};