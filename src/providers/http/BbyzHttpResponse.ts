export interface BbyzHttpResonse<T> {
    content: any;
    returnInfo: string;
    returnNo: string;
    secure: string;
    success: boolean;
    object: T;
}