import { Body, Controller, Get, Post, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/gaurd/auth.guard';
import { RolesGuard } from 'src/gaurd/permission.guard';
import { Roles } from 'src/gaurd/role.decorator';
import { NetworkService } from 'src/use-cases/network/network.service';
import { CloudinaryService } from 'src/utils/cloudinary/cloudinary.service';

@Controller('network')
export class NetworkController {
    constructor(private readonly networkService: NetworkService
    ) { }
    @Get("get-all-neworks")
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("admin", "user")
    async getAllNetworks() {
        return await this.networkService.getAllNetworks()
    }
    @Post("add-network")
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("admin")
    @UseInterceptors(FileInterceptor("networkImg"))
    async addNetwork(@UploadedFile() files, @Body() body, @Res() res) {

        return await this.networkService.addNetwork(body, res, files)
    }
    @Post("delete-nework")
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("admin")
    async deleteNetwork(@Body() body, @Res() res) {
        return await this.networkService.deleteNetwork(body, res)
    }
}
