import {Router} from 'express';
import watchController from '../controller/watch.controller';

export const watchedRouter = new Router();

watchedRouter.get('/watched', watchController.getWatched);
