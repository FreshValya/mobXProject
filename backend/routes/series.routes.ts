import {Router} from 'express';
import seriesController from '../controller/series.controller';

const router = new Router();

router.get('/discover/series', seriesController.getLatestSeries);
router.get('/search/series', seriesController.getSearchedSeries);

export default router;
