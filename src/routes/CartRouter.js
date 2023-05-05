import { Router } from "express";
import { addCart, getCartById, getCarts, updateCart } from "../controllers/cartController.js";

const CartRouter = Router();

  CartRouter.get('/', getCarts);
  CartRouter.post('/', addCart);
  CartRouter.get('/:cid', getCartById);
  CartRouter.post('/:cid/product/:pid', updateCart);
  
export default CartRouter