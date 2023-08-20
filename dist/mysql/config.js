"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.doQuery = exports.poolConnection = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
const dbUri = 'mysql://vps3_admin:Contrasenacss3@149.50.129.17:3306/vps3_deli';
const pool = mysql2_1.default.createPool({
    connectionLimit: 10,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    port: Number(process.env.DB_PORT),
    host: process.env.DB_HOST,
    database: process.env.DB_NAME
});
// CREATE USER 'vps3_admin'@'190.220.19.48' IDENTIFIED BY '12345678';
// GRANT ALL PRIVILEGES ON *.* TO 'vps3_admin'@'190.220.19.48' WITH GRANT OPTION;
const poolConnection = () => {
    pool.getConnection((err) => {
        if (err) {
            console.log(err);
        }
        else {
            console.log("R");
        }
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
