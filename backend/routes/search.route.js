import express from "express";
import {
  searchMedia,
  getSearchHistory,
  removeFromSearchHistory,
  deleteAll,
} from "../controllers/search.controller.js";
import verifyToken from "../middleware/verifyToken.js";

const router = express.Router();

router.get("/:media/:query/:page/:notNew", verifyToken, searchMedia);
router.get("/history", verifyToken, getSearchHistory);
router.delete("/delete/:id", verifyToken, removeFromSearchHistory);
router.delete("/history/delete", verifyToken, deleteAll);

export default router;
