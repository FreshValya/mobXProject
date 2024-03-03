import {Router} from 'express';
import watchController from '../controller/watch.controller';
import {verifyToken} from '../middleware/authMiddleware';

const router = new Router();

router.post('/watched', verifyToken, watchController.addWatched);
router.get('/watched', verifyToken, watchController.getWatched);
router.delete('/watched', verifyToken, watchController.deleteWatched);

export default router;
