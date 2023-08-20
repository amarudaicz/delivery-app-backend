"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyJwt = exports.signJwt = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signJwt = (payload, expires = '28d') => {
    return jsonwebtoken_1.default.sign(payload, process.env.SECRET_JWT, { expiresIn: expires });
};
exports.signJwt = signJwt;
const verifyJwt = (token) => {
    try {
        return jsonwebtoken_1.default.verify(token, process.env.SECRET_JWT);
    }
    catch (err) {
        return null;
    }
};
exports.verifyJwt = verifyJwt;
