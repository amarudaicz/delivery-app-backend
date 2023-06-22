"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.cleanUser = void 0;
const cleanUser = (user) => {
    const props = ['password', 'local_id', 'admin_table', 'admin'];
    for (let prop of props) {
        delete user[prop];
    }
    return user;
};
exports.cleanUser = cleanUser;
