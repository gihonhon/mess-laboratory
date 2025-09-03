import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Create Ratings
export const giveRating = async (req, res, next) => {
  const { userid, recipeId, rating } = req.body;
  try {
    const newRatings = await prisma.ratings.create({
      data: {
        userid,
        recipeId,
        rating,
      },
      select: {
        id: true,
        userid: true,
        recipeId: true,
        rating: true,
        createdAt: true,
      },
    });
    const recipe = await prisma.ratings.findMany({
      where: {
        recipeId: req.params.recipeId,
      },
    });
    const totalRating = recipe.reduce((sum, r) => sum + r.rating, 0);
    const avgRating = recipe.length > 0 ? totalRating / recipe.length : 0;
    const roundedAvgRating = avgRating.toFixed(1);
    await prisma.recipes.update({
      where: {
        id: req.params.recipeId,
      },
      data: {
        average_ratings: parseFloat(roundedAvgRating),
      },
    });
    res.status(201).json(newRatings);
  } catch (error) {
    next(error);
  }
};

// Get Rating By Id
export const getRating = async (req, res, next) => {
  try {
    const newRes = await prisma.ratings.findMany({
      where: { recipeId: req.params.id },
      select: {
        id: true,
        userid: true,
        rating: true,
        createdAt: true,
      },
    });
    res.status(200).json(newRes);
  } catch (error) {
    next(error);
  }
};

//Get All Ratings
export const getAllRatings = async (req, res, next) => {
  try {
    const newRes = await prisma.ratings.findMany({
      select: {
        id: true,
        userid: true,
        recipes: {
          select: {
            id: true,
            title: true,
            picture: true,
            createdAt: true,
            category: {
              select: {
                id: true,
                listCategory: true,
              },
            },
          },
        },
        createdAt: true,
      },
    });
  } catch (error) {
    next(error);
  }
};
