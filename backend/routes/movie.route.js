import express from "express";
import {
  getAllTrending,
  getTrendingMovies,
  getMovieDetails,
  getSimilarMovies,
  getMovieCredits,
  getByCategory,
  getRecommendations,
  getPopularContent,
  getTopRatedContent,
  getMovieTrailer,
  getMoviesGenres,
  getMoviesByFilters,
} from "../controllers/movies.controller.js";
const router = express.Router();

router.get("/trending/:type/:time/:page", getAllTrending);
router.get("/popular/:type/:page", getPopularContent);
router.get("/top_rated/:type/:page", getTopRatedContent);
router.get("/trending/movie/:time", getTrendingMovies);
router.get("/:id/trailers", getMovieTrailer);
router.get("/:id/details", getMovieDetails);
router.get("/:id/similar", getSimilarMovies);
router.get("/:id/people", getMovieCredits);
router.get("/:id/recommendations", getRecommendations);
router.get("/list/:category", getByCategory);
router.get("/genre/list", getMoviesGenres);
router.post("/discover", getMoviesByFilters);

export default router;
