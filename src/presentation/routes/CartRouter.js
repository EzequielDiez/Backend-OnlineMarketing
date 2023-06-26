import { Router } from "express";
import { addCart, getCartById, getCarts, updateCart, deleteProductFromCart, deleteCart, updateQuantityOnCart } from "../controllers/cartController.js";
import auth from "../middlewares/auth.js";
import authorization from "../middlewares/authorization.js";

const CartRouter = Router();

  CartRouter.get('/', auth, authorization('getAllCarts'), getCarts);
  CartRouter.post('/', auth, authorization('getOneCart'), addCart);
  CartRouter.get('/:cid', auth, authorization('getOneCartById'), getCartById);
  CartRouter.post('/:cid/product/:pid', auth, authorization('updateOneCart'), updateCart);
  CartRouter.delete('/:cid', auth, authorization('deleteOneCart'), deleteCart)
  CartRouter.delete('/:cid/product/:pid', auth, authorization('deleteProductOneCart'), deleteProductFromCart);
  CartRouter.put('/:cid/product/:pid', auth, authorization('updateQuantityOneCart'), updateQuantityOnCart)
  
export default CartRouter