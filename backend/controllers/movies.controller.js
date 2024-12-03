import fetchFromTMDB from "../services/tmdb.service.js";
import { MESSAGES } from "../constants/messages.js";

export const getAllTrending = async (req, res) => {
  const { time, type, page } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/trending/${type}/${time}?page=${page}`
    );
    const randomMoive =
      data.results[Math.floor(Math.random() * data.results?.length)];

    res
      .status(200)
      .json({ success: true, content: randomMoive, trending: data.results });
  } catch (error) {
    console.log("error in getTrending()" + error.message);
    res.status(500).json({ success: false, message: MESSAGES.serverMessage });
  }
};

export const getTrendingMovies = async (req, res) => {
  const { time } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/trending/movie/${time}`
    );
    res.status(200).json({ success: true, data });
  } catch (error) {
    console.log("error in getTrendingMoviesOrTV()" + error.message);
    res.status(500).json({ success: false, message: MESSAGES.serverMessage });
  }
};

export const getTopRatedContent = async (req, res) => {
  const { type, page } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/${type}/top_rated?page=${page}`
    );
    res.status(200).json({ success: true, top_rated: data?.results });
  } catch (error) {
    console.log("error in getTopRatedContent()" + error.message);
    if (error.message.includes("404")) {
      res.status(404).json({ success: false, message: "Not Found" });
    }
    res.status(500).json({ success: false, message: MESSAGES.serverMessage });
  }
};
export const getPopularContent = async (req, res) => {
  const { type, page } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/${type}/popular?page=${page}`
    );
    res.status(200).json({ success: true, popular: data?.results });
  } catch (error) {
    console.log("error in getPopularContent()" + error.message);
    if (error.message.includes("404")) {
      res.status(404).json({ success: false, message: "Not Found" });
    }
    res.status(500).json({ success: false, message: MESSAGES.serverMessage });
  }
};

export const getMovieDetails = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}`
    );
    return res.status(200).json({ success: true, content: data });
  } catch (error) {
    if (error.message.includes("404")) {
      res.status(404).json({ success: false, message: "Movie Not Found" });
    }
    console.log("Error in getMovieDetails()" + error.message);
    res.status(500).json({ success: false, message: MESSAGES.serverMessage });
  }
};

export const getMovieTrailer = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/videos`
    );
    return res.status(200).json({ success: true, results: data.results });
  } catch (error) {
    console.log("Error in getMovieTrailer()" + error.message);
    if (error.message.includes("404")) {
      res.status(404).json({ success: false, message: "NOT FOUND" });
    }
    res.status(500).json({ success: false, message: MESSAGES.serverMessage });
  }
};

export const getSimilarMovies = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/similar`
    );
    return res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log("Error in getSimilarMoives ()" + error.message);
    if (error.message.includes("404")) {
      res.status(404).json({ success: false, message: "NOT Found" });
    }
    res.status(500).json({ success: false, message: MESSAGES.serverMessage });
  }
};

export const getMovieCredits = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/credits`
    );
    return res.status(200).json({ success: true, content: data.cast });
  } catch (error) {
    console.log("Error in getMovieCredits ()" + error.message);
    if (error.message.includes("404")) {
      res.status(404).json({ success: false, message: "NOT Found" });
    }
    res.status(500).json({ success: false, message: MESSAGES.serverMessage });
  }
};

export const getRecommendations = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${id}/recommendations`
    );
    res.status(200).json({ success: true, content: data.results });
  } catch (error) {
    console.log("Error in getRecommendations()" + error.message);
    if (error.message.includes("404")) {
      res.status(404).json({ success: false, message: "NOT Found" });
    }
    res.status(500).json({ success: false, message: MESSAGES.serverMessage });
  }
};

export const getByCategory = async (req, res) => {
  const { category } = req.params;

  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/movie/${category}`
    );
    res.status(200).json({ success: true, results: data.results });
  } catch (error) {
    console.log("Error in getByCategory()" + error.message);
    res.status(500).json({ success: false, message: MESSAGES.serverMessage });
  }
};

export const getMoviesGenres = async (req, res) => {
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/genre/movie/list`
    );
    res.status(200).json({ success: true, content: data.genres });
  } catch (error) {
    console.log("Error in getMoviesGenres()" + error.message);
    res.status(500).json({ success: false, message: MESSAGES.serverMessage });
  }
};

export const getMoviesByFilters = async (req, res) => {
  const filters = req.body;
  console.log(filters);
  try {
    const data = await fetchFromTMDB(
      `https://api.themoviedb.org/3/discover/movie`,
      filters ? filters : null
    );
    res
      .status(200)
      .json({ success: true, content: data.results, total: data.total_pages });
  } catch (error) {
    console.log("Error in getMoviesGenres()" + error.message);
    res.status(500).json({ success: false, message: MESSAGES.serverMessage });
  }
};
