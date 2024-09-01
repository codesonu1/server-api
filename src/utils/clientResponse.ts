import { enumnation } from "../config/enumnation"

export const clientResponse = {
    success: (payload) => {
        return {
            status: enumnation.SUCCESS,
            data: payload
        }
    }
    ,
    error: (error) => {
        return {
            status: enumnation.NOTFOUND,
            error: error
        }
    },
    other: (status, msg): any => {
        return {
            status: status,
            msg: msg
        }
    }
}