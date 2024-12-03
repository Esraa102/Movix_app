import express from "express";
import verifyToken from "../middleware/verifyToken.js";
import {
  addToWatchList,
  getFavorite,
  addToFav,
  deleteFromFav,
  deleteFromWatch,
  getWatchList,
} from "../controllers/user.controller.js";
const router = express.Router();

router.get("/favorite", verifyToken, getFavorite);
router.post("/favorite/add", verifyToken, addToFav);
router.delete("/favorite/delete/:id", verifyToken, deleteFromFav);

router.get("/watchlist", verifyToken, getWatchList);
router.post("/watchlist/add", verifyToken, addToWatchList);
router.delete("/watchlist/delete/:id", verifyToken, deleteFromWatch);

export default router;
