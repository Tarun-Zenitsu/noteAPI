import express from 'express';
import { signIn, signUp } from '../controllers/usercontrollers.js';

const userRouter = express.Router();

 userRouter.post("/sign-up", signUp)
 userRouter.post("/sign-in", signIn)


 export default userRouter;