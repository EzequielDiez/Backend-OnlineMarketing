import { Router } from 'express';
import { deleteOne, getOne, list, save, update, changePremium, insertDocuments } from '../controllers/userController.js';
import auth from '../middlewares/auth.js';
import authorization from '../middlewares/authorization.js';
import uploader from '../../helper/uploader.js';

const userRouter = Router();

userRouter.use(auth);

userRouter.get('/', authorization('getUsers'), list);
userRouter.get('/:id', /* authorization('getUser'), */ getOne);
userRouter.get('/premium/:uid', /*  authorization('bePremium'), */ changePremium);
userRouter.post('/:uid/documents', uploader.array('documents', 4), insertDocuments)
userRouter.post('/', authorization('saveUser'), save);
userRouter.put('/:id', authorization('updateUser'), update);
userRouter.delete('/:id', authorization('deleteUser'), deleteOne);

export default userRouter;
