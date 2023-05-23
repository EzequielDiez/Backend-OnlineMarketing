import dotenv from "dotenv"
dotenv.config()

import express from 'express';
import mongoose from "mongoose";
import session from "express-session";
import mongoStore from "connect-mongo";
import cookieParser from "cookie-parser";

import ProductRouter from './routes/ProductRouter.js'
import CartRouter from './routes/CartRouter.js'
import userRouter from './routes/UserRouter.js'
import sessionRouter from "./routes/SessionRouter.js";

void (async() => 
{
    await mongoose.connect(process.env.MONGO_DB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })

    const app = express();

    app.use(express.json());
    app.use(express.urlencoded({extended: true}))
    app.use(cookieParser())
    app.use(session({
        store: mongoStore.create({
            mongoUrl: process.env.MONGO_DB_URI,
            ttl: 100
        }),
        secret: 'AgU4nT3R1v3R',
        resave: false,
        saveUninitialized: false
    }))

    app.use("/api/sessions", sessionRouter)
    app.use("/api/users", userRouter)
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