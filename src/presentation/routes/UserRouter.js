import { Router } from 'express';
import UserController from '../controllers/userController.js';
import auth from '../middlewares/auth.js';
import authorization from '../middlewares/authorization.js';
import uploader from '../../helper/uploader.js';

const userRouter = Router();

userRouter.use(auth);

userRouter.get('/', authorization('getAllUsers'), UserController.getUsers);
userRouter.get('/:id', UserController.getUserById);
userRouter.post('/', authorization('addOneUser'), UserController.postUser);
userRouter.put('/premium', UserController.changeToPremium);
userRouter.post('/documents', uploader.array('documents', 4), UserController.postDocuments);
userRouter.put('/:id', UserController.putUser);
userRouter.delete('/:id', authorization('deleteUser'), UserController.deleteOneUser);
userRouter.delete('/', authorization('deleteInactive'), UserController.deleteInactiveUsers);

export default userRouter;
