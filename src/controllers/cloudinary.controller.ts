import { Controller, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CloudinaryService } from 'src/utils/cloudinary/cloudinary.service';

@Controller('images')
export class CloudinaryController {

    constructor(private readonly cloudinaryService: CloudinaryService) { }

    @Post("upload")
    @UseInterceptors(FileInterceptor("img"))
    async uploadImage(@UploadedFile() file) {
        try {
            console.log(file)
            const result = await this.cloudinaryService.uploadImage(file.path);
            return result;
        } catch (error) {
            console.error(error)
            console.log("Faild to upload file")
        }


    }
}
