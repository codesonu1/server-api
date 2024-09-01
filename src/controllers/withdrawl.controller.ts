import { Body, Controller, Post, Req, Res, UseGuards } from "@nestjs/common";
import { AuthGuard } from "src/gaurd/auth.guard";
import { RolesGuard } from "src/gaurd/permission.guard";
import { Roles } from "src/gaurd/role.decorator";
import { WithdrawlService } from "src/use-cases/withdrawl/withdrawl.service";

@Controller("withdrwal")

export class WithdrawlController {
    constructor(private readonly withdrawlService: WithdrawlService) { }
    @Post("/credit-coin")
    @UseGuards(AuthGuard, RolesGuard)
    @Roles("user")
    async withdrawlCoin(@Body() body, @Req() req, @Res() res) {
        return this.withdrawlService.withdrawlCoins(body, req, res)
    }


}