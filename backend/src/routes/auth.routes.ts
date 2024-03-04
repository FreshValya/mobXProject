import {Router} from 'express';
import userController from '../controller/auth.controller';
import {verifyToken} from '../middleware/authMiddleware';
import authController from '../controller/auth.controller';

const router = new Router();

router.post('/signUp', userController.signUp);
router.post('/signIn', userController.signIn);
router.post('/signOut', verifyToken, userController.signOut);
router.get('/verify', verifyToken, authController.verify);

export default router;
