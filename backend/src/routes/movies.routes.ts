import {Router} from 'express';
import moviesController from '../controller/movies.controller';
import {checkIsToken} from '../middleware/checkAuthMiddleware';

const router = new Router();

router.get('/discover/movies', checkIsToken, moviesController.getLatestMovies);
router.get('/search/movies', checkIsToken, moviesController.getSearchedMovies);

export default router;
