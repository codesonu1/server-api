import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { AddNetwork } from 'src/core/dtos/models/add_network.schema';
import { modelService } from 'src/helper/modelService';
import { clientResponse } from 'src/utils/clientResponse';
import { CloudinaryService } from 'src/utils/cloudinary/cloudinary.service';

@Injectable()
export class NetworkService {
    constructor(@InjectModel("Network") private readonly networkModel: Model<AddNetwork>,
        private readonly cloudinaryService: CloudinaryService
    ) { }

    async getAllNetworks() {
        try {
            const result = await modelService.FindAll(this.networkModel);
            console.log({ result })
            return clientResponse.success({ data: result, count: result.length })
        } catch (error) {
            console.error(error)
        }
    }
    async addNetwork({ network_name, wallet_address }, res, files) {
        try {
            const isExist = await modelService.FindOne(this.networkModel, { wallet_address: wallet_address });
            if (isExist) {
                return res.send(clientResponse.other(400, 'wallet address already exist'))
            } else {
                const result = await this.cloudinaryService.uploadImage(files)
                const response = await modelService.Created(this.networkModel, { network_name, wallet_address, wallet_img: result.secure_url });
                return res.send(clientResponse.other(200, { msg: 'network added successfully', data: response }))
            }

        } catch (error) {
            console.error(error)
        }
    }
    async deleteNetwork(body, res) {
        try {
            await modelService.DeleteOne(this.networkModel, { _id: body._id })
            return res.send(clientResponse.success("Deleted Successfully"))
        } catch (error) {
            console.log(error)
        }
    }
}
