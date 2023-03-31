import express from 'express';
import ProductManager from './ProductManager.js';

const app = express()

const productManager = new ProductManager('products.json');

    app.get('/products', (req, res) => {
        const limit = req.query.limit;
        const products = productManager.getProducts(limit);
        res.json({products});
    });

    app.get('/products/:pid', (req, res) => {
        const productId = req.params.pid;
        const product = productManager.getProductById(productId);
        res.json(product);
    });
  
app.listen(8080, () => {
    console.log('Server started on port 8080');
});
