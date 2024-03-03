import {Router} from 'express';
import seriesController from '../controller/series.controller';
import {checkIsToken} from '../middleware/checkAuthMiddleware';

const router = new Router();

router.get('/discover/series', checkIsToken, seriesController.getLatestSeries);
router.get('/search/series', seriesController.getSearchedSeries);

export default router;
