import { Router } from 'express';
import {
  deleteProduct,
  updateProduct,
  getProducts,
  getProduct,
  postProduct
} from '../controllers/products';
import { checkToken, checkTokenStrict } from '../middleware/checkToken';
import multer from 'multer';
// Configurar Multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // Directorio donde se guardarán los archivos
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Nombre del archivo
  }
});

const upload = multer({ storage: storage });
const router = Router();

router.get('/:table?', checkToken, getProducts);

router.get('/get-one/:local/:id', getProduct);

router.post('/', checkTokenStrict, upload.single('image'), postProduct);

router.delete('/:id', checkTokenStrict, deleteProduct);

router.put('/', checkTokenStrict, upload.single('image'), updateProduct);

export { router };
