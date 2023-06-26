import { Router } from "express";
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/productController.js";
import auth from "../middlewares/auth.js";
import authorization from "../middlewares/authorization.js";

const ProductRouter = Router();

    ProductRouter.get('/', auth, authorization('getAllProducts'), getProducts);
    ProductRouter.get('/:pid', auth, authorization('getOneProduct'), getProductById);
    ProductRouter.post('/', auth, authorization('addOneProduct'), addProduct);
    ProductRouter.put('/:pid', auth, authorization('updateOneProduct'), updateProduct);
    ProductRouter.delete('/:pid', auth, authorization('deleteOneProduct'), deleteProduct);

export default ProductRouter