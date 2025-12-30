import {NextFunction, Router} from 'express';
import {AuthController} from './src/controller/auth.controller';
import {verifyToken} from './src/middleware/authMiddleware';
import {checkIsToken} from './src/middleware/checkAuthMiddleware';
import moviesController from './src/controller/movies.controller';
import seriesController from './src/controller/series.controller';
import watchController from './src/controller/watch.controller';
import GimmickController from './src/controller/gimmick.controller';
import {validate} from './src/middleware/validate';
import {signInSchema, signUpSchema} from './src/domain/schemas/auth';

export const asyncHandler = (fn: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

const router = Router();
const authController = new AuthController();

router.post('/signUp', validate(signUpSchema), asyncHandler(authController.signUp));
router.post('/signIn', validate(signInSchema), asyncHandler(authController.signIn));
router.post('/signOut', verifyToken, authController.signOut);
router.get('/verify', verifyToken, authController.verify);

router.get('/discover/movies', checkIsToken, moviesController.getLatestMovies);
router.get('/search/movies', checkIsToken, moviesController.getSearchedMovies);

router.get('/discover/series', checkIsToken, seriesController.getLatestSeries);
router.get('/search/series', seriesController.getSearchedSeries);

router.post('/watched', verifyToken, watchController.addWatched);
router.get('/watched', verifyToken, watchController.getWatched);
router.delete('/watched', verifyToken, watchController.deleteWatched);

router.get('/randomMovie', GimmickController.getRandomMovieSummary);

export default router;
