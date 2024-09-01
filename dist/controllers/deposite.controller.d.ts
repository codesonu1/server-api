import { DepositeService } from 'src/use-cases/deposite/deposite.service';
export declare class DepositeController {
    private readonly depositeService;
    constructor(depositeService: DepositeService);
    getAllDepositeCoin(res: any): Promise<void>;
    depositeCoin(body: any, res: any, files: any, req: any): Promise<any>;
    depositeCoinVerify(body: any, res: any): Promise<any>;
    getAllCoinDepositeCoin(res: any): Promise<any>;
    addAddress(body: any, res: any, req: any): Promise<any>;
    getAllAddress(res: any): Promise<any>;
}
