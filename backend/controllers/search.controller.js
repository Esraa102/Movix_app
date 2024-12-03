import fetchFromTMDB from "../services/tmdb.service.js";
import { User } from "../models/user.model.js";
import { MESSAGES } from "../constants/messages.js";

const searchMedia = async (req, res) => {
  const { media, query, page, notNew } = req.params;
  if (req.user) {
    try {
      const response = await fetchFromTMDB(
        `https://api.themoviedb.org/3/search/${media}?query=${query}&page=${page}`
      );
      if (response.results.length === 0) {
        return res.status(404).send(null);
      }
      res.status(200).json({
        success: true,
        content: response.results,
        total_results: response.total_results,
        total_pages: response.total_pages,
      });
      if (notNew == "new") {
        await User.findByIdAndUpdate(req.user._id, {
          $push: {
            searchHistory: {
              id: response.results[0].id,
              searchType: media.toUpperCase(),
              image:
                response.results[0].profile_path ||
                response.results[0].poster_path,
              title: response.results[0].name || response.results[0].title,
              createdAt: Date.now(),
            },
          },
        });
      }
    } catch (error) {
      console.log("error in searchMedia()" + error.message);
      console.log(error);
      res.status(500).json({ success: false, message: MESSAGES.serverMessage });
    }
  }
};

const getSearchHistory = async (req, res) => {
  try {
    if (req.user) {
      res.status(200).json({ success: true, history: req.user.searchHistory });
    }
  } catch (error) {
    console.log("error in getSearchHistory()" + error.message);
    res.status(500).json({ success: false, message: MESSAGES.serverMessage });
  }
};

const removeFromSearchHistory = async (req, res) => {
  const { id } = req.params;
  if (!id) {
    return res
      .status(400)
      .json({ success: false, message: "Something went wrong" });
  }
  if (req.user) {
    try {
      if (req.user) {
        const user = await User.findById(req.user._id);
        user.searchHistory = user.searchHistory
          .filter((e) => e.id !== Number(id))
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        await user.save();
        res.status(200).json({
          success: true,
          message: "Item Deleted Successfully",
          newHistory: user.searchHistory,
        });
      }
    } catch (error) {
      console.log("error in removeFromSearchHistory()" + error.message);
      res.status(500).json({ success: false, message: MESSAGES.serverMessage });
    }
  }
};

const deleteAll = async (req, res) => {
  try {
    if (req.user) {
      const user = await User.findById(req.user._id);
      user.searchHistory = [];
      await user.save();
      console.log(user);
      res.status(200).json({
        success: true,
        message: "History has been deleted successfully",
      });
    } else {
      console.log("No User");
    }
  } catch (error) {
    console.log("error in removeFromSearchHistory()" + error.message);
    res.status(500).json({ success: false, message: MESSAGES.serverMessage });
  }
};

export { searchMedia, getSearchHistory, removeFromSearchHistory, deleteAll };
