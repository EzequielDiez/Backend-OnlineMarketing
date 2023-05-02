import { Router } from "express";
import { addProduct, deleteProduct, getProductById, getProducts, updateProduct } from "../controllers/productController.js";

const ProductRouter = Router();

    ProductRouter.get('/', getProducts);
    ProductRouter.get('/:pid', getProductById);
    ProductRouter.post('/', addProduct);
    ProductRouter.put('/:pid', updateProduct);
    ProductRouter.delete('/:pid', deleteProduct);

export default ProductRouter