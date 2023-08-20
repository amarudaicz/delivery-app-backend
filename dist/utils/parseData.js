"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.parseJson = void 0;
const parseJson = (data) => {
    if (!data)
        return null;
    return JSON.parse(data);
};
exports.parseJson = parseJson;
