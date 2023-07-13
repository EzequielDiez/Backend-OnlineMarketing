import { Router } from "express";
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/productController.js";
import auth from "../middlewares/auth.js";
import authorization from "../middlewares/authorization.js";

const ProductRouter = Router();

ProductRouter.use(auth)

    ProductRouter.get('/', auth,/* authorization('getAllProducts'), */ getProducts);
    ProductRouter.get('/:pid', authorization('getOneProduct'), getProductById);
    ProductRouter.post('/', authorization('addOneProduct'), addProduct);
    ProductRouter.put('/:pid', authorization('updateOneProduct'), updateProduct);
    ProductRouter.delete('/:pid', authorization('deleteOneProduct'), deleteProduct);

export default ProductRouter