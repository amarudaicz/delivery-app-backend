import { Router } from 'express';
import { checkTokenStrict } from '../middleware/checkToken';
import { getStats, postView } from '../controllers/stats';
import { checkUserState } from '../middleware/checkUserState';

const router = Router();



router.get('/', checkTokenStrict, checkUserState, getStats)
router.post('/', postView)




export { router };