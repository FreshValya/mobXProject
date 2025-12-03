import {Router} from 'express';
import userController from './src/controller/auth.controller';
import {verifyToken} from './src/middleware/authMiddleware';
import authController from './src/controller/auth.controller';
import {checkIsToken} from './src/middleware/checkAuthMiddleware';
import moviesController from './src/controller/movies.controller';
import seriesController from './src/controller/series.controller';
import watchController from './src/controller/watch.controller';
import {catchErrors} from './src/handlers/errorHandlers';
import GimmickController from './src/controller/gimmick.controller';

const router = Router();

router.post('/signUp', userController.signUp);
router.post('/signIn', userController.signIn);
router.post('/signOut', verifyToken, userController.signOut);
router.get('/verify', verifyToken, authController.verify);

router.get('/discover/movies', checkIsToken, moviesController.getLatestMovies);
router.get('/search/movies', checkIsToken, moviesController.getSearchedMovies);

router.get('/discover/series', checkIsToken, seriesController.getLatestSeries);
router.get('/search/series', seriesController.getSearchedSeries);

router.post('/watched', verifyToken, watchController.addWatched);
router.get('/watched', verifyToken, watchController.getWatched);
router.delete('/watched', verifyToken, watchController.deleteWatched);

router.get('/randomMovie', catchErrors(GimmickController.getRandomMovieSummary));

export default router;
