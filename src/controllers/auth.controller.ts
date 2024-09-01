import { Body, Controller, Get, Post, Res, Req, UseGuards, UseInterceptors, UploadedFile, UploadedFiles } from '@nestjs/common';
import { FileFieldsInterceptor, FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/gaurd/auth.guard';
import { RolesGuard } from 'src/gaurd/permission.guard';
import { Roles } from 'src/gaurd/role.decorator';
import { AuthService } from 'src/use-cases/auth/auth.service';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) { }

    @Post("/upload")
    @UseInterceptors(FileInterceptor("image"))

    async upload(@UploadedFile() file: Express.Multer.File) {
        console.log(file)
    }

    @Post("/register")
    // @UseInterceptors(FileInterceptor("profile"))
    async register(@UploadedFile() file, @Body() body, @Req() req, @Res() res) {
        return this.authService.register(body, res, file)
    }
    @Post("/login")
    async login(@Body() body, @Res() res, @Req() req) {
        return this.authService.login(res, body)
    }
    @Get("/get-profile")
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("user", "admin")
    async getProfile(@Req() req, @Res() res) {
        return this.authService.getProfile(req, res)
    }
    @Post("/update-user-profile")
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("user")
    @UseInterceptors(FileInterceptor("profile"))
    async updateUserProfile(@UploadedFile() file, @Body() body, @Req() req, @Res() res) {
        return this.authService.updateProfile(body, res, file, req)
    }
    @Post("/verify-profile")
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("user", "admin")
    @UseInterceptors(FileFieldsInterceptor([
        { name: 'front_img', maxCount: 1 },
        { name: 'back_img', maxCount: 1 },
    ]))
    async verifyProfile(@Body() body, @Req() req, @Res() res, @UploadedFiles() files: { front_img: Express.Multer.File[], back_img: Express.Multer.File[] }) {
        return this.authService.verifyProfile(files, req, res, body);
    }
    @Get("get-all-users")
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("admin")
    async getAllUser(@Res() res) {
        return this.authService.getAllUser(res)
    }


    @Post("/change-password")
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("user", "admin")
    async changePassword(@Body() body, @Req() req, @Res() res) {
        return this.authService.changePassword(body, req, res)
    }
    @Get("/logout")
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("user", "admin")
    async logout(@Req() req) {
        return this.authService.logout(req)
    }
    @Get("/captch")
    async captch(@Req() req, @Res() res) {
        return this.authService.captch(req, res)
    }
}
