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
exports.getStats = exports.postView = void 0;
const config_1 = require("../mysql/config");
const formatDate_1 = require("../utils/formatDate");
const postView = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const local_id = req.body.id;
    const date = (0, formatDate_1.formatDate)(new Date());
    const data = yield (0, config_1.doQuery)(`INSERT INTO stats (local_id, date) VALUES (?, ?)`, [local_id, date]);
    console.log(data);
    console.log(date);
    res.send(data);
});
exports.postView = postView;
const getStats = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { local_id } = req.user;
    console.log(local_id);
    try {
        // Query to get visits grouped by date
        const query = `
        SELECT date, COUNT(*) as total_visits
        FROM stats
        WHERE local_id = ?
        GROUP BY date
      `;
        const data = yield (0, config_1.doQuery)(query, [local_id]);
        if (!data.length) {
            res.send('No existen registros');
            return;
        }
        // Format the results to include date and total_visits
        const formatData = fillMissingDays(data.map((row) => ({
            date: (0, formatDate_1.formatDate)(row.date),
            total_visits: row.total_visits,
        }))).slice(-31);
        res.json(formatData);
    }
    catch (error) {
        console.error("Error while fetching statistics:", error);
        res.status(500).json({ error: "Error while fetching statistics." });
    }
});
exports.getStats = getStats;
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
            resultArray.push({ date: dateString, total_visits: 0 });
        }
    }
    return resultArray;
}
