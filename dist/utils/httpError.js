"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.httpError = void 0;
const httpError = (res, message, code) => {
    res.status(code);
    res.json({ error: message });
};
exports.httpError = httpError;
