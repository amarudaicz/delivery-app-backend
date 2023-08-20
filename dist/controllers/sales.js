"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSales = exports.postSale = void 0;
const config_1 = require("../mysql/config");
const formatDate_1 = require("../utils/formatDate");
const httpError_1 = require("../utils/httpError");
const postSale = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id: local_id, ammount } = req.body;
        const date = (0, formatDate_1.formatDate)(new Date());
        const data = yield (0, config_1.doQuery)(`INSERT INTO sales (local_id, date, ammount) VALUES (?, ?, ?)`, [local_id, date, ammount]);
        console.log(data);
        console.log(date);
        res.send("ok");
    }
    catch (error) {
        (0, httpError_1.httpError)(res, error);
    }
});
exports.postSale = postSale;
const getSales = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { local_id } = req.user;
        console.log(req.user);
        // Query to get visits grouped by date
        const query = `
            SELECT date, SUM(amount) as ammount, count(*) as total_sales
            FROM sales
            WHERE local_id = ?
            GROUP BY date; `;
        const sales = yield (0, config_1.doQuery)(query, [local_id]);
        console.log(sales);
        if (!sales.length) {
            res.send('No se registraron ventas');
            return;
        }
        const formatSales = fillMissingDays(sales.map((row) => ({
            date: (0, formatDate_1.formatDate)(row.date),
            ammount: Number(row.ammount),
            total_sales: row.total_sales,
        }))).slice(-31);
        res.json(formatSales);
    }
    catch (err) {
        console.log(err);
    }
});
exports.getSales = getSales;
function fillMissingDays(dataArray) {
    const sortedArray = dataArray.sort((a, b) => a.date.localeCompare(b.date));
    const resultArray = [];
    const startDate = new Date(sortedArray[0].date);
    const endDate = new Date(sortedArray[sortedArray.length - 1].date);
    for (let currentDate = startDate; currentDate <= endDate; currentDate.setDate(currentDate.getDate() + 1)) {
        const dateString = currentDate.toISOString().split("T")[0];
        const existingData = sortedArray.find((item) => item.date === dateString);
        if (existingData) {
            resultArray.push(existingData);
        }
        else {
            resultArray.push({ date: dateString, ammount: 0, total_sales: 0 });
        }
    }
    return resultArray;
}
