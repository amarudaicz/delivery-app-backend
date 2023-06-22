import { Router } from 'express';
import { deleteOptionGroup, getCategories, postCategory, postOptions, putOptions } from '../controllers/admin';
import { checkTokenStrict } from '../middleware/checkToken';

const router = Router();

router.get('/get-categories',checkTokenStrict, getCategories);

router.post('/post-category',  checkTokenStrict, postCategory);




//CRUD PARA MANEJAR EL ARRAY DE OPCIONES DEL LOCAL Y LA ACTUALIZACION DE PRODUCTOS EN LA TABLA 
router.post('/options-group',  checkTokenStrict, postOptions);

router.put('/options-group', checkTokenStrict, putOptions);

router.delete('/options-group/:id', checkTokenStrict, deleteOptionGroup);





export { router };
