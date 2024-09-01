"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CLOUDINARY_API_SECRET = exports.CLOUDINARY_API_KEY = exports.CLOUDINARY_NAME = exports.JWT_EXPIRES = exports.JWT_SECRET = exports.SALT_ROUNDS = exports.MONGO_URI = exports.DEV_PORT = void 0;
const dotenv = require('dotenv').config();
exports.DEV_PORT = {
    port: process.env.PORT || 3000
};
exports.MONGO_URI = {
    uri: process.env.MONGO_URI
};
exports.SALT_ROUNDS = {
    salt: process.env.SALT_ROUNDS
};
exports.JWT_SECRET = {
    secret: process.env.JWT_SECRET
};
exports.JWT_EXPIRES = {
    expires: process.env.EXPIRE_INTERVAL
};
exports.CLOUDINARY_NAME = {
    cloud_name: process.env.CLOUDINARY_NAME
};
exports.CLOUDINARY_API_KEY = {
    api_key: process.env.CLOUDINARY_API_KEY
};
exports.CLOUDINARY_API_SECRET = {
    api_secret: process.env.CLOUDINARY_API_SECRET
};
//# sourceMappingURL=configuration.js.map