import { Router } from 'express';
import ProductController from '../controllers/productController.js';
import auth from '../middlewares/auth.js';
import authorization from '../middlewares/authorization.js';

const ProductRouter = Router();

ProductRouter.get('/', ProductController.getProducts);
ProductRouter.get('/:pid', ProductController.getProductById);
ProductRouter.post('/', auth, authorization('addOneProduct'), ProductController.postProduct);
ProductRouter.put('/:pid', auth, authorization('updateOneProduct'), ProductController.putProduct);
ProductRouter.delete('/:pid', auth, authorization('deleteOneProduct'), ProductController.deleteProduct);

export default ProductRouter;
