import { Router } from 'express';
import SessionController from '../controllers/sessionController.js';
import auth from '../middlewares/auth.js';

const sessionRouter = Router();

sessionRouter.post('/login', SessionController.login);
sessionRouter.get('/current', auth, SessionController.current);
sessionRouter.post('/signup', SessionController.signup);
sessionRouter.get('/logout', auth, SessionController.logout);
sessionRouter.post('/forgotPassword', SessionController.forgotPassword);
sessionRouter.post('/resetPassword', SessionController.resetPassword);

export default sessionRouter;
