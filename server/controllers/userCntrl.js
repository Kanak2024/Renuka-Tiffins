import asyncHandler from "express-async-handler"
import { prisma } from "../config/prismaConfig.js"


// Function for creating user when registration route hits
export const createUser=asyncHandler(async(req,res)=>{

      let {email}=req.body;
        
      try{
      const userExist= await prisma.user.findUnique({where:{email:email}})
      if(!userExist)
      {
          const user=await prisma.user.create({data:req.body})
          res.status(200).send(
            {
                  message:"user register succesfully",
                  user:user,
            }
          );
      }
      else {
            res.status(201).send({message:"User Already Registered "})
      }
    }
    catch(err){
      throw new Error(err.message);
    }

})

// Function for login user
export const loginUser=asyncHandler(async(req,res)=>{

  let {email ,password}=req.body;   

  try{
  const userExist= await prisma.user.findUnique({where:{email:email,password:password}})
  if(userExist)
  {
      res.status(200).send(
        {
              message:"user login succesfully",
              user:userExist,
        }
      );
  }
  else {
        res.send({message:"User not found, Please enter valid username or password!"})
  }
}
catch(err){
  throw new Error(err.message);
}
})


// Function to add to cart
export const addToCart = asyncHandler(async (req, res) => {
      const { email} = req.body;
      const { id } = req.params;
    
      try {
        const alreadyAdded = await prisma.user.findUnique({
          where: { email },
          select: { oders: true },
        });

        if (alreadyAdded.oders.includes(id)) {
          res.send("This Food is already Added by you");
        } else {
          await prisma.user.update({
            where: { email: email },
            data: {
              oders: { push: id },
            },
          });
          res.send("Food is added to cart successfully");
        }
      } catch (err) {
        throw new Error(err.message);
      }
    });

// funtion to get all food of a user
export const getAllOrders = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const foods = await prisma.user.findUnique({
      where: { email },
      select: { oders: true },
    });
    res.status(200).send(foods);
  } catch (err) {
    throw new Error(err.message);
  }
});

// function to cancel the orders
export const cancelOrders = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { cid } = req.params;
  try {
    const user = await prisma.user.findUnique({
      where: { email: email },
      select: { oders: true },
    });


    if (user.oders.includes(cid)) {
      await prisma.user.update({
        where: { email },
        data: {
          oders: {
            set: user.oders.filter((id) =>id !== cid),
          },
        },
      });

      res.send("Removed from Cart");
    }
    else{
      res.send("Item Not Found")
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

// function to add a food in whisList list of a user
export const toFav = asyncHandler(async (req, res) => {
  const { email } = req.body;
  const { fid } = req.params;
   
  try {
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (user.favFoodID.includes(fid)) {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favFoodID: {
            set: user.favFoodID.filter((id) => id !== fid),
          },
        },
      });

      res.send({ message: "Removed from Whishlist", user: updateUser });
    } else {
      const updateUser = await prisma.user.update({
        where: { email },
        data: {
          favFoodID: {
            push: fid,
          },
        },
      });
      res.send({ message: "Updated Whishlist", user: updateUser });
    }
  } catch (err) {
    throw new Error(err.message);
  }
});

// function to get all favorites
export const getAllFavorites = asyncHandler(async (req, res) => {
  const { email } = req.body;
  try {
    const favFood = await prisma.user.findUnique({
      where: { email },
      select: { favFoodID: true },
    });
    res.status(200).send(favFood);
  } catch (err) {
    throw new Error(err.message);
  }
});