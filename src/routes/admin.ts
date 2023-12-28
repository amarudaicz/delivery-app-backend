import { Router } from 'express';
import { deleteAccount, deleteCategory, deleteOptionGroup, getCategories, getProducts, postAdmin, postCategory, postOptions, putOptions, putSortOrder, stateCategory, updateCategory } from '../controllers/admin';
import { checkTokenStrict } from '../middleware/checkToken';
import upload from '../config/multer';
import multer from 'multer';
import { checkUserState, insertUserRequest } from '../middleware/checkUserState';

const router = Router();
 

router.post('/', postAdmin); 

router.get('/products', checkTokenStrict, checkUserState, getProducts )
// router.get('/local', )




//CATEGORIES
router.get('/get-categories',checkTokenStrict, checkUserState, getCategories); 
router.post('/categories', checkTokenStrict, checkUserState,  postCategory);
router.put('/categories', checkTokenStrict, checkUserState, updateCategory);
router.put('/categories/set-active', checkTokenStrict, checkUserState, stateCategory);
router.delete('/categories/:id', checkTokenStrict, checkUserState, deleteCategory);
router.put('/categories/sort-order', checkTokenStrict, checkUserState, putSortOrder);  
router.delete('/delete-account', checkTokenStrict, insertUserRequest, deleteAccount);





//CRUD PARA MANEJAR EL ARRAY DE OPCIONES DEL LOCAL Y LA ACTUALIZACION DE PRODUCTOS EN LA TABLA 
router.post('/options-group',  checkTokenStrict, checkUserState, postOptions);

router.put('/options-group', checkTokenStrict, checkUserState, putOptions);

router.delete('/options-group/:id', checkTokenStrict, checkUserState, deleteOptionGroup);





export { router };
