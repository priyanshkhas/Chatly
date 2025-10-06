import express from 'express';
 import {getCurrentUser} from '../controllers/user.controllers.js';
 import {isAuth} from '../middlewares/auth.middleware.js'; 
const userRouter = express.Router();

userRouter.get('/current',isAuth, getCurrentUser);

export default userRouter;