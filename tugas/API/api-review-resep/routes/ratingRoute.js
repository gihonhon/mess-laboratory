import express from "express";
import {
  getAllRatings,
  getRating,
  giveRating,
} from "../controllers/ratingController.js";

const router = express.Router();

router.get("/ratings", getAllRatings);
router.get("/ratings/:id", getRating);
router.post("/ratings/:recipeId", giveRating);

export default router;
