import { Router } from "express";
import { addCart, getCartById, getCarts, updateCart, deleteProductFromCart, deleteCart } from "../controllers/cartController.js";

const CartRouter = Router();

  CartRouter.get('/', getCarts);
  CartRouter.post('/', addCart);
  CartRouter.get('/:cid', getCartById);
  CartRouter.post('/:cid/product/:pid', updateCart);
  CartRouter.delete('/:cid', deleteCart)
  CartRouter.delete('/:cid/product/:pid', deleteProductFromCart);
  
export default CartRouter