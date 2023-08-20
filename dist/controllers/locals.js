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
exports.getRecents = exports.putLinks = exports.putSchedules = exports.createTableLocal = exports.updateLocal = exports.putLocal = exports.deleteLocal = exports.postLocal = exports.getAllLocals = exports.getLocal = void 0;
const httpError_1 = require("../utils/httpError");
const config_1 = require("../mysql/config");
const checkData_1 = require("../utils/checkData");
const parseData_1 = require("../utils/parseData");
const getLocal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        const table = req.params.local || ((_a = req.user) === null || _a === void 0 ? void 0 : _a.admin_table);
        if (!table)
            return (0, httpError_1.httpError)(res, 'No hay tabla para consultar', 403);
        const data = yield (0, config_1.doQuery)('SELECT * FROM locals WHERE name_url = ?;', [
            table,
        ]);
        if ((0, checkData_1.checkData)(data)) {
            return (0, httpError_1.httpError)(res, 'No se a encontrado el local', 202);
        }
        data[0].schedules ? data[0].schedules = JSON.parse(data[0].schedules) : null;
        data[0].options_group ? data[0].options_group = JSON.parse(data[0].options_group) : null;
        data[0].links = (0, parseData_1.parseJson)(data[0].links);
        data[0].shipping = (0, parseData_1.parseJson)(data[0].shipping);
        data[0].pay_methods = (0, parseData_1.parseJson)(data[0].pay_methods);
        res.json(data);
    }
    catch (err) {
        console.log(err);
        (0, httpError_1.httpError)(res, err, 403);
    }
});
exports.getLocal = getLocal;
const getAllLocals = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = yield (0, config_1.doQuery)('SELECT * FROM locals;', []);
        res.json(data);
    }
    catch (err) {
        (0, httpError_1.httpError)(res, err, 403);
    }
});
exports.getAllLocals = getAllLocals;
const postLocal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name, location, contact, description } = req.body;
        const name_url = name.trim().toLowerCase().replace(' ', '');
        const data = yield (0, config_1.doQuery)('INSERT INTO locals (name, name_url, location, contact, description) VALUES(?,?,?,?,?);', [name, name_url, location, contact, description]);
        res.status(201).json(data);
    }
    catch (err) {
        (0, httpError_1.httpError)(res, err, 403);
    }
});
exports.postLocal = postLocal;
const deleteLocal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id } = req.params;
        const data = yield (0, config_1.doQuery)('DELETE FROM locals WHERE id = ?;', [id]);
        res.json(data);
    }
    catch (err) {
        (0, httpError_1.httpError)(res, err, 403);
    }
});
exports.deleteLocal = deleteLocal;
const putLocal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        const updateFields = {};
        const { id, name, location, description, schedules, aliascbu, pick_in_local, delivery_cost, delivery_time, instagram, maps, website, phone, image, options } = req.body;
        for (const field in req.body) {
            console.log(field);
            if (field !== 'id' && (field === 'options' || field === 'schedules' || field === 'links' || field === 'shipping' || field === 'pay_methods'))
                updateFields[field] = JSON.stringify(req.body[field]);
            else
                updateFields[field] = req.body[field];
        }
        const data = yield (0, config_1.doQuery)(`UPDATE locals SET ?
      WHERE id = ?;`, [updateFields, user.local_id]);
        console.log(data);
        res.json(data);
    }
    catch (err) {
        console.log(err);
        (0, httpError_1.httpError)(res, 'ERROR', 403);
    }
});
exports.putLocal = putLocal;
const updateLocal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        console.log(req.body);
        const { id, name, location, description, schedules, aliascbu, pick_in_local, delivery_cost, delivery_time, instagram, maps, website, phone, image, options } = req.body;
        // const name_url: string = name.trim().toLowerCase().replace(' ', '');
        if (options) {
            const data = yield (0, config_1.doQuery)(`UPDATE locals SET 
        options_group = ?
    
        WHERE id = ?;`, [JSON.stringify(options), user.local_id]);
            res.json(data);
            return;
        }
        const data = yield (0, config_1.doQuery)(`UPDATE locals SET 
      name = ?, 
      location = ?, 
      phone = ?, 
      description = ?, 
      image = ?, 
      schedules = ?, 
      delivery_cost = ?, 
      delivery_time = ?,
      aliascbu = ?,
      pick_in_local = ?,
      instagram = ?, 
      maps=?,
      website= ? 
      WHERE id = ?;`, [name, location, phone, description, image, JSON.stringify(schedules), delivery_cost, delivery_time, aliascbu, pick_in_local, instagram, maps, website, user.local_id]);
        res.json(data);
    }
    catch (err) {
        console.log(err);
        (0, httpError_1.httpError)(res, 'ERROR', 403);
    }
});
exports.updateLocal = updateLocal;
const createTableLocal = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { name } = req.body;
        const nameTable = name.trim().toLowerCase().replace(' ', '');
        const data = yield (0, config_1.doQuery)(`CREATE TABLE ${nameTable} (id serial NOT NULL, name varchar(255) NOT NULL,price longtext NOT NULL,ingredients longtext DEFAULT NULL,id_category int(11) NOT NULL, createdAt datetime DEFAULT  CURRENT_TIMESTAMP(), FOREIGN KEY (id_category) REFERENCES categories(id));`, [false]);
        res.send('ok');
    }
    catch (err) {
        (0, httpError_1.httpError)(res, err, 403);
    }
});
exports.createTableLocal = createTableLocal;
const putSchedules = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { schedules } = req.body;
        const admin = (req.user);
        const data = yield (0, config_1.doQuery)(`UPDATE locals SET schedules = ? WHERE id = ?`, [JSON.stringify(schedules), admin.local_id]);
        console.log(data);
        res.send(data);
    }
    catch (err) {
        console.log(err);
        (0, httpError_1.httpError)(res, err, 403);
    }
});
exports.putSchedules = putSchedules;
const putLinks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { links } = req.body;
        const admin = (req.user);
        const data = yield (0, config_1.doQuery)(`UPDATE locals SET links = ? WHERE id = ?`, [JSON.stringify(links), admin.local_id]);
        console.log(data);
        res.send(data);
    }
    catch (err) {
        console.log(err);
        (0, httpError_1.httpError)(res, err, 403);
    }
});
exports.putLinks = putLinks;
const getRecents = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { recents } = req.body;
        const data = yield (0, config_1.doQuery)(`SELECT *
      FROM locals
      WHERE id IN (${recents.join(', ')})`, []);
        console.log(data);
        for (let i = 0; i < data.length; i++) {
            data[i].schedules = (0, parseData_1.parseJson)(data[i].schedules);
        }
        res.send(data);
    }
    catch (err) {
        console.log(err);
        (0, httpError_1.httpError)(res, err, 403);
    }
});
exports.getRecents = getRecents;
