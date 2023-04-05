import express from 'express';

import ProductRouter from './routes/ProductRouter.js'


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.use("/api/products", ProductRouter)
/* const productManager = new ProductManager('src/db/products.json'); */

/*     app.get('/products', async (req, res) => {
        const limit = req.query.limit;
        const products = await productManager.getProducts(limit);
        res.status(200).json({products});
    }); */

/*     app.get('/products/:pid', async (req, res) => {
        const productId = req.params.pid;
        const product = await productManager.getProductById(productId);
        res.status(200).json(product);
    }); */
  
app.listen(8080, () => {
    console.log('Server started on port 8080');
});
