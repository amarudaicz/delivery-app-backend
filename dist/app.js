"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
require("dotenv/config");
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const cloudinary_1 = require("./config/cloudinary");
const routes_1 = require("./routes");
const path_1 = __importDefault(require("path"));
const envFilePath = path_1.default.resolve(__dirname, '../.env');
dotenv_1.default.config({ path: envFilePath });
(0, cloudinary_1.cloudConfig)();
const PORT = process.env.PORT || 3001;
exports.app = (0, express_1.default)();
exports.app.use((0, cors_1.default)());
exports.app.use((0, cookie_parser_1.default)());
exports.app.use(body_parser_1.default.json());
exports.app.use(body_parser_1.default.urlencoded({ extended: false, }));
exports.app.use((0, morgan_1.default)('dev'));
exports.app.use(routes_1.router);
exports.app.listen(PORT, () => {
    console.log('app listen on port ' + PORT);
});
