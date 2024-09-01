const dotenv = require('dotenv').config()
export const DEV_PORT = {
    port: process.env.PORT || 3000 as Number
}
export const MONGO_URI: any = {
    uri: process.env.MONGO_URI

}
export const SALT_ROUNDS: any = {
    salt: process.env.SALT_ROUNDS
}
export const JWT_SECRET: any = {
    secret: process.env.JWT_SECRET
}
export const JWT_EXPIRES: any = {
    expires: process.env.EXPIRE_INTERVAL
}

export const CLOUDINARY_NAME: any = {
    cloud_name: process.env.CLOUDINARY_NAME
}
 

export const CLOUDINARY_API_KEY: any = {
    api_key: process.env.CLOUDINARY_API_KEY
}

export const CLOUDINARY_API_SECRET: any = {
    api_secret: process.env.CLOUDINARY_API_SECRET
}

