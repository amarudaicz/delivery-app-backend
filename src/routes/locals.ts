import { Router } from 'express';
import {
  getAllLocals,
  getLocal,
  deleteLocal,
  postLocal,
  createTableLocal,
  getRecents,
  putSchedules,
  putLinks,
  putLocal,
  isPathAvailable
} from '../controllers/locals';
import { checkToken, checkTokenStrict } from '../middleware/checkToken';
import { checkUserState, insertUserRequest } from '../middleware/checkUserState';

export const router = Router();

router.get('/get-all', getAllLocals);
router.post('/', postLocal);

router.put('/',checkTokenStrict, checkUserState, putLocal);

router.get('/:local?', checkToken, insertUserRequest, getLocal);

router.post('/get-recents', getRecents);


router.post('/post-table', createTableLocal);

router.delete('/delete-one/:id', deleteLocal);


router.put('/put-schedules',checkTokenStrict, checkUserState, putSchedules);
router.put('/put-links',checkTokenStrict, checkUserState, putLinks);

router.get('/is-path-available/:path', isPathAvailable);

