import { WithdrawlService } from "src/use-cases/withdrawl/withdrawl.service";
export declare class WithdrawlController {
    private readonly withdrawlService;
    constructor(withdrawlService: WithdrawlService);
    withdrawlCoin(body: any, req: any, res: any): Promise<void>;
}
