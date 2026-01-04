import {Router} from 'express';
import authController from './src/controller/auth.controller';
import {checkAuth} from './src/middleware/checkAuth';
import {checkAuthSoft} from './src/middleware/checkAuthSoft';
import moviesController from './src/controller/movies.controller';
import seriesController from './src/controller/series.controller';
import watchController from './src/controller/watched.controller';
import GimmickController from './src/controller/gimmick.controller';
import {validatePayload} from './src/middleware/validatePayload';
import {signInSchema, signUpSchema} from './src/domain/schemas/auth';
import {validateQueryParams} from './src/middleware/validateQueryParams';
import {searchMoviesSchema} from './src/domain/schemas/movies';
import {searchSeriesSchema} from './src/domain/schemas/series';
import {watchedMediaSchema, watchedQuerySchema} from './src/domain/schemas/watched';

const router = Router();

router.post('/signUp', validatePayload(signUpSchema), authController.signUp);
router.post('/signIn', validatePayload(signInSchema), authController.signIn);
router.post('/signOut', checkAuth, authController.signOut);
router.get('/verify', checkAuth, authController.verify);

router.get('/discover/movies', checkAuthSoft, moviesController.getLatestMovies);
router.get(
  '/search/movies',
  validateQueryParams(searchMoviesSchema),
  checkAuthSoft,
  moviesController.getSearchedMovies,
);

router.get('/discover/series', checkAuthSoft, seriesController.getLatestSeries);
router.get(
  '/search/series',
  validateQueryParams(searchSeriesSchema),
  checkAuthSoft,
  seriesController.getSearchedSeries,
);

router.post('/watched', checkAuth, validatePayload(watchedMediaSchema), watchController.addWatched);
router.get('/watched', checkAuth, validateQueryParams(watchedQuerySchema), watchController.getWatched);
router.delete('/watched', checkAuth, validateQueryParams(watchedMediaSchema), watchController.deleteWatched);

router.get('/randomMovie', GimmickController.getRandomMovieSummary);

export default router;
