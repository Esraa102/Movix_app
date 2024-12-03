import express from "express";
import {
  getTrendingTVs,
  getTVsByCategory,
  getTVDetails,
  getTVTrailers,
  getTVRecommendations,
  getTVSimilar,
  getTVCredits,
  getTVGenres,
  getTVByFilters
} from "../controllers/tv.controller.js";
const router = express.Router();

router.get("/trending/tv/:time", getTrendingTVs);
router.get("/:category", getTVsByCategory);
router.get("/:id/details", getTVDetails);
router.get("/:id/trailers", getTVTrailers);
router.get("/:id/recommendations", getTVRecommendations);
router.get("/:id/similar", getTVSimilar);
router.get("/:id/people", getTVCredits);
router.get("/list/genre", getTVGenres);
router.post("/discover", getTVByFilters);

export default router;
