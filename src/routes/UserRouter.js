import { Router } from "express";
import { deleteOne, getOne, list, save, update } from "../controllers/userController.js";


const userRouter = Router()

userRouter.get('/', list)
userRouter.get('/:id', getOne)
userRouter.post('/', save)
userRouter.put('/:id', update)
userRouter.delete('/:id', deleteOne)

export default userRouter