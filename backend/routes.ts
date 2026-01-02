import {Request, Response, NextFunction, Router} from 'express';
import {AuthController} from './src/controller/auth.controller';
import {checkAuth} from './src/middleware/checkAuth';
import {checkAuthSoft} from './src/middleware/checkAuthSoft';
import moviesController from './src/controller/movies.controller';
import seriesController from './src/controller/series.controller';
import watchController from './src/controller/watch.controller';
import GimmickController from './src/controller/gimmick.controller';
import {validatePayload} from './src/middleware/validatePayload';
import {signInSchema, signUpSchema} from './src/domain/schemas/auth';
import {validateQueryParams} from './src/middleware/validateQueryParams';
import {searchMoviesSchema} from './src/domain/schemas/movies';

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

const router = Router();
const authController = new AuthController();

router.post('/signUp', validatePayload(signUpSchema), asyncHandler(authController.signUp));
router.post('/signIn', validatePayload(signInSchema), asyncHandler(authController.signIn));
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
router.get('/search/series', checkAuthSoft, seriesController.getSearchedSeries);

router.post('/watched', checkAuth, watchController.addWatched);
router.get('/watched', checkAuth, watchController.getWatched);
router.delete('/watched', checkAuth, watchController.deleteWatched);

router.get('/randomMovie', GimmickController.getRandomMovieSummary);

export default router;
