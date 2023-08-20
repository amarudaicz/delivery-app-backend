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
exports.resetPassword = exports.verifyToken = exports.sendEmailToResetPassword = exports.registerAdmin = exports.register = exports.login = void 0;
const bcrypt = __importStar(require("bcrypt"));
const config_1 = require("../mysql/config");
const httpError_1 = require("../utils/httpError");
const cleanUser_1 = require("../utils/cleanUser");
const handleJwt_1 = require("../utils/handleJwt");
const checkData_1 = require("../utils/checkData");
const formatExpJwt_1 = require("../utils/formatExpJwt");
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
        res.status(201).json(operation);
    }
    catch (err) {
        console.log(err);
        (0, httpError_1.httpError)(res, 'ERROR_REGISTER_ADMIN', 403);
    }
});
exports.registerAdmin = registerAdmin;
const sendEmailToResetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        //HACER TOKEN Y TODA LA BOLA 
        const { email } = req.body;
        const user = yield (0, config_1.doQuery)(`select * from users WHERE email = ?`, [email]);
        if (!user[0]) {
            return (0, httpError_1.httpError)(res, 'El correo ingresado no esta registrado', 401);
        }
        const token = (0, handleJwt_1.signJwt)({ id: user[0].id }, '20m');
        console.log({ this: token });
        // sendEmail(email, token, resetPasswordTemplate(user[0], token) )
        res.json(true);
    }
    catch (err) {
        console.log(err);
        (0, httpError_1.httpError)(res, 'ERROR_RECOVERY_PASSWORD', 403);
    }
});
exports.sendEmailToResetPassword = sendEmailToResetPassword;
const verifyToken = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = req.query.token;
        const isValid = (0, handleJwt_1.verifyJwt)(token);
        console.log((0, formatExpJwt_1.formatExpiration)(isValid === null || isValid === void 0 ? void 0 : isValid.exp));
        if (!isValid) {
            (0, httpError_1.httpError)(res, 'El link no es valido o expiró porfavor repita el proceso');
            return;
        }
        res.json(true);
    }
    catch (err) {
        console.log(err);
        (0, httpError_1.httpError)(res, 'ERROR_EN_VERIFY_TOKEN', 403);
    }
});
exports.verifyToken = verifyToken;
const resetPassword = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let password = req.body.password;
        const token = req.headers.authorization.split(' ')[1];
        if (!token) {
            (0, httpError_1.httpError)(res, 'A ocurrido un error porfavor repita el proceso');
            return;
        }
        const userId = (0, handleJwt_1.verifyJwt)(token).id;
        if (!userId) {
            (0, httpError_1.httpError)(res, 'El enlace no es valido o expiró porfavor repita el proceso');
            return;
        }
        console.log(userId);
        const salt = yield bcrypt.genSalt(15);
        password = yield bcrypt.hash(password, salt);
        const op = yield (0, config_1.doQuery)(`UPDATE users SET password = ? WHERE id = ?;`, [password, userId]);
        console.log(op);
        res.json(true);
    }
    catch (err) {
        console.log(err);
        (0, httpError_1.httpError)(res, 'ERROR_EN_VERIFY_TOKEN', 403);
    }
});
exports.resetPassword = resetPassword;
