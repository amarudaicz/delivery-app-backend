"use strict";
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
exports.getCategories = exports.postCategory = void 0;
const httpError_1 = require("../utils/httpError");
const config_1 = require("../mysql/config");
const postCategory = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { category_name, category_image, local_id } = req.body;
        const data = yield (0, config_1.doQuery)(`INSERT INTO categories (category_name, category_image, local_id) VALUES(?,?,?)`, [category_name, category_image, local_id]);
        res.send(data).status(200);
    }
    catch (err) {
        (0, httpError_1.httpError)(res, err, 202);
    }
});
exports.postCategory = postCategory;
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
