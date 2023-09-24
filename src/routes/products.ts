import { Router } from 'express';
import {
  deleteProduct,
  updateProduct,
  getProducts,
  getProduct,
  postProduct,
  updateStockProduct,
  
} from '../controllers/products';
import { checkToken, checkTokenStrict } from '../middleware/checkToken';
import multer from 'multer';
import { capitalize } from '../utils/capitalize';
import { checkUserState } from '../middleware/checkUserState';
import upload from '../config/multer';

const router = Router();


router.get('/:table?', checkToken, getProducts);
router.get('/get-one/:local/:id', getProduct);

router.post('/', checkTokenStrict, checkUserState, upload.single('image'), capitalize(false, ['name', 'description']), postProduct);

router.put('/update-stock', checkTokenStrict, checkUserState, checkUserState, updateStockProduct);

router.put('/', checkTokenStrict, checkUserState, upload.single('image'), updateProduct);

router.delete('/:id', checkTokenStrict, checkUserState, deleteProduct);





export { router };
