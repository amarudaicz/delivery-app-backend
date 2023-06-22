"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doQuery = exports.poolConnection = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const pool = mysql2_1.default.createPool({
    connectionLimit: 10,
    user: 'root',
    password: '',
    host: 'localhost',
    database: 'deli_app',
});
const poolConnection = () => {
    pool.getConnection((err) => {
        if (err) {
            console.log(err);
        }
        console.log('R');
    });
};
exports.poolConnection = poolConnection;
const doQuery = (query, data) => {
    return new Promise((resolve, reject) => {
        const formatQuery = mysql2_1.default.format(query, data);
        pool.query(formatQuery, (error, results, fields) => {
            if (error)
                return reject(error); // <- se rechaza la promesa y se pasa el motivo
            resolve(results); // <- se resuelve la Promesa y se pasa el resultado
        });
    });
};
exports.doQuery = doQuery;
(0, exports.poolConnection)();
