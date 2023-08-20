"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formatExpiration = void 0;
function formatExpiration(exp) {
    const expMilliseconds = exp * 1000;
    const expirationDate = new Date(expMilliseconds);
    const formattedExpiration = expirationDate.toLocaleString();
    return formattedExpiration;
}
exports.formatExpiration = formatExpiration;
