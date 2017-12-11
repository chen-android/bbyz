export interface BbyzHttpResonse<T> {
    content: any;
    returnInfo: string;
    returnNo: number;
    secure: string;
    success: boolean;
    object: T;
}