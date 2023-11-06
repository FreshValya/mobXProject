import {Router} from 'express';
import watchController from '../controller/watch.controller';

const router = new Router();

router.post('/watched', watchController.addWatched);
router.get('/watched', watchController.getWatched);
router.delete('/watched', watchController.deleteWatched);

export default router;
