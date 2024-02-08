import {Router} from 'express';
import userController from '../controller/auth.controller';
import {verifyToken} from '../middleware/authMiddleware';

const router = new Router();

router.post('/signUp', userController.signUp);
router.post('/signIn', userController.signIn);
router.post('/signOut', verifyToken, userController.signOut);

export default router;
