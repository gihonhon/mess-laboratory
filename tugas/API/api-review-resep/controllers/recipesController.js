import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

//Get All Recipes
export const getAllRecipes = async (req, res) => {
  try {
    const newRes = await prisma.recipes.findMany({
      include: {
        category: true,
        user: {
          select: {
            username: true,
          },
        },
      },
      orderBy: {
        createdAt: "desc",
      },
    });
    res.status(200).json(newRes);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};

//Get Recipe By Id
export const getRecipe = async (req, res) => {
  try {
    const newRes = await prisma.recipes.findFirst({
      where: {
        id: String(req.params.id),
      },
      include: {
        category: true,
        ratings: {
          select: {
            rating: true,
            createdAt: true,
          },
        },
        reviews: {
          select: {
            comment: true,
            createdAt: true,
          },
        },
      },
    });
    res.status(200).json(newRes);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};

// Search recipe
export const searchRecipe = async (req, res) => {
  try {
    const newSearch = await prisma.recipes.findMany({
      where: {
        title: {
          contains: String(req.query.search),
          mode: "insensitive",
        },
      },
      include: {
        user: {
          select: {
            username: true,
          },
        },
        reviews: true,
      },
    });
    res.status(200).json(newSearch);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};

//Create Recipe
export const createRecipe = async (req, res) => {
  const { title, desc, instruction, ingredients, picture, userId, categoryId } =
    req.body;
  try {
    const recipe = await prisma.recipes.create({
      data: {
        userId: userId,
        title: title,
        desc: desc,
        instruction: instruction,
        ingredients: ingredients,
        picture: picture,
        categoryId: categoryId,
      },
      select: {
        userId: true,
        title: true,
        desc: true,
        instruction: true,
        ingredients: true,
        picture: true,
        createdAt: true,
        category: true,
      },
    });
    res.status(201).json(recipe);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};

//Update Recipe
export const updateRecipe = async (req, res) => {
  const { title, desc, instruction, ingredients, picture, categoryId } =
    req.body;
  try {
    const updateRecipe = await prisma.recipes.update({
      where: {
        id: req.params.id,
      },
      data: {
        title: title,
        desc: desc,
        instruction: instruction,
        ingredients: ingredients,
        picture: picture,
        categoryId: categoryId,
      },
      select: {
        title: true,
        desc: true,
        instruction: true,
        ingredients: true,
        picture: true,
        updatedAt: true,
        category: true,
      },
    });
    res.status(200).json(updateRecipe);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};

//Delete Recipe
export const deleteRecipe = async (req, res) => {
  try {
    const recipe = await prisma.recipes.delete({
      where: {
        id: req.params.id,
      },
    });
    res.status(200).json(recipe);
  } catch (error) {
    res.status(500).json({ message: `${error}` });
  }
};
