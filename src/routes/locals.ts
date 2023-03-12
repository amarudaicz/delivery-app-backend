import { Router } from 'express';
import {
  getAllLocals,
  getLocal,
  updateLocal,
  deleteLocal,
  postLocal,
  createTableLocal
} from '../controllers/locals';

const router = Router();

router.get('/get-all', getAllLocals);

router.get('/:local', getLocal);

router.post('/post-one', postLocal);

router.post('/post-table', createTableLocal);

router.delete('/delete-one/:id', deleteLocal);

router.put('/put-one', updateLocal);

export { router };
