import { Body, Controller, Get, Post, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/gaurd/auth.guard';
import { RolesGuard } from 'src/gaurd/permission.guard';
import { Roles } from 'src/gaurd/role.decorator';
import { CurrenyService } from 'src/use-cases/currency/curreny.service';

@Controller('currency')
export class CurrencyController {

    constructor(private readonly currenyService: CurrenyService) { }

    /**
     * This endpoint is used to get the total number of currencies in the database
     * @returns {Promise<number>} The total number of currencies
    */
    @Get("/get-currencys")
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("user", "admin")
    async getCurrency(@Res() res): Promise<any> {
        return await this.currenyService.getCurrency(res);
    }
    @Post("/add-currency")
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("admin")
    async postCurrency(@Body() body, @Res() res) {
        return await this.currenyService.addCurrency(body, res);
    }
    @Post("/add-user-profit-percentage")
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("admin")
    async addUserProfitPercentage(@Body() body, @Res() res) {
        return await this.currenyService.addProfitPercentage(body, res);
    }
}
