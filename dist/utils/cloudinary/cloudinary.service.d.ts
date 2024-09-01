import { UploadApiResponse, UploadApiErrorResponse } from 'cloudinary';
export declare class CloudinaryService {
    constructor();
    uploadImage(filepath: Express.Multer.File): Promise<UploadApiResponse | UploadApiErrorResponse>;
}
