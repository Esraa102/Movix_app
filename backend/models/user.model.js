import mongoose from "mongoose";

const userSchema = mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: "",
  },
  searchHistory: {
    type: Array,
    default: [],
  },
  favorite: {
    type: Array,
    default: [],
  },
  watchList: {
    type: Array,
    default: [],
  },
});

export const User = mongoose.model("User", userSchema);