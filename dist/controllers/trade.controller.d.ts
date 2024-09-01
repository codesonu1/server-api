import { TradeService } from 'src/use-cases/trade/trade.service';
export declare class TradeController {
    private readonly tradeService;
    constructor(tradeService: TradeService);
    buyTrade(body: any, req: any, res: any): Promise<void>;
    getAllbuysTrade(body: any, req: any, res: any): Promise<void>;
    upgradeBuyingTrade(body: any, req: any, res: any): Promise<void>;
    sellTrade(): Promise<string>;
}
