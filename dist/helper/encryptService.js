"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.encryptService = void 0;
var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
require('dotenv').config();
exports.encryptService = {
    HashPassword: async (password) => {
        return await bcrypt.hash(password, 11);
    },
    ComparePassword: (password, hashPassword) => {
        return bcrypt.compareSync(password, hashPassword);
    },
    GenerateToken: async (paload, key, time) => {
        return await jwt.sign(paload, key, { expiresIn: time });
    },
    JwtSign: (payload, key, time) => {
        return jwt.sign(payload, key, time);
    },
    JwtVerify: (token, key) => {
        return jwt.verify(token, key);
    }
};
//# sourceMappingURL=encryptService.js.map