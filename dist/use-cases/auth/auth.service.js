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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const configuration_1 = require("../../config/configuration");
const add_user_schema_1 = require("../../core/dtos/models/add_user.schema");
const encryptService_1 = require("../../helper/encryptService");
const modelService_1 = require("../../helper/modelService");
const clientResponse_1 = require("../../utils/clientResponse");
const cloudinary_service_1 = require("../../utils/cloudinary/cloudinary.service");
var svgCaptcha = require('svg-captcha');
let AuthService = class AuthService {
    constructor(userModel, profileVerifyModel, cloudinaryService) {
        this.userModel = userModel;
        this.profileVerifyModel = profileVerifyModel;
        this.cloudinaryService = cloudinaryService;
    }
    async register(body, res, files) {
        try {
            const { account, fullName, password, country } = body;
            if (!body) {
                return res.send(clientResponse_1.clientResponse.other(400, 'all fields are required'));
            }
            if (password.length < 6) {
                return res.send(clientResponse_1.clientResponse.other(400, 'password must be at least 6 characters'));
            }
            const isExist = await modelService_1.modelService.FindOne(this.userModel, { account: account });
            if (isExist) {
                return res.send(clientResponse_1.clientResponse.other(400, 'account already exist'));
            }
            else {
                const created_users = await modelService_1.modelService.Created(this.userModel, {
                    account: account,
                    country: country,
                    fullName: fullName,
                    password: await encryptService_1.encryptService.HashPassword(password)
                });
                return res.send(clientResponse_1.clientResponse.success(created_users));
            }
        }
        catch (error) {
            res.send(clientResponse_1.clientResponse.error(error));
        }
    }
    async login(res, { account, password }) {
        try {
            if (!account || !password) {
                return res.send(clientResponse_1.clientResponse.other(400, 'account and password cannot match with our database.'));
            }
            let isVaild = await modelService_1.modelService.FindOne(this.userModel, { account: account });
            if (isVaild) {
                if (await encryptService_1.encryptService.ComparePassword(password, isVaild.password)) {
                    const token = await encryptService_1.encryptService.GenerateToken({ _id: isVaild._id, role: isVaild.role }, configuration_1.JWT_SECRET.secret, configuration_1.JWT_EXPIRES.expires);
                    isVaild = await modelService_1.modelService.Update(this.userModel, { _id: isVaild._id }, { last_login_time: new Date(), token: token, created_at: new Date() });
                    return res.send(clientResponse_1.clientResponse.success({
                        token,
                        expire_in: configuration_1.JWT_EXPIRES.expires,
                        user: await modelService_1.modelService.FindOne(this.userModel, { _id: isVaild._id }, { password: 0 })
                    }));
                }
                else {
                    return res.send(clientResponse_1.clientResponse.other(400, 'Invalid credentials'));
                }
            }
            else {
                return res.send(clientResponse_1.clientResponse.other(400, 'Invalid credentials'));
            }
        }
        catch (error) {
            console.log(error);
            res.send(clientResponse_1.clientResponse.error(error));
        }
    }
    async getProfile(req, res) {
        try {
            const data = await modelService_1.modelService.FindOne(this.userModel, { _id: req.user_id });
            return res.send(clientResponse_1.clientResponse.success(data));
        }
        catch (error) {
            console.log(error);
        }
    }
    async changePassword({ currentPassword, newPassword, comfirmPassword }, req, res) {
        try {
            if (currentPassword === "" || newPassword === "" || comfirmPassword === "") {
                res.send(clientResponse_1.clientResponse.other(200, "All Feild are required!"));
            }
            console.log({ currentPassword, newPassword, comfirmPassword });
            const isLoginUser = await modelService_1.modelService.FindOne(this.userModel, { _id: req.user_id });
            if (isLoginUser) {
                if (await encryptService_1.encryptService.ComparePassword(currentPassword, isLoginUser.password)) {
                    if (newPassword === comfirmPassword) {
                        const newEncryptPassword = await encryptService_1.encryptService.HashPassword(newPassword);
                        await modelService_1.modelService.Update(this.userModel, { _id: isLoginUser?._id }, { password: newEncryptPassword });
                        console.log({ newEncryptPassword });
                        return res.send(clientResponse_1.clientResponse.success({ msg: "Password Changed Sucessfully!" }));
                    }
                }
                else {
                    res.send(clientResponse_1.clientResponse.other(404, "Current Password doesnot Match Our Records"));
                }
            }
        }
        catch (error) {
            console.log(error);
        }
    }
    async logout(req) {
        try {
            console.log(req.user_id, "req.user_id");
            await modelService_1.modelService.Update(this.userModel, { _id: req.user_id }, { last_logout_time: new Date(), token: '', });
            return clientResponse_1.clientResponse.success({ msg: "User logout successfully!" });
        }
        catch (error) {
            console.log(error);
            clientResponse_1.clientResponse.error(error);
        }
    }
    async verifyProfile(files, req, res, body) {
        try {
            console.log(body.verification_type);
            const isValidUser = await modelService_1.modelService.FindOne(this.userModel, { _id: req.user_id });
            if (isValidUser.kyc_status == false) {
                const front_imgURL = await this.cloudinaryService.uploadImage(files.front_img[0]);
                const back_imgURL = await this.cloudinaryService.uploadImage(files.back_img[0]);
                console.log(front_imgURL, back_imgURL);
                await modelService_1.modelService.Created(this.profileVerifyModel, {
                    userId: req.user_id,
                    verification_type: body.verification_type,
                    front_img: front_imgURL.secure_url,
                    back_img: back_imgURL.secure_url,
                });
                console.log("created table");
                await modelService_1.modelService.Update(this.userModel, { _id: req.user_id }, { kyc_status: true });
                console.log("update user");
                res.send(clientResponse_1.clientResponse.success({ msg: "KYC updates successfully" }));
            }
            else {
                res.send(clientResponse_1.clientResponse.other(208, "KYC updated already!"));
            }
        }
        catch (error) {
        }
    }
    async getAllUser(res) {
        try {
            return res.send(clientResponse_1.clientResponse.success(await modelService_1.modelService.FindAll(this.userModel)));
        }
        catch (error) {
            console.log(error);
        }
    }
    async updateProfile(body, res, files, req) {
        try {
            const { firstName, middleName, lastName, DOB, address } = body;
            if (!body) {
                return res.send(clientResponse_1.clientResponse.other(400, 'all fields are required'));
            }
            const isExist = await modelService_1.modelService.FindOne(this.userModel, { _id: req.user_id });
            console.log({
                isExist, _id: req.user_id, x: isExist
            });
            if (!!isExist) {
                console.log("i am here!");
                console.log({ firstName, middleName, lastName, DOB, address, files }, "hello");
                const result = await this.cloudinaryService.uploadImage(files);
                await modelService_1.modelService.UpdateById(this.userModel, { _id: req.user_id }, {
                    firstName,
                    middleName: middleName || "",
                    lastName,
                    DOB,
                    address,
                    account: isExist?.account,
                    country: isExist?.country,
                    currency: isExist?.currency,
                    profile_img: result?.secure_url,
                });
                return res.send(clientResponse_1.clientResponse.success("Your Profile update successdully!"));
            }
            else {
                return res.send(clientResponse_1.clientResponse.other(400, ' You cannot update your profile beacuse email address doesnot match our database!'));
            }
        }
        catch (error) {
            res.send(clientResponse_1.clientResponse.error(error));
        }
    }
    async captch(req, res) {
        try {
            var captcha = svgCaptcha.create();
            console.log({ captcha });
            return clientResponse_1.clientResponse.success({ msg: "captcha" });
        }
        catch (error) {
            console.log(error);
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(add_user_schema_1.User.name)),
    __param(1, (0, mongoose_1.InjectModel)("VerifyUserProfile")),
    __metadata("design:paramtypes", [mongoose_2.Model,
        mongoose_2.Model,
        cloudinary_service_1.CloudinaryService])
], AuthService);
//# sourceMappingURL=auth.service.js.map