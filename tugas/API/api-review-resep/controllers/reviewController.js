import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Create Review
export const giveReview = async (req, res, next) => {
  const { userId, recipeId, comment } = req.body;
  try {
    const reqComment = await prisma.reviews.create({
      data: {
        userId,
        recipeId,
        comment,
      },
    });
    res.status(201).json(reqComment);
  } catch (error) {
    next(error);
  }
};

//Get All Review
export const getAllReview = async (req, res, next) => {
  try {
    const newRes = await prisma.reviews.findMany({
      where: {
        recipeId: req.params.id,
      },
      select: {
        id: true,
        userId: true,
        comment: true,
        createdAt: true,
      },
    });
    res.status(200).json(newRes);
  } catch (error) {
    next(error);
  }
};
