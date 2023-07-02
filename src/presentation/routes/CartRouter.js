import { Router } from "express";
import { addCart, getCartById, getCarts, updateCart, deleteProductFromCart, deleteCart, updateQuantityOnCart } from "../controllers/cartController.js";
import auth from "../middlewares/auth.js";
import authorization from "../middlewares/authorization.js";

const CartRouter = Router();

CartRouter.use(auth)

CartRouter.get('/', authorization('getAllCarts'), getCarts);
CartRouter.post('/', authorization('getOneCart'), addCart);
CartRouter.get('/:cid', authorization('getOneCartById'), getCartById);
CartRouter.post('/:cid/product/:pid', authorization('updateOneCart'), updateCart);
CartRouter.delete('/:cid', authorization('deleteOneCart'), deleteCart)
CartRouter.delete('/:cid/product/:pid', authorization('deleteProductOneCart'), deleteProductFromCart);
CartRouter.put('/:cid/product/:pid', authorization('updateQuantityOneCart'), updateQuantityOnCart)
  
export default CartRouter