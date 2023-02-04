export interface ResponseModel{
    status: boolean,
    message: string,
    result: any
}
export interface ErrorModel{
    message: string,
    data: any
}