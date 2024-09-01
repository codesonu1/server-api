var bcrypt = require('bcrypt');
var jwt = require('jsonwebtoken');
import { SALT_ROUNDS } from "src/config/configuration";
require('dotenv').config()
export const encryptService = {
    HashPassword: async (password) => {
        return await bcrypt.hash(password, 11)
    },
    ComparePassword: (password, hashPassword) => {
        return bcrypt.compareSync(password, hashPassword)
    },
    GenerateToken: async (paload, key, time) => {
        return await jwt.sign(paload, key, { expiresIn: time })
    },
    JwtSign: (payload, key, time) => {
        return jwt.sign(payload, key, time)
    },
    JwtVerify: (token, key) => {
        return jwt.verify(token, key);
    }
}