import {Router} from 'express';
import moviesController from '../controller/movies.controller';

const router = new Router();

router.get('/discover/movies', moviesController.getLatestMovies);
router.get('/search/movies', moviesController.getSearchedMovies);

export default router;
