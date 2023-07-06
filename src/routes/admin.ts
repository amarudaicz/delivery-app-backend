import { Router } from 'express';
import { deleteCategory, deleteOptionGroup, getCategories, postCategory, postOptions, putOptions, stateCategory, updateCategory } from '../controllers/admin';
import { checkTokenStrict } from '../middleware/checkToken';
import upload from '../config/multer';
import multer from 'multer';
import { capitalize } from '../utils/capitalize';

const router = Router();


//CATEGORIES
router.get('/get-categories',checkTokenStrict, getCategories);
router.post('/categories', checkTokenStrict, upload.single('image'), postCategory);
router.put('/categories', checkTokenStrict, upload.single('image'), updateCategory);
router.delete('/categories/:id', checkTokenStrict, deleteCategory);

router.put('/categories/set-active', checkTokenStrict, stateCategory);




//CRUD PARA MANEJAR EL ARRAY DE OPCIONES DEL LOCAL Y LA ACTUALIZACION DE PRODUCTOS EN LA TABLA 
router.post('/options-group',  checkTokenStrict, postOptions);

router.put('/options-group', checkTokenStrict, putOptions);

router.delete('/options-group/:id', checkTokenStrict, deleteOptionGroup);





export { router };
