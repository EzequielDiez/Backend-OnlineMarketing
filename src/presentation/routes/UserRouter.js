import { Router } from 'express';
import { deleteOne, update, changePremium, insertDocuments } from '../controllers/userController.js';
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
userRouter.post('/documents', uploader.array('documents', 4), insertDocuments);
userRouter.put('/:id', authorization('updateUser'), update);
userRouter.delete('/:id', authorization('deleteUser'), deleteOne);

export default userRouter;
