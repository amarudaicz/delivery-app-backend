"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const products_1 = require("../controllers/products");
const checkToken_1 = require("../middleware/checkToken");
const multer_1 = __importDefault(require("multer"));
const capitalize_1 = require("../utils/capitalize");
// Configurar Multer
const storage = multer_1.default.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directorio donde se guardarán los archivos
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname); // Nombre del archivo
    }
});
const upload = (0, multer_1.default)({ storage: storage });
const router = (0, express_1.Router)();
exports.router = router;
router.get('/:table?', checkToken_1.checkToken, products_1.getProducts);
router.get('/get-one/:local/:id', products_1.getProduct);
router.post('/', checkToken_1.checkTokenStrict, upload.single('image'), (0, capitalize_1.capitalize)(false, ['name', 'description']), products_1.postProduct);
router.put('/update-stock', checkToken_1.checkTokenStrict, products_1.updateStockProduct);
router.put('/', checkToken_1.checkTokenStrict, upload.single('image'), products_1.updateProduct);
router.delete('/:id', checkToken_1.checkTokenStrict, products_1.deleteProduct);
