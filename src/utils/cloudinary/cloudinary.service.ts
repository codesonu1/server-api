import { Injectable } from '@nestjs/common';
import { v2 as cloudinary, UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
import { CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET, CLOUDINARY_NAME } from 'src/config/configuration';

@Injectable()
export class CloudinaryService {
    constructor() {

        cloudinary.config({
            cloud_name: CLOUDINARY_NAME.cloud_name,
            api_key: CLOUDINARY_API_KEY.api_key,
            api_secret: CLOUDINARY_API_SECRET.api_secret
        });
    }

    async uploadImage(filepath: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse> {
        return new Promise((resolve, reject) => {
            // cloudinary.uploader.upload(filepath.filename).then((result) => {

            // })

            cloudinary.uploader.upload_stream((error, uploadResult) => {
                return resolve(uploadResult);
            }).end(filepath.buffer);


            // cloudinary.uploader.upload(base64Image).then((result) => {
            //     console.log({ result })
            //     resolve(result)
            // }).catch((error) => {
            //     console.log({ error })
            //     reject(error)
            // })
        })
    }
}
