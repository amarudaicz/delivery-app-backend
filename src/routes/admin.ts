import { Router } from 'express';
import { getCategories, postCategory } from '../controllers/admin';

const router = Router();

router.get('/get-categories/:id', getCategories);


router.post('/post-category', postCategory);



export { router };
