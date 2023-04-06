import express from 'express';

import ProductRouter from './routes/ProductRouter.js'
import CartRouter from './routes/CartRouter.js'


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))


app.use("/api/products", ProductRouter)
app.use("/api/carts", CartRouter)
  
app.listen(8080, () => {
    console.log('Server started on port 8080');
});
