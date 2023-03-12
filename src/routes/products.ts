import { Router } from 'express';
import {
  deleteProduct,
  updateProduct,
  getProducts,
  getProduct,
  postProduct
} from '../controllers/products';
const router = Router();

router.get('/get-all/:local', getProducts);

router.get('/get-one/:local/:id', getProduct);

router.post('/post-one/:local', postProduct);

router.delete('/delete-one/:local/:id', deleteProduct);

router.put('/put-one/:local/:id', updateProduct);

export { router };
