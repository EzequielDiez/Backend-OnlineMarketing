import { Router } from "express";
import CartManager from '../controllers/CartManager.js';

const CartRouter = Router();

const CartManager = new CartManager('./src/db/carts.json');