import { Router } from 'express';
import CartController from '../controllers/cartController.js';
import auth from '../middlewares/auth.js';
import authorization from '../middlewares/authorization.js';

const CartRouter = Router();

CartRouter.get('/', auth, authorization('getAllCarts'), CartController.getCarts);
CartRouter.get('/:cid', CartController.getCartById);
CartRouter.post('/', CartController.postCart);
CartRouter.post('/:cid/product/:pid', CartController.postProductInCart)
CartRouter.put('/:cid', CartController.updateCart);
CartRouter.put('/:cid/product/:pid', CartController.updateProductInCart);
CartRouter.post('/:cid/checkout', auth, CartController.checkout);
CartRouter.delete('/:cid/product/:pid', CartController.deleteProductFromCart);
CartRouter.delete('/:cid', CartController.deleteCart);

export default CartRouter;
