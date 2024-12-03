import { MESSAGES } from "../constants/messages.js";
import { User } from "../models/user.model.js";

export const getFavorite = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: MESSAGES.user_404 });
    }
    res.status(200).json({ success: true, favorite: user.favorite });
  } catch (error) {
    console.log("Error in addToFavorite()" + error.message);
    res.status(500).json({ success: false, message: MESSAGES.serverMessage });
  }
};
export const addToFav = async (req, res) => {
  const { showId, showTitle, showPoster, mediaType } = req.body;
  if (!showId | !showTitle | !showPoster) {
    return res.status(400).json({ success: false, message: "Failed to add" });
  }
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: MESSAGES.user_404 });
    }
    const isAlreadyAdded = user.favorite.filter((e) => e.id === Number(showId));
    if (!isAlreadyAdded[0]) {
      user.favorite.push({
        id: showId,
        title: showTitle,
        image: showPoster,
        type: mediaType,
      });
      await user.save();
      console.log(user.favorite);
      return res.status(200).json({
        success: true,
        action: "added",
        message: "Added to your favorite Successfully!!",
        newFav: user.favorite,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "This is already in your watch list",
      });
    }
  } catch (error) {
    console.log("Error in addToFavorite()" + error.message);
    res.status(500).json({ success: false, message: MESSAGES.serverMessage });
  }
};
export const deleteFromFav = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: MESSAGES.user_404 });
    }
    const isAlreadyAdded = user.favorite.filter((e) => e.id === Number(id));
    if (isAlreadyAdded[0]) {
      user.favorite = user.favorite.filter((fav) => fav.id !== Number(id));
      await user.save();
      return res.status(200).json({
        success: false,
        action: "deleted",
        message: "Deleted from playlist",
        newFav: user.favorite,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "This isn't already in your watch list",
      });
    }
  } catch (error) {
    console.log("Error in addToFavorite()" + error.message);
    res.status(500).json({ success: false, message: MESSAGES.serverMessage });
  }
};

export const getWatchList = async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: MESSAGES.user_404 });
    }
    res.status(200).json({ success: true, list: user.watchList });
  } catch (error) {
    console.log("Error in addToFavorite()" + error.message);
    res.status(500).json({ success: false, message: MESSAGES.serverMessage });
  }
};
export const addToWatchList = async (req, res) => {
  const { showId, showTitle, showPoster, mediaType } = req.body;
  if (!showId | !showTitle | !showPoster | !mediaType) {
    return res.status(400).json({ success: false, message: "Failed to add" });
  }
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: MESSAGES.user_404 });
    }
    const isAlreadyAdded = user.watchList.filter(
      (e) => e.showId === Number(showId)
    );
    console.log(isAlreadyAdded);
    if (!isAlreadyAdded[0]) {
      user.watchList.push({ showId, showTitle, showPoster, mediaType });
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Added to watch later Successfully!!",
        newList: user.watchList,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "This is already in your watch list",
      });
    }
  } catch (error) {
    console.log("Error in addToWatchList()" + error.message);
    res.status(500).json({ success: false, message: MESSAGES.serverMessage });
  }
};
export const deleteFromWatch = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findOne({ _id: req.user._id });
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: MESSAGES.user_404 });
    }
    const isAlreadyAdded = user.watchList.filter(
      (e) => e.showId === Number(id)
    );
    if (isAlreadyAdded[0]) {
      user.watchList = user.watchList.filter(
        (user) => user.showId !== Number(id)
      );
      await user.save();
      return res.status(200).json({
        success: true,
        message: "Deleted from watch list",
        newList: user.watchList,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "This isn't alreay in your watch list",
      });
    }
  } catch (error) {
    console.log("Error in addToWatchList()" + error.message);
    res.status(500).json({ success: false, message: MESSAGES.serverMessage });
  }
};
