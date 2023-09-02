import { Router } from 'express';
import { addProduct, deleteProduct, updateProduct } from '../controllers/productController.js';
import ProductController from '../controllers/productController.js';
import auth from '../middlewares/auth.js';
import authorization from '../middlewares/authorization.js';

const ProductRouter = Router();

ProductRouter.get('/', ProductController.getProducts);
ProductRouter.get('/:pid', ProductController.getProductById);
ProductRouter.post('/', auth, authorization('addOneProduct'), addProduct);
ProductRouter.put('/:pid', auth, authorization('updateOneProduct'), updateProduct);
ProductRouter.delete('/:pid', auth, authorization('deleteOneProduct'), deleteProduct);

export default ProductRouter;
