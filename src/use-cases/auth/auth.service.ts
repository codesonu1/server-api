import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'
import { Model } from 'mongoose'
import path from 'path'
import { JWT_EXPIRES, JWT_SECRET, MONGO_URI } from 'src/config/configuration'
import { User } from 'src/core/dtos/models/add_user.schema'
import { ProfileVerify, VerifyProfileSchema } from 'src/core/dtos/models/verify_user_profile.schema'
import { encryptService } from 'src/helper/encryptService'
import { modelService } from 'src/helper/modelService'
import { clientResponse } from 'src/utils/clientResponse'
import { CloudinaryService } from 'src/utils/cloudinary/cloudinary.service'
var svgCaptcha = require('svg-captcha');
@Injectable()
export class AuthService {
    constructor(
        @InjectModel(User.name) private readonly userModel: Model<User>,
        @InjectModel("VerifyUserProfile") private readonly profileVerifyModel: Model<ProfileVerify>,
        private readonly cloudinaryService: CloudinaryService,
    ) { }

    async register(body, res: any, files) {
        try {
            const { account, fullName, password, country } =
                body
            if (
                !body
            ) {
                return res.send(
                    clientResponse.other(400, 'all fields are required')
                )
            }

            if (password.length < 6) {
                return res.send(
                    clientResponse.other(
                        400,
                        'password must be at least 6 characters'
                    )
                )
            }

            const isExist = await modelService.FindOne(this.userModel, { account: account })
            if (isExist) {
                return res.send(clientResponse.other(400, 'account already exist'))
            } else {
                // const result = await this.cloudinaryService.uploadImage(files)
                const created_users = await modelService.Created(this.userModel, {

                    account: account,
                    country: country,
                    fullName: fullName,
                    // profile_img: result.secure_url,
                    // role: role,
                    password: await encryptService.HashPassword(password)
                })
                return res.send(clientResponse.success(created_users))
            }
        } catch (error) {
            res.send(clientResponse.error(error))
        }
    }


    async login(res, { account, password }) {
        try {
            if (
                !account || !password
            ) {
                return res.send(
                    clientResponse.other(400, 'account and password cannot match with our database.')
                )
            }
            let isVaild = await modelService.FindOne(this.userModel, { account: account })
            if (isVaild) {
                if (await encryptService.ComparePassword(password, isVaild.password)) {
                    const token = await encryptService.GenerateToken({ _id: isVaild._id, role: isVaild.role }, JWT_SECRET.secret, JWT_EXPIRES.expires)
                    isVaild = await modelService.Update(this.userModel, { _id: isVaild._id }, { last_login_time: new Date(), token: token, created_at: new Date() })
                    return res.send(clientResponse.success({
                        token,
                        expire_in: JWT_EXPIRES.expires,
                        user: await modelService.FindOne(this.userModel, { _id: isVaild._id }, { password: 0 })
                    }))
                } else {
                    return res.send(clientResponse.other(400, 'Invalid credentials'))
                }
            } else {
                return res.send(clientResponse.other(400, 'Invalid credentials'))
            }
        } catch (error) {
            console.log(error)
            res.send(clientResponse.error(error))

        }
    }

    async getProfile(req, res) {
        try {
            const data = await modelService.FindOne(this.userModel, { _id: req.user_id })
            return res.send(clientResponse.success(data))
        } catch (error) {
            console.log(error)
        }
    }
    async changePassword({ currentPassword, newPassword, comfirmPassword }, req, res) {
        try {
            if (currentPassword === "" || newPassword === "" || comfirmPassword === "") {
                res.send(clientResponse.other(200, "All Feild are required!"))
            }
            console.log({ currentPassword, newPassword, comfirmPassword })
            const isLoginUser = await modelService.FindOne(this.userModel, { _id: req.user_id })
            if (isLoginUser) {
                if (await encryptService.ComparePassword(currentPassword, isLoginUser.password)) {
                    if (newPassword === comfirmPassword) {
                        const newEncryptPassword = await encryptService.HashPassword(newPassword)
                        await modelService.Update(this.userModel, { _id: isLoginUser?._id }, { password: newEncryptPassword })
                        console.log({ newEncryptPassword })
                        return res.send(clientResponse.success({ msg: "Password Changed Sucessfully!" }))
                    }
                } else {
                    res.send(clientResponse.other(404, "Current Password doesnot Match Our Records"))
                }
            }

        } catch (error) {
            console.log(error)
        }
    }
    async logout(req) {

        try {
            console.log(req.user_id, "req.user_id")
            await modelService.Update(this.userModel, { _id: req.user_id }, { last_logout_time: new Date(), token: '', })
            return clientResponse.success({ msg: "User logout successfully!" })
        } catch (error) {
            console.log(error)
            clientResponse.error(error)
        }
    }
    async verifyProfile(files, req, res, body) {
        try {
            console.log(body.verification_type)
            const isValidUser = await modelService.FindOne(this.userModel, { _id: req.user_id })
            if (isValidUser.kyc_status == false) {
                const front_imgURL = await this.cloudinaryService.uploadImage(files.front_img[0])
                const back_imgURL = await this.cloudinaryService.uploadImage(files.back_img[0])
                console.log(front_imgURL, back_imgURL)
                await modelService.Created(this.profileVerifyModel, {
                    userId: req.user_id,
                    verification_type: body.verification_type,
                    front_img: front_imgURL.secure_url,
                    back_img: back_imgURL.secure_url,
                })
                console.log("created table")
                await modelService.Update(this.userModel, { _id: req.user_id }, { kyc_status: true })
                console.log("update user")

                res.send(clientResponse.success({ msg: "KYC updates successfully" }))
            } else {
                res.send(clientResponse.other(208, "KYC updated already!"))
            }


        } catch (error) {

        }
    }

    async getAllUser(res) {
        try {
            return res.send(clientResponse.success(await modelService.FindAll(this.userModel)))
        } catch (error) {
            console.log(error)
        }
    }

    async updateProfile(body, res: any, files, req) {
        try {
            const { firstName, middleName, lastName, DOB, address } =
                body
            if (
                !body
            ) {
                return res.send(
                    clientResponse.other(400, 'all fields are required')
                )
            }
            const isExist = await modelService.FindOne(this.userModel, { _id: req.user_id })
            console.log({
                isExist, _id: req.user_id, x: isExist
            })
            if (!!isExist) {
                console.log("i am here!")
                console.log({ firstName, middleName, lastName, DOB, address, files }, "hello")
                const result = await this.cloudinaryService.uploadImage(files)
                await modelService.UpdateById(this.userModel, { _id: req.user_id }, {
                    firstName,
                    middleName: middleName || "",
                    lastName,
                    DOB,
                    address,
                    account: isExist?.account,
                    country: isExist?.country,
                    currency: isExist?.currency,
                    profile_img: result?.secure_url,

                })
                return res.send(clientResponse.success("Your Profile update successdully!"))
            } else {
                return res.send(clientResponse.other(400, ' You cannot update your profile beacuse email address doesnot match our database!'))

            }
        } catch (error) {
            res.send(clientResponse.error(error))
        }
    }

    async captch(req, res) {
        try {
            var captcha = svgCaptcha.create();
            console.log({ captcha })
            // req.session.captcha = captcha.text;
            // res.type('svg');
            return clientResponse.success({ msg: "captcha" })
        } catch (error) {
            console.log(error)
        }
    }
}
