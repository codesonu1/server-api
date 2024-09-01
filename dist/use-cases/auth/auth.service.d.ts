import { Model } from 'mongoose';
import { User } from 'src/core/dtos/models/add_user.schema';
import { ProfileVerify } from 'src/core/dtos/models/verify_user_profile.schema';
import { CloudinaryService } from 'src/utils/cloudinary/cloudinary.service';
export declare class AuthService {
    private readonly userModel;
    private readonly profileVerifyModel;
    private readonly cloudinaryService;
    constructor(userModel: Model<User>, profileVerifyModel: Model<ProfileVerify>, cloudinaryService: CloudinaryService);
    register(body: any, res: any, files: any): Promise<any>;
    login(res: any, { account, password }: {
        account: any;
        password: any;
    }): Promise<any>;
    getProfile(req: any, res: any): Promise<any>;
    changePassword({ currentPassword, newPassword, comfirmPassword }: {
        currentPassword: any;
        newPassword: any;
        comfirmPassword: any;
    }, req: any, res: any): Promise<any>;
    logout(req: any): Promise<{
        status: number;
        data: any;
    }>;
    verifyProfile(files: any, req: any, res: any, body: any): Promise<void>;
    getAllUser(res: any): Promise<any>;
    updateProfile(body: any, res: any, files: any, req: any): Promise<any>;
    captch(req: any, res: any): Promise<{
        status: number;
        data: any;
    }>;
}
