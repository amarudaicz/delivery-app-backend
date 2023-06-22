"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateProduct = exports.deleteProduct = exports.postProduct = exports.getProduct = exports.getProducts = void 0;
const httpError_1 = require("../utils/httpError");
const config_1 = require("../mysql/config");
const checkData_1 = require("../utils/checkData");
const cloudinary = __importStar(require("cloudinary"));
const getProducts = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const table = req.params.table || ((_a = req.user) === null || _a === void 0 ? void 0 : _a.admin_table);
        console.log(table);
        if (!table) {
            return (0, httpError_1.httpError)(res, 'No hay tabla para consultar', 403);
        }
        //INTERFACE Product
        let data = yield (0, config_1.doQuery)(`SELECT ${table}.id, name, price, ingredients, ${table}.local_id, image, category_id, category_name, category_image, variations, description FROM ${table} INNER JOIN categories ON categories.id = ${table}.category_id AND categories.local_id = ${table}.local_id`, []);
        for (let i = 0; i < data.length; i++) {
            data[i].variations = JSON.parse(data[i].variations);
            data[i].ingredients = JSON.parse(data[i].ingredients);
        }
        res.json(data);
    }
    catch (err) {
        console.log(err);
        (0, httpError_1.httpError)(res, 'ERROR_GET_PRODUCTS', 403);
    }
});
exports.getProducts = getProducts;
const getProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { local, id } = req.params;
        const { admin_table } = req.user;
        const data = yield (0, config_1.doQuery)(`SELECT ${local}.id, name, price, ingredients, category_id, category_name FROM ${local} INNER JOIN categories ON categories.id = ${local}.category_id AND categories.local_id = ${local}.local_id WHERE ${local}.id = ${Number(id)} `, []);
        if ((0, checkData_1.checkData)(data))
            return (0, httpError_1.httpError)(res, "No se han encotrado producto", 403);
        res.json(data);
    }
    catch (err) {
        // httpError(res, err, 403);
        res.status(403).json({ error: "asd" });
    }
});
exports.getProduct = getProduct;
const postProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const image = req.file;
        let imageUrl = null;
        const { name, price, category_id, description, variations, ingredients } = req.body;
        console.log(req.body, ingredients);
        if (image) {
            const imageUpload = yield cloudinary.v2.uploader.upload(image.path, {
                folder: user.admin_table,
                public_id: name.replace(' ', '-').trim() || name,
                overwrite: true,
                quality: 90
            });
            console.log(imageUpload);
            imageUrl = imageUpload.secure_url;
        }
        const data = yield (0, config_1.doQuery)(`INSERT INTO ${user.admin_table} (name, local_id, image, price, ingredients, category_id, description, variations) VALUES(?,?,?,?,?,?,?,?)`, [name, user.local_id, imageUrl, price, ingredients, category_id, description === 'null' ? null : description, variations]);
        return res.json(data);
    }
    catch (err) {
        console.log(err);
        (0, httpError_1.httpError)(res, err, 403);
    }
});
exports.postProduct = postProduct;
const deleteProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const { admin_table } = req.user;
        const data = yield (0, config_1.doQuery)(`DELETE FROM ${admin_table} WHERE id = ?;`, [id]);
        res.json(data);
    }
    catch (err) {
        (0, httpError_1.httpError)(res, err, 403);
    }
});
exports.deleteProduct = deleteProduct;
const updateProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const file = req.file;
        let imageUrl = null;
        const { id, name, price, category_id, description, variations, ingredients, image } = req.body;
        console.log(req.body);
        if (file) {
            const imageUpload = yield cloudinary.v2.uploader.upload(file.path, {
                folder: user.admin_table,
                public_id: name,
                overwrite: true,
                quality: 90
            });
            console.log(imageUpload);
            imageUrl = imageUpload.secure_url;
        }
        const data = yield (0, config_1.doQuery)(`UPDATE ${user.admin_table} SET name=?, image=?, price=?, ingredients=?, category_id=?, description=?, variations=? WHERE id = ? `, [name, imageUrl ? imageUrl : (image === 'null' ? null : image), price, ingredients, category_id, description === 'null' ? null : description, variations, id]);
        res.json(data);
    }
    catch (err) {
        console.log(err);
        (0, httpError_1.httpError)(res, err, 403);
    }
});
exports.updateProduct = updateProduct;
