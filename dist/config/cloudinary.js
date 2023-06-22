"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cloudConfig = void 0;
const cloudinary_1 = __importDefault(require("cloudinary"));
// Configuracion Cloudinary
function cloudConfig() {
    const config = {
        cloud_name: process.env.CLOUD_NAME_CLOUDINARY,
        api_key: process.env.API_KEY_CLOUDINARY,
        api_secret: process.env.SECRET_CLOUDINARY
    };
    cloudinary_1.default.v2.config(config);
    console.log('Cloud-In-Line');
}
exports.cloudConfig = cloudConfig;
