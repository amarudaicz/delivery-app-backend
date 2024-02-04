import { Router } from 'express';
import {
  deleteProduct,
  updateProduct,
  getProducts,
  getProduct,
  postProduct,
  updateStockProduct,
  updateFixedProduct,
  uploadExcelProducts,
  
} from '../controllers/products';
import { checkToken, checkTokenStrict } from '../middleware/checkToken';
import multer from 'multer';
import { capitalize } from '../utils/capitalize';
import { checkUserState, insertUserRequest } from '../middleware/checkUserState';
import upload from '../config/multer';

const router = Router();


router.get('/:table?', checkToken, insertUserRequest, getProducts);
router.get('/get-one/:local/:id', getProduct);

router.post('/', checkTokenStrict, checkUserState,  capitalize(false, ['name', 'description']), postProduct);

router.post('/excel', checkTokenStrict, checkUserState, upload.single('file'), uploadExcelProducts);

router.put('/update-stock', checkTokenStrict, checkUserState, updateStockProduct);
router.put('/update-fixed', checkTokenStrict, checkUserState, updateFixedProduct);

router.put('/', checkTokenStrict, checkUserState, updateProduct);

router.delete('/:id', checkTokenStrict, checkUserState, deleteProduct);





export { router };
