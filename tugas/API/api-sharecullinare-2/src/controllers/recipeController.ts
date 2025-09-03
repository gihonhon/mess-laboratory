import prisma from "../lib/prisma";
import express, { Request, Response } from "express";
import createHttpError from "http-errors";

//* Get All Recipes
export const getAllRecipes = async (
  req: Request,
  res: Response,
  next: Function
) => {
  try {
    const recipes = await prisma.recipes.findMany({
      include: {
        category: true,
        ratings: true,
        comments: true,
      },
    });
    res.status(200).json(recipes);
  } catch (error) {
    console.log(error);
    next(createHttpError(500));
  }
};
