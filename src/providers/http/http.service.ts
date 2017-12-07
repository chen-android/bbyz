import { CacheData } from './../storage/CacheData';
import { RequestOptions } from './RequestOptions';
import { EncryptUtils } from './../../utils/EncryptUtils';
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import 'rxjs/add/operator/map';
import { Loading, LoadingController, ToastController } from 'ionic-angular';
import { BbyzHttpResonse } from './BbyzHttpResponse';

@Injectable()
export class HttpServices {
    constructor(private http: HttpClient, private encrypt: EncryptUtils, private loading: LoadingController,
        private toast: ToastController) { }

    public postRequest<T>(command: string, content: any, success: (value: BbyzHttpResonse<T>) => void, error?: (error: any) => void,
        option?: RequestOptions): void {
        this.postRequest1(command, undefined, content, success, error, option);
    }
    /**
     * post请求
     * @param path 地址
     * @param content 请求主体
     * @param success 成功回调
     * @param error 失败回调
     * @param option 请求参数 默认请求加密，显示loading框
     */
    public postRequest1<T>(command: string, workNo = CacheData.id, content: any, success: (value: BbyzHttpResonse<T>) => void, error?: (error: any) => void,
        option?: RequestOptions): void {
        let secure: boolean = true;
        let showProgress: boolean = true;
        if (option) {
            if (option.secure != undefined) {
                secure = option.secure;
            }
            if (option.showProgress != undefined) {
                showProgress = option.showProgress;
            }
        }
        this.post<T>(command, workNo, secure, content, showProgress, success, error);
    }

    private post<T>(command: string, workNo: string, secure: boolean, content: any, showProgress: boolean,
        success: (value: BbyzHttpResonse<T>) => void, error?: (error: any) => void): void {
        let loadDialog: Loading;
        if (showProgress) {
            loadDialog = this.loading.create({
                content: "请稍后。。。",
                showBackdrop: true,
                enableBackdropDismiss: true,
                dismissOnPageChange: true
            });
            loadDialog.present();
        }
        this.http.post<BbyzHttpResonse<T>>(CacheData.url, this.getPostBody(secure, content), {
            params: { "Command": command, "WorkNo": workNo }
        })
            .map((value: BbyzHttpResonse<T>, index: number) => {
                if (value.secure == "1") {
                    let util = new EncryptUtils();
                    value.object = JSON.parse(util.decodeForAES(value.content, util.encodeMD5(CacheData.getCommon().$imei))) as T;
                } else {
                    value.object = JSON.parse(value.content) as T;
                }
                value.success = value.returnNo === "0000";
                return value;
            })
            .subscribe(success, err => {
                if (error) {
                    error(err);
                }
                this.toast.create({
                    message: "网络连接失败，请检查网络。",
                    duration: 2000
                }).present();
            }, () => {
                if (loadDialog) {
                    loadDialog.dismiss();
                }
            });
    }

    private getPostBody(secure: boolean, content: any): any {
        let json = {
            "secure": secure ? "1" : "0",
            "secureType": secure ? "1" : "0",
            "platform": "ionic",
            "content": content,
            "common": {
                "appId": CacheData.getCommon().$appId,
                "usId": CacheData.getCommon().$usId,
                "loginStatus": CacheData.getCommon().$loginStatus,
                "pushToken": CacheData.getCommon().$pushToken,
                "terminalType": CacheData.getCommon().$terminalType,
                "imei": CacheData.getCommon().$imei,
                "appVer": CacheData.getCommon().$appVer,
                "mobileVer": CacheData.getCommon().$mobileVer,
                "channelVer": CacheData.getCommon().$channelVer,
                "platformCode": CacheData.getCommon().$platformCode,
                "phone": CacheData.getCommon().$phone
            },
            "key": secure ? CacheData.getCommon().$imei : ""
        }
        if (secure) {
            json.key = this.encrypt.encodeForRSA(this.encrypt.encodeMD5(CacheData.getCommon().$imei));
            json.content = this.encrypt.encodeFroAES(JSON.stringify(json.content), this.encrypt.encodeMD5(CacheData.getCommon().$imei));
        }
        return JSON.stringify(json);
    }
}