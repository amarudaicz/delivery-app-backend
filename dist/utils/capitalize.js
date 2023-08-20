"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.capitalize = void 0;
const capitalize = (capitalizeAll, camposACapitalizar) => {
    return function (req, res, next) {
        if (capitalizeAll) {
            for (const campo in req.body) {
                if (typeof req.body[campo] === 'string') {
                    req.body[campo] = formatString(req.body[campo]);
                }
            }
        }
        else if (camposACapitalizar && Array.isArray(camposACapitalizar)) {
            for (const campo of camposACapitalizar) {
                if (typeof req.body[campo] === 'string') {
                    req.body[campo] = formatString(req.body[campo]);
                }
            }
        }
        next();
    };
};
exports.capitalize = capitalize;
function formatString(word) {
    return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
}
