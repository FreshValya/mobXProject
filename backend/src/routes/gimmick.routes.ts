import {Router} from 'express';
import GimmickController from '../controller/gimmick.controller';
import {catchErrors} from '../handlers/errorHandlers';

const router = new Router();

router.get('/randomMovie', catchErrors(GimmickController.getRandomMovieSummary));

export default router;
