import { MESSAGES } from "../constants/messages.js";
import fetchFromTMDB from "../services/tmdb.service.js";

export const getTrendingTVs = async (req, res) => {
  const { time } = req.params;
  try {
    if (!time) {
      res
        .status(400)
        .json({ success: false, message: "Failed To Fetch From DB" });
    }
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/trending/tv/${time}`
    );
    res.status(200).json({ success: true, results: data.results });
  } catch (error) {
    console.log("Error in getTrendingTVs()" + error.message);
    res.status(500).json({ success: false, message: MESSAGES.serverMessage });
  }
};

export const getTVsByCategory = async (req, res) => {
  const { category } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${category}`
    );
    res.status(200).json({ success: true, results: data.results });
  } catch (error) {
    console.log("Error in getTVsByCategory()" + error.message);
    res.status(500).json({ success: false, message: MESSAGES.serverMessage });
  }
};

export const getTVDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(`https://api.themoviedb.org/3/tv/${id}`);
    res.status(200).json({ success: true, content: data });
  } catch (error) {
    console.log("Error in getTVDetails()" + error.message);
    if (error.message.includes("404")) {
      res.status(404).json({ success: false, message: "NOT FOUND" });
    }
    res.status(500).json({ success: false, message: MESSAGES.serverMessage });
  }
};

export const getTVTrailers = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/videos`
    );
    return res.status(200).json({ success: true, results: data.results });
  } catch (error) {
    console.log("Error in getTVTrailers()" + error.message);
    if (error.message.includes("404")) {
      res.status(404).json({ success: false, message: "NOT FOUND" });
    }
    res.status(500).json({ success: false, message: MESSAGES.serverMessage });
  }
};
export const getTVRecommendations = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/recommendations`
    );
    return res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log("Error in getTVRecommendations()" + error.message);
    if (error.message.includes("404")) {
      res.status(404).json({ success: false, message: "NOT FOUND" });
    }
    res.status(500).json({ success: false, message: MESSAGES.serverMessage });
  }
};
export const getTVSimilar = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/similar`
    );
    return res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log("Error in getTVSimilar()" + error.message);
    if (error.message.includes("404")) {
      res.status(404).json({ success: false, message: "NOT FOUND" });
    }
    res.status(500).json({ success: false, message: MESSAGES.serverMessage });
  }
};

export const getTVCredits = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/tv/${id}/credits`
    );
    return res.status(200).json({ success: true, results: data.cast });
  } catch (error) {
    console.log("Error in getTVCredits()" + error.message);
    if (error.message.includes("404")) {
      res.status(404).json({ success: false, message: "NOT FOUND" });
    }
    res.status(500).json({ success: false, message: MESSAGES.serverMessage });
  }
};

export const getTVGenres = async (req, res) => {
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/genre/tv/list`
    );
    res.status(200).json({ success: true, content: data.genres });
  } catch (error) {
    console.log("Error in getTVGenres()" + error.message);
    res.status(500).json({ success: false, message: MESSAGES.serverMessage });
  }
};

export const getTVByFilters = async (req, res) => {
  const filters = req.body;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/discover/tv`,
      filters ? filters : null
    );
    res
      .status(200)
      .json({ success: true, content: data.results, total: data.total_pages });
  } catch (error) {
    console.log("Error in getTVByFilters()" + error.message);
    res.status(500).json({ success: false, message: MESSAGES.serverMessage });
  }
};
