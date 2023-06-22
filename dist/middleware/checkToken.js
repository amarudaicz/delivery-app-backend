"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkToken = exports.checkTokenStrict = void 0;
const handleJwt_1 = require("../utils/handleJwt");
const httpError_1 = require("../utils/httpError");
function checkTokenStrict(req, res, next) {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token) {
        return (0, httpError_1.httpError)(res, 'Not token', 403);
    }
    try {
        const decoded = (0, handleJwt_1.verifyJwt)(token);
        if (decoded) {
            req.user = decoded; // Aquí agregamos el payload decodificado a la solicitud
            next();
        }
        else {
            return (0, httpError_1.httpError)(res, 'Token not valid', 403);
        }
    }
    catch (err) {
        return (0, httpError_1.httpError)(res, 'Token not valid', 403);
    }
}
exports.checkTokenStrict = checkTokenStrict;
function checkToken(req, res, next) {
    var _a;
    const token = (_a = req.headers['authorization']) === null || _a === void 0 ? void 0 : _a.split(' ')[1];
    if (!token)
        return next();
    const decoded = (0, handleJwt_1.verifyJwt)(token);
    req.user = decoded; // agregamos el payload decodificado a la solicitud
    next();
}
exports.checkToken = checkToken;
