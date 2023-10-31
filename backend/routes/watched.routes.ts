import {Router} from 'express';
import watchController from '../controller/watch.controller';

const router = new Router();

router.post('/watched', watchController.postWatched);
router.get('/watched', watchController.getWatched);

export default router;
