"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = void 0;
const express_1 = __importDefault(require("express"));
const sales_1 = require("../controllers/sales");
const checkToken_1 = require("../middleware/checkToken");
const router = (0, express_1.default)();
exports.router = router;
router.get('/', checkToken_1.checkTokenStrict, sales_1.getSales);
router.post('/', sales_1.postSale);
