export declare const clientResponse: {
    success: (payload: any) => {
        status: number;
        data: any;
    };
    error: (error: any) => {
        status: number;
        error: any;
    };
    other: (status: any, msg: any) => any;
};
