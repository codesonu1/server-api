import { Body, Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/gaurd/auth.guard';
import { RolesGuard } from 'src/gaurd/permission.guard';
import { Roles } from 'src/gaurd/role.decorator';
import { TradeService } from 'src/use-cases/trade/trade.service';

@Controller('trade')

export class TradeController {
    constructor(private readonly tradeService: TradeService) { }
    @Post('buy')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("user")
    async buyTrade(@Body() body, @Req() req, @Res() res) {
        return this.tradeService.buyTradeNow(body, req, res)
    }
    @Get('get-all-buying-trades')
    // @UseGuards(AuthGuard, RolesGuard)
    // @Roles("admin")
    async getAllbuysTrade(@Body() body, @Req() req, @Res() res) {
        return this.tradeService.getAllBuyTrade(res)
    }
    @Post('upgrade-buy-trade')
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("admin")
    async upgradeBuyingTrade(@Body() body, @Req() req, @Res() res) {
        return this.tradeService.updateBuyingTrade(body, res)
    }

    @Post('sell')
    async sellTrade() {
        return "this is sell sectio!"
    }
}
