import { Router } from "express";
import { login, current, signup } from "../controllers/sessionController.js"
import auth from "../middlewares/auth.js";


const sessionRouter = Router()

sessionRouter.post('/login', login)
sessionRouter.get('/current', auth, current);
sessionRouter.post('/signup', signup);

export default sessionRouter;