export interface ResponseModel {
    status: boolean;
    message: string;
    data?: any;
    meta?: Record<string, unknown>;
    error?: any;
}

export interface ErrorModel {
    message: string;
    data?: any;
    error?: any;
}