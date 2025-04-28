import express from 'express'
import {
  addToCart,
  cancelOrders,
  createUser,
  getAllFavorites,
  getAllOrders,
  loginUser,
  toFav,
} from "../controllers/userCntrl.js";
const router = express.Router();

router.post("/register", createUser);
router.post("/login", loginUser);
router.post("/addtocart/:id", addToCart);
router.post("/alloders", getAllOrders);
router.post("/removefromcart/:cid", cancelOrders);
router.post("/tofav/:fid", toFav);
router.post("/allfav", getAllFavorites);

export { router as userRoute };
