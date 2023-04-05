import { Router } from "express";
import ProductManager from '../controllers/ProductManager.js';

const ProductRouter = Router();

const productManager = new ProductManager('./src/db/products.json');

    ProductRouter.get('/', async (req, res) => {
        const limit = req.query.limit;
        const products = await productManager.getProducts(limit);
        res.status(200).json({products});
    });

    ProductRouter.get('/:pid', async (req, res) => {
        const productId = req.params.pid;
        const product = await productManager.getProductById(productId);
        res.status(200).json(product);
    });

    ProductRouter.post('/', async (req, res) => {
        try {
          const { title, description, code, price, status, stock, category, thumbnails } = req.body;
      
          if (!title || !description || !code || !price || !status || !stock || !category || !thumbnails) {
            return res.status(400).json({ message: 'Faltan campos obligatorios.' });
          }
      
          const newProduct = {
            title,
            description,
            code,
            price,
            status,
            stock,
            category,
            thumbnails
          };
      
          const productId = await productManager.addProduct(newProduct);
          res.status(201).json({ message: 'Producto agregado exitosamente.', productId });
        } catch (error) {
          console.log('Error in POST /api/products:', error);
          res.status(500).json({ message: 'Ocurrió un error al agregar el producto.' });
        }
      });

export default ProductRouter