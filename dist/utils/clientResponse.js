"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientResponse = void 0;
const enumnation_1 = require("../config/enumnation");
exports.clientResponse = {
    success: (payload) => {
        return {
            status: enumnation_1.enumnation.SUCCESS,
            data: payload
        };
    },
    error: (error) => {
        return {
            status: enumnation_1.enumnation.NOTFOUND,
            error: error
        };
    },
    other: (status, msg) => {
        return {
            status: status,
            msg: msg
        };
    }
};
//# sourceMappingURL=clientResponse.js.map