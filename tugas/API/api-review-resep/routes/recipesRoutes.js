import express from "express";
import {
  createRecipe,
  deleteRecipe,
  getAllRecipes,
  getRecipe,
  searchRecipe,
  updateRecipe,
} from "../controllers/recipesController.js";

const router = express.Router();

router.get("/recipes", getAllRecipes);
router.get("/recipes/:id", getRecipe);
router.get("/recipes/search/:title", searchRecipe);
router.post("/recipes", createRecipe);
router.patch("/recipes/:id", updateRecipe);
router.delete("/recipes/:id", deleteRecipe);

export default router;
