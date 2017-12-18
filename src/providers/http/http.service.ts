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
    /**
     * post请求
     * @param command 请求方法名
     * @param content 请求主体
     * @param success 成功回调 默认返回false，在response返回非成功的情况下，默认取returnInfo，做tost弹出。若有自己单独处理，return true。
     * @param error 失败回调
     * @param option 请求参数 默认请求加密，显示loading框
     */
    public postRequest<T>(command: string, content: any, success: (value: BbyzHttpResonse<T>) => boolean, error?: (error: any) => void,
        option?: RequestOptions): void {
        this.postRequest1(command, undefined, content, success, error, option);
    }
    
    public postRequest1<T>(command: string, workNo = CacheData.id, content: any, success: (value: BbyzHttpResonse<T>) => boolean, error?: (error: any) => void,
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
        success: (value: BbyzHttpResonse<T>) => boolean, error?: (error: any) => void): void {
        let loadDialog: Loading;
        if (showProgress) {
            loadDialog = this.loading.create({
                content: "请稍后。。。",
                showBackdrop: true,
                enableBackdropDismiss: true,
                dismissOnPageChange: false
            });
            loadDialog.present();
        }
        this.http.post<BbyzHttpResonse<T>>(CacheData.url, this.getPostBody(command, secure, content), {
            params: { "Command": command, "WorkNo": workNo }
        })
            .map((value: BbyzHttpResonse<T>, index: number) => {
                value.success = value.returnNo === 0;
                if (value.success) {
                    if (value.secure == "1") {
                        let content = this.encrypt.decodeForAES(value.content, CacheData.secureKeys.get(command));
                        if (content) {
                            value.object = JSON.parse(content) as T;
                        }
                    } else {
                        value.object = JSON.parse(value.content) as T;
                    }
                }
                if (CacheData.isDebug) {
                    console.log("<<<<<<<<返回参数<<<<<<<<"+command);
                    console.log( value);
                }
                return value;
            })
            .subscribe(suc => {
                if (success) {
                    if (!success(suc)) {
                        if (!suc.success) {
                            this.toast.create({
                                message: suc.returnInfo,
                                position:"bottom",
                                duration: 2000
                            }).present();
                        }
                    }
                }
            }, err => {
                if (error) {
                    error(err);
                }
                this.toast.create({
                    message: "网络连接失败，请检查网络。",
                    duration: 2000
                }).present();
                if (loadDialog) {
                    loadDialog.dismiss();
                }
            }, () => {
                if (loadDialog) {
                    loadDialog.dismiss();
                }
            });
    }

    private getPostBody(command: string, secure: boolean, content: any): any {
        let json = {
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
            "key": ""
        }
        if (CacheData.isDebug) {
            console.info(">>>>>>>>请求参数>>>>>>>>"+command);
            console.info(json.content);
        }
        let key = this.encrypt.encodeMD5(new Date().getTime().toString());
        json.key = this.encrypt.encodeForRSA(key);
        CacheData.secureKeys.set(command, key);
        if (content && secure) {
            json.content = this.encrypt.encodeFroAES(JSON.stringify(json.content), key);
        }
        if(content == undefined||content == null){
            json.content = "";
        }
        return JSON.stringify(json);
    }
}