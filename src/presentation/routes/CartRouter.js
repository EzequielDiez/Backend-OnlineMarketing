import { Router } from "express";
import { addCart, getCartById, getCarts, updateCart, deleteProductFromCart, deleteCart, updateQuantityOnCart, checkout } from "../controllers/cartController.js";
import auth from "../middlewares/auth.js";
import authorization from "../middlewares/authorization.js";

const CartRouter = Router();

CartRouter.get('/', auth, authorization('getAllCarts'), getCarts);
CartRouter.post('/', addCart);
CartRouter.get('/:cid', getCartById);
CartRouter.post('/:cid/checkout', auth, checkout)
CartRouter.post('/:cid/product/:pid', updateCart);
CartRouter.delete('/:cid', deleteCart)
CartRouter.delete('/:cid/product/:pid', deleteProductFromCart);
CartRouter.put('/:cid/product/:pid', updateQuantityOnCart)
  
export default CartRouter