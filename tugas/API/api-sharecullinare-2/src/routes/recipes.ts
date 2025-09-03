import express, { Request, Response } from "express";
import prisma from "../lib/prisma";
import { getAllRecipes } from "../controllers/recipeController";

const router = express.Router();

//* Get All Recipes
router.get("/getrecipes", getAllRecipes);

export default router;
