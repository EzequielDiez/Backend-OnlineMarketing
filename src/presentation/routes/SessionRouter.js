import { Router } from 'express';
import { login, current, signup, forgotPassword, resetPassword, logout } from '../controllers/sessionController.js';
import auth from '../middlewares/auth.js';

const sessionRouter = Router();

sessionRouter.post('/login', login);
sessionRouter.get('/current', auth, current);
sessionRouter.post('/signup', signup);
sessionRouter.get('/logout', auth, logout)
sessionRouter.post('/forgotPassword', forgotPassword);
sessionRouter.post('/resetPassword', resetPassword);

export default sessionRouter;
