export declare const encryptService: {
    HashPassword: (password: any) => Promise<any>;
    ComparePassword: (password: any, hashPassword: any) => any;
    GenerateToken: (paload: any, key: any, time: any) => Promise<any>;
    JwtSign: (payload: any, key: any, time: any) => any;
    JwtVerify: (token: any, key: any) => any;
};
