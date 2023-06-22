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
exports.registerAdmin = exports.register = exports.login = void 0;
const bcrypt = __importStar(require("bcrypt"));
const config_1 = require("../mysql/config");
const httpError_1 = require("../utils/httpError");
const cleanUser_1 = require("../utils/cleanUser");
const handleJwt_1 = require("../utils/handleJwt");
const checkData_1 = require("../utils/checkData");
const login = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { username, password } = req.body;
        let user = yield (0, config_1.doQuery)(`select * from users WHERE username = ?`, [username]);
        if ((0, checkData_1.checkData)(user)) {
            return (0, httpError_1.httpError)(res, 'No existe un usuario registrado', 401);
        }
        const checkPassword = yield bcrypt.compare(password, user[0].password);
        if (!checkPassword) {
            return (0, httpError_1.httpError)(res, 'Contraseña incorrecta', 401);
        }
        if (!user[0].admin) {
            user = (0, cleanUser_1.cleanUser)(user[0]);
        }
        delete user[0].password;
        const token = (0, handleJwt_1.signJwt)(user[0]);
        const exp = (0, handleJwt_1.verifyJwt)(token).exp;
        res.cookie('jwt', token, { httpOnly: true, secure: true }).json({ token, exp });
    }
    catch (err) {
        console.log(err);
        (0, httpError_1.httpError)(res, 'A ocurrido un error intente nuevamente', 403);
    }
});
exports.login = login;
const register = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = req.user;
        console.log(user);
        if (!user.root) {
            return (0, httpError_1.httpError)(res, 'No tienes permisos', 403);
        }
        let { username, password, admin, admin_table, local_id } = req.body;
        const salt = yield bcrypt.genSalt(15);
        password = yield bcrypt.hash(password, salt);
        const op = yield (0, config_1.doQuery)(`
        INSERT IGNORE INTO users (username, password, admin_table, local_id, admin)
        VALUES (?,?,?,?,?);`, [username, password, admin_table, local_id, admin || 0]);
        if (!op.affectedRows)
            return (0, httpError_1.httpError)(res, 'Nombre de usuario en uso', 403);
        res.status(201).json({ success: 'Usuario creado' });
    }
    catch (err) {
        console.log(err);
        (0, httpError_1.httpError)(res, 'A ocurrido error', 403);
    }
});
exports.register = register;
const registerAdmin = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const salt = yield bcrypt.genSalt(15);
        data.password = yield bcrypt.hash(data.password, salt);
        const operation = yield (0, config_1.doQuery)(`INSERT INTO users (username, password, admin_table, local_id) VALUES (?,?,?,?)`, [data.username, data.password, data.admin_table, data.local_id]);
        console.log(operation);
        res.status(201).json(operation);
    }
    catch (err) {
        console.log(err);
        (0, httpError_1.httpError)(res, 'ERROR_REGISTER_ADMIN', 403);
    }
});
exports.registerAdmin = registerAdmin;
