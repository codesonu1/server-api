import { AuthService } from 'src/use-cases/auth/auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    upload(file: Express.Multer.File): Promise<void>;
    register(file: any, body: any, req: any, res: any): Promise<any>;
    login(body: any, res: any, req: any): Promise<any>;
    getProfile(req: any, res: any): Promise<any>;
    updateUserProfile(file: any, body: any, req: any, res: any): Promise<any>;
    verifyProfile(body: any, req: any, res: any, files: {
        front_img: Express.Multer.File[];
        back_img: Express.Multer.File[];
    }): Promise<void>;
    getAllUser(res: any): Promise<any>;
    changePassword(body: any, req: any, res: any): Promise<any>;
    logout(req: any): Promise<{
        status: number;
        data: any;
    }>;
    captch(req: any, res: any): Promise<{
        status: number;
        data: any;
    }>;
}
