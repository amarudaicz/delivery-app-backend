import { Router } from 'express';
import { deleteCategory, deleteOptionGroup, getCategories, postCategory, postOptions, putOptions, putSortOrder, stateCategory, updateCategory } from '../controllers/admin';
import { checkTokenStrict } from '../middleware/checkToken';
import upload from '../config/multer';
import multer from 'multer';
import { checkUserState } from '../middleware/checkUserState';

const router = Router();
 

//CATEGORIES
router.get('/get-categories',checkTokenStrict, getCategories); 
router.post('/categories', checkTokenStrict, checkUserState, upload.single('image'), postCategory);
router.put('/categories', checkTokenStrict, checkUserState, upload.single('image'), updateCategory);
router.put('/categories/set-active', checkTokenStrict, checkUserState, stateCategory);
router.delete('/categories/:id', checkTokenStrict, checkUserState, deleteCategory);
router.put('/categories/sort-order', checkTokenStrict, checkUserState, putSortOrder);  





//CRUD PARA MANEJAR EL ARRAY DE OPCIONES DEL LOCAL Y LA ACTUALIZACION DE PRODUCTOS EN LA TABLA 
router.post('/options-group',  checkTokenStrict, checkUserState, postOptions);

router.put('/options-group', checkTokenStrict, checkUserState, putOptions);

router.delete('/options-group/:id', checkTokenStrict, checkUserState, deleteOptionGroup);





export { router };
