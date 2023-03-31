import express from 'express';
import ProductManager from './ProductManager.js';

const app = express()

const productManager = new ProductManager('products.json');

    app.get('/products', async (req, res) => {
        const limit = req.query.limit;
        const products = await productManager.getProducts(limit);
        res.json({products});
    });

    app.get('/products/:pid', async (req, res) => {
        const productId = req.params.pid;
        const product = await productManager.getProductById(productId);
        console.log(product)
        res.json(product);
    });
  
app.listen(8080, () => {
    console.log('Server started on port 8080');
});
