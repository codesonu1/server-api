"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const modelService_1 = require("../../helper/modelService");
const clientResponse_1 = require("../../utils/clientResponse");
const cloudinary_service_1 = require("../../utils/cloudinary/cloudinary.service");
let NetworkService = class NetworkService {
    constructor(networkModel, cloudinaryService) {
        this.networkModel = networkModel;
        this.cloudinaryService = cloudinaryService;
    }
    async getAllNetworks() {
        try {
            const result = await modelService_1.modelService.FindAll(this.networkModel);
            console.log({ result });
            return clientResponse_1.clientResponse.success({ data: result, count: result.length });
        }
        catch (error) {
            console.error(error);
        }
    }
    async addNetwork({ network_name, wallet_address }, res, files) {
        try {
            const isExist = await modelService_1.modelService.FindOne(this.networkModel, { wallet_address: wallet_address });
            if (isExist) {
                return res.send(clientResponse_1.clientResponse.other(400, 'wallet address already exist'));
            }
            else {
                const result = await this.cloudinaryService.uploadImage(files);
                const response = await modelService_1.modelService.Created(this.networkModel, { network_name, wallet_address, wallet_img: result.secure_url });
                return res.send(clientResponse_1.clientResponse.other(200, { msg: 'network added successfully', data: response }));
            }
        }
        catch (error) {
            console.error(error);
        }
    }
    async deleteNetwork(body, res) {
        try {
            await modelService_1.modelService.DeleteOne(this.networkModel, { _id: body._id });
            return res.send(clientResponse_1.clientResponse.success("Deleted Successfully"));
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.NetworkService = NetworkService;
exports.NetworkService = NetworkService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)("Network")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        cloudinary_service_1.CloudinaryService])
], NetworkService);
//# sourceMappingURL=network.service.js.map