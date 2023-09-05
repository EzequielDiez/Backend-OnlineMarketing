import { Router } from 'express';
import auth from '../middlewares/auth.js';
import RoleController from '../controllers/roleController.js';
import authorization from '../middlewares/authorization.js';

const roleRouter = Router();

roleRouter.use(auth);

roleRouter.get('/', authorization('getRoles'), RoleController.list);
roleRouter.get('/:id', authorization('getRole'), RoleController.getRoleById);
roleRouter.post('/', authorization('saveRole'), RoleController.postRole);
roleRouter.put('/:id', authorization('updateRole'), RoleController.putRole);
roleRouter.delete('/:id', authorization('deleteRole'), RoleController.deleteOneRole);

export default roleRouter;
