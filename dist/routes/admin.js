"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = require("express");
const admin_1 = require("../controllers/admin");
const checkToken_1 = require("../middleware/checkToken");
const multer_1 = __importDefault(require("../config/multer"));
const router = (0, express_1.Router)();
exports.router = router;
//CATEGORIES
router.get('/get-categories', checkToken_1.checkTokenStrict, admin_1.getCategories);
router.post('/categories', checkToken_1.checkTokenStrict, multer_1.default.single('image'), admin_1.postCategory);
router.put('/categories', checkToken_1.checkTokenStrict, multer_1.default.single('image'), admin_1.updateCategory);
router.put('/categories/set-active', checkToken_1.checkTokenStrict, admin_1.stateCategory);
router.delete('/categories/:id', checkToken_1.checkTokenStrict, admin_1.deleteCategory);
router.put('/categories/sort-order', checkToken_1.checkTokenStrict, admin_1.putSortOrder);
//CRUD PARA MANEJAR EL ARRAY DE OPCIONES DEL LOCAL Y LA ACTUALIZACION DE PRODUCTOS EN LA TABLA 
router.post('/options-group', checkToken_1.checkTokenStrict, admin_1.postOptions);
router.put('/options-group', checkToken_1.checkTokenStrict, admin_1.putOptions);
router.delete('/options-group/:id', checkToken_1.checkTokenStrict, admin_1.deleteOptionGroup);
