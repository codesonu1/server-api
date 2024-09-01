import { Model } from 'mongoose';
import { AddNetwork } from 'src/core/dtos/models/add_network.schema';
import { CloudinaryService } from 'src/utils/cloudinary/cloudinary.service';
export declare class NetworkService {
    private readonly networkModel;
    private readonly cloudinaryService;
    constructor(networkModel: Model<AddNetwork>, cloudinaryService: CloudinaryService);
    getAllNetworks(): Promise<{
        status: number;
        data: any;
    }>;
    addNetwork({ network_name, wallet_address }: {
        network_name: any;
        wallet_address: any;
    }, res: any, files: any): Promise<any>;
    deleteNetwork(body: any, res: any): Promise<any>;
}
