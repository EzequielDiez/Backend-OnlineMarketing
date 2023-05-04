import dotenv from "dotenv"
dotenv.config()

import express from 'express';
/* import {engine} from 'express-handlebars'
import {resolve} from 'path'
import { Server } from 'socket.io'; */
import ProductRouter from './routes/ProductRouter.js'
import CartRouter from './routes/CartRouter.js'
/* import ViewsRouter from './routes/ViewsRouter.js';
import ProductManager from './controllers/ProductManager.js'; */
import mongoose from "mongoose";

void (async() => 
{
    await mongoose.connect(process.env.MONGO_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    const app = express();
    app.use(express.json());
    app.use(express.urlencoded({extended: true}))

    app.use("/api/products", ProductRouter)
    app.use("/api/carts", CartRouter)

    app.listen(8080, () => {
    console.log('Server started on port 8080');
    });
})();



/* // Configurando vista Principal
const viewsPath = resolve('src/views');

app.engine('handlebars', engine({
    layoutsDir: `${viewsPath}/layouts`,
    defaultLayout: `${viewsPath}/layouts/main.handlebars`,
}));
app.set('view engine', 'handlebars');
app.set('views', viewsPath); */

/*     const socketServer = new Server (httpServer)

    socketServer.on("connection", socket => {
        console.log("Nuevo cliente conectado");

        socket.on('addProduct', (product) => {
        productManager.addProduct(product)
        })

        socket.on('deleteProduct', (id) => {
        productManager.deleteProduct(id);
        
        socketServer.emit('update', productManager.getProducts())
        })
    })
 */