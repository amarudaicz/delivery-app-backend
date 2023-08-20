"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpError = void 0;
const httpError = (res, message, code = 403) => {
    res.status(code);
    res.json(message);
};
exports.httpError = httpError;
