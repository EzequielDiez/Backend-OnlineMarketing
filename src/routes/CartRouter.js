import { Router } from "express";
import { addCart, getCartById, getCarts, updateCart, deleteProductFromCart, deleteCart, updateQuantityOnCart } from "../controllers/cartController.js";

const CartRouter = Router();

  CartRouter.get('/', getCarts);
  CartRouter.post('/', addCart);
  CartRouter.get('/:cid', getCartById);
  CartRouter.post('/:cid/product/:pid', updateCart);
  CartRouter.delete('/:cid', deleteCart)
  CartRouter.delete('/:cid/product/:pid', deleteProductFromCart);
  CartRouter.put('/:cid/product/:pid', updateQuantityOnCart)
  
export default CartRouter