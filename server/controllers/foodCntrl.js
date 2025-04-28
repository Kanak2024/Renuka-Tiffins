import asyncHandler from "express-async-handler";
import { prisma } from "../config/prismaConfig.js";


// function to get all the documents/foods
export const getAllFood = asyncHandler(async (req, res) => {
     try{
      const food = await prisma.foods.findMany({
            orderBy: {
              createdAt: "desc",
            },
          });
          res.send(food);
     }
     catch(err)
     {
      throw new Error(err.message);
     }
});

// function to get a specific document/food
export const getFood = asyncHandler(async (req, res) => {
      const { id } = req.params;
    
      try {
        const food = await prisma.foods.findUnique({
          where: { id },
        });
        res.send(food);
      } catch (err) {
        throw new Error(err.message);
      }
});
