import { PrismaClient } from "@prisma/client";

const db = new PrismaClient();

async function main() {
  try {
    await db.category.createMany({
      data: [
        { listCategory: "Beef" },
        { listCategory: "Chicken" },
        { listCategory: "Dessert" },
        { listCategory: "Miscellaneous" },
        { listCategory: "Pasta" },
        { listCategory: "Pork" },
        { listCategory: "Seafood" },
        { listCategory: "Side" },
        { listCategory: "Starter" },
        { listCategory: "Vegetarian" },
        { listCategory: "Breakfast" },
        { listCategory: "Breakfast" },
      ],
    });
    console.log("Created");
  } catch (error) {
    console.log(`Error: ${error}`);
  } finally {
    await db.$disconnect();
  }
}

main();
