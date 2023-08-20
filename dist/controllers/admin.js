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
exports.deleteOptionGroup = exports.putOptions = exports.postOptions = exports.putSortOrder = exports.stateCategory = exports.getCategories = exports.deleteCategory = exports.updateCategory = exports.postCategory = void 0;
const httpError_1 = require("../utils/httpError");
const config_1 = require("../mysql/config");
const cloudinary = __importStar(require("cloudinary"));
const fs = __importStar(require("fs"));
const postCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category_name, category_description, sort_order } = req.body;
        const { local_id, admin_table } = req.user;
        console.log(req.body);
        const file = req.file;
        let imageUrlCloudinary = null;
        if (file) {
            const imageUpload = yield cloudinary.v2.uploader.upload(file.path, {
                folder: admin_table,
                public_id: category_name.replace(' ', '-').trim() || category_name,
                overwrite: true,
                quality: 90
            });
            imageUrlCloudinary = imageUpload.secure_url;
            fs.rm(file.path, () => console.log(`rm(${file.path})`));
        }
        console.log(file);
        const data = yield (0, config_1.doQuery)(`INSERT INTO categories (category_name, category_image,category_description, sort_order, local_id) VALUES(?,?,?,?,?)`, [category_name, imageUrlCloudinary, category_description, sort_order, local_id]);
        res.send(data).status(200);
    }
    catch (err) {
        (0, httpError_1.httpError)(res, err, 202);
    }
});
exports.postCategory = postCategory;
const updateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category_name, category_description, id, sort_order } = req.body;
        let { image } = req.body;
        image = image !== 'null' ? image : null;
        const { local_id, admin_table } = req.user;
        console.log(req.body);
        const file = req.file;
        let imageUrlCloudinary = null;
        if (file) {
            const imageUpload = yield cloudinary.v2.uploader.upload(file.path, {
                folder: admin_table,
                public_id: category_name.replace(' ', '-').trim() || name,
                overwrite: true,
                quality: 90
            });
            imageUrlCloudinary = imageUpload.secure_url;
            fs.rm(file.path, () => console.log(`rm(${file.path})`));
        }
        console.log(file);
        const data = yield (0, config_1.doQuery)(`UPDATE categories SET category_name = ?, category_description = ?, category_image = ?  WHERE id = ?`, [category_name, category_description, imageUrlCloudinary || image, Number(id)]);
        res.send(data).status(200);
    }
    catch (err) {
        (0, httpError_1.httpError)(res, err, 202);
    }
});
exports.updateCategory = updateCategory;
const deleteCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield (0, config_1.doQuery)(`DELETE FROM categories WHERE id = ? `, [Number(id)]);
        res.send(data);
    }
    catch (err) {
        console.log(err);
        (0, httpError_1.httpError)(res, err);
    }
});
exports.deleteCategory = deleteCategory;
const getCategories = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.user);
        const { local_id } = req.user;
        const data = yield (0, config_1.doQuery)(`SELECT * FROM categories WHERE local_id = ? `, [local_id]);
        res.send(data).status(200);
    }
    catch (err) {
        (0, httpError_1.httpError)(res, err, 202);
    }
});
exports.getCategories = getCategories;
const stateCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const { category_id, state } = req.body;
        const data = yield (0, config_1.doQuery)(`UPDATE categories SET active = ? WHERE id = ?`, [state, category_id]);
        res.json(data).status(200);
    }
    catch (err) {
        (0, httpError_1.httpError)(res, err);
    }
});
exports.stateCategory = stateCategory;
const putSortOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const categories = req.body.categories;
        console.log(categories);
        const idsToUpdate = categories.map((categoria) => categoria.id).join(',');
        let query = `UPDATE categories 
             SET sort_order = CASE id 
             ${categories.map((categoria) => `WHEN ${categoria.id} THEN ${categoria.sort_order}`).join(' ')}
             END
             WHERE id IN (${idsToUpdate})`;
        const data = yield (0, config_1.doQuery)(query, []);
        console.log(data);
        res.send(data);
    }
    catch (err) {
        (0, httpError_1.httpError)(res, err);
    }
});
exports.putSortOrder = putSortOrder;
const postOptions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { local_id } = req.user;
        const { options } = req.body;
        console.log(options);
        if (!options) {
            (0, httpError_1.httpError)(res, 'No proporciono opciones');
            return;
        }
        const data = yield (0, config_1.doQuery)(`UPDATE locals SET 
      options_group = ?
  
      WHERE id = ?;`, [JSON.stringify(options), local_id]);
        res.json(data);
    }
    catch (err) {
        (0, httpError_1.httpError)(res, err, 202);
    }
});
exports.postOptions = postOptions;
const putOptions = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const { products, group, variations } = req.body; //PRODUCTS IDS
        const updateLocalOptions = yield (0, config_1.doQuery)(`UPDATE locals SET options_group = ? WHERE id = ?`, [JSON.stringify(variations), user.local_id]);
        if (!products.length) {
            res.send(updateLocalOptions);
            return;
        }
        const productsRecovery = yield (0, config_1.doQuery)(`SELECT * FROM ${user.admin_table} WHERE id IN (${products.join(',')})`, [user.local_id]);
        const updatedProducts = productsRecovery.map((product) => {
            product.variations = JSON.parse(product.variations);
            const index = product.variations.findIndex((variation) => variation.nameVariation === group.nameVariation);
            product.variations[index] = group;
            return product;
        });
        // Construir la consulta SQL con múltiples valores
        const updateQuery = `
      UPDATE ${user.admin_table}
      SET variations = CASE 
        ${updatedProducts.map((product) => `WHEN id = ${product.id} THEN '${JSON.stringify(product.variations)}'`).join(' ')}
        ELSE variations
      END
      WHERE id IN (${products.join(',')})
    `;
        const data = yield (0, config_1.doQuery)(updateQuery, []);
        console.log(data);
        res.send(data).status(200);
    }
    catch (err) {
        (0, httpError_1.httpError)(res, err, 202);
    }
});
exports.putOptions = putOptions;
const deleteOptionGroup = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.user);
        const { local_id } = req.user;
        const { id: idGroup } = req.params;
        console.log(idGroup);
        let dataSet = yield (0, config_1.doQuery)(`SELECT options_group FROM locals WHERE id = ?`, [local_id]);
        console.log({ esto: dataSet });
        dataSet = JSON.parse(dataSet[0].options_group);
        dataSet = dataSet.filter((e) => e.id !== Number(idGroup));
        const data = yield (0, config_1.doQuery)(`UPDATE locals SET options_group = ? WHERE id = ?`, [JSON.stringify(dataSet), local_id]);
        res.send(data).status(200);
    }
    catch (err) {
        console.log(err);
        (0, httpError_1.httpError)(res, err, 202);
    }
});
exports.deleteOptionGroup = deleteOptionGroup;
