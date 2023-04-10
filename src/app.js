import express from 'express';
import {engine} from 'express-handlebars'
import {resolve} from 'path'
import http from 'http'
import { Server } from 'socket.io';
import ProductRouter from './routes/ProductRouter.js'
import CartRouter from './routes/CartRouter.js'


const app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}))

//Creando servidor WebSocket
const server = http.createServer(app)
const io = new Server(server)

io.on('connection', (socket) => {
    console.log(`Cliente conectado: ${socket.id}`);
  
  
    socket.on('disconnect', () => {
      console.log(`Cliente desconectado: ${socket.id}`);
    });
});

// Configurando vista Principal
const viewsPath = resolve('src/views');

app.engine('handlebars', engine({
    layoutsDir: `${viewsPath}/layouts`,
    defaultLayout: `${viewsPath}/index.handlebars`,
}));
app.set('view engine', 'handlebars');
app.set('views', viewsPath);

app.use("/api/products", ProductRouter)
app.use("/api/carts", CartRouter)
  
app.get('/realtime-products', (req, res) => {
    res.render('realTimeProducts');
  });

app.listen(8080, () => {
    console.log('Server started on port 8080');
});
