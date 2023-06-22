import { Router } from 'express';
import {
  getAllLocals,
  getLocal,
  updateLocal,
  deleteLocal,
  postLocal,
  createTableLocal,
  getRecents
} from '../controllers/locals';
import { checkToken, checkTokenStrict } from '../middleware/checkToken';

const router = Router();

router.get('/get-all', getAllLocals);

router.get('/:local?', checkToken, getLocal);

router.post('/get-recents', getRecents);

router.post('/post-one', postLocal);

router.post('/post-table', createTableLocal);

router.delete('/delete-one/:id', deleteLocal);

router.put('/put-one',checkTokenStrict, updateLocal);


export { router };
