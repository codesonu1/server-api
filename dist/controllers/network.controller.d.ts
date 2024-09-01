import { NetworkService } from 'src/use-cases/network/network.service';
export declare class NetworkController {
    private readonly networkService;
    constructor(networkService: NetworkService);
    getAllNetworks(): Promise<{
        status: number;
        data: any;
    }>;
    addNetwork(files: any, body: any, res: any): Promise<any>;
    deleteNetwork(body: any, res: any): Promise<any>;
}
