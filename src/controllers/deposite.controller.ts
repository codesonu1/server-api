import { Body, Controller, Get, Post, Req, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/gaurd/auth.guard';
import { RolesGuard } from 'src/gaurd/permission.guard';
import { Roles } from 'src/gaurd/role.decorator';
import { DepositeService } from 'src/use-cases/deposite/deposite.service';

@Controller('deposite')
export class DepositeController {
    constructor(private readonly depositeService: DepositeService) { }

    @Get("get-all-deposite-coin")
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("user", "admin")
    async getAllDepositeCoin(@Res() res) {
        return this.depositeService.getAllUserDespositeCoin(res)
    }

    @Post("deposite-coin")
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("user")
    @UseInterceptors(FileInterceptor("voucher_img"))
    async depositeCoin(@Body() body, @Res() res, @UploadedFile() files, @Req() req) {
        return await this.depositeService.depositeCoin(body, res, files, req)
    }
    @Post("deposite-coin-verify")
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("admin")
    async depositeCoinVerify(@Body() body, @Res() res) {
        return await this.depositeService.coinDepositeVerify(body, res)
    }
    @Get("deposite-coin-bills")
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("user", "admin")
    async getAllCoinDepositeCoin(@Res() res) {
        return await this.depositeService.getAllDepositeCoinBill(res)
    }

    @Post("add-address")
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("user")
    async addAddress(@Body() body, @Res() res, @Req() req) {
        return await this.depositeService.addAddress(body, res, req)
    }
    @Post("get-all-address")
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("user", "admin")
    async getAllAddress(@Res() res) {
        return await this.depositeService.getAllAddress(res)
    }
}
