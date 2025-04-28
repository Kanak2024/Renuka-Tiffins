import express from "express"
import {getAllFood, getFood} from '../controllers/foodCntrl.js';
const router=express.Router();

router.get("/allfood",getAllFood)
router.get("/:id",getFood)

export {router as foodRoute}

