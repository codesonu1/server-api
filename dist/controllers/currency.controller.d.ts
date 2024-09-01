import { CurrenyService } from 'src/use-cases/currency/curreny.service';
export declare class CurrencyController {
    private readonly currenyService;
    constructor(currenyService: CurrenyService);
    getCurrency(res: any): Promise<any>;
    postCurrency(body: any, res: any): Promise<any>;
    addUserProfitPercentage(body: any, res: any): Promise<any>;
}
