import { Router } from 'express';
import ProductManager from '../controllers/ProductManager.js';

const ViewsRouter = Router();

const productManager = new ProductManager('./src/db/products.json');

ViewsRouter.get('/', async(req, res) =>
{
    const products = await productManager.getProducts();
    res.render('index', { products });
});

ViewsRouter.get('/realtimeproducts', async(req, res) =>
{
    const products = await productManager.getProducts();
    res.render('realTimeProducts', { products });
});

export default ViewsRouter;
