import 'rxjs/add/operator/map';

import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Loading, LoadingController } from 'ionic-angular';

import { DialogUtil } from '../../utils/DialogUtil';
import { EncryptUtils } from './../../utils/EncryptUtils';
import { CacheData } from './../storage/CacheData';
import { BbyzHttpResonse } from './BbyzHttpResponse';
import { RequestOptions } from './RequestOptions';
import { LogUtil } from '../../utils/LogUtil';

@Injectable()
export class HttpServices {
    loadDialog: Loading;
    constructor(private http: HttpClient, private encrypt: EncryptUtils, private loading: LoadingController,
        private dialog: DialogUtil,private log:LogUtil) { }
    /**
     * post请求
     * @param command 请求方法名
     * @param content 请求主体
     * @param success 成功回调 默认返回false，在response返回非成功的情况下，默认取returnInfo，做tost弹出。若有自己单独处理，return true。
     * @param error 失败回调
     * @param option 请求参数 默认请求加密，显示loading框
     */
    public postRequest<T>(command: [string, string], content: any, success: (value: BbyzHttpResonse<T>) => boolean, error?: (error: any) => void,
        option?: RequestOptions): void {
        this.postRequestFull(command, undefined, content, success, error, option);
    }

    public postRequestFull<T>(command: [string, string], workNo = CacheData.id, content: any, success: (value: BbyzHttpResonse<T>) => boolean, error?: (error: any) => void,
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

    private post<T>(command: [string, string], workNo: string, secure: boolean, content: any, showProgress: boolean,
        success: (value: BbyzHttpResonse<T>) => boolean, error?: (error: any) => void): void {

        if (showProgress) {
            this.loadDialog = this.loading.create({
                content: "请稍后...",
                showBackdrop: true,
                enableBackdropDismiss: true,
                dismissOnPageChange: false
            });
            this.loadDialog.present().then(value => {
                this.req(command, workNo, secure, content, showProgress, success, error);
            });
        } else {
            this.req(command, workNo, secure, content, showProgress, success, error);
        }
    }
    private req<T>(command: [string, string], workNo: string, secure: boolean, content: any, showProgress: boolean,
        success: (value: BbyzHttpResonse<T>) => boolean, error?: (error: any) => void): void {
        this.http.post<BbyzHttpResonse<T>>(CacheData.url, this.getPostBody(command, secure, content), {
            params: { "Command": command[0], "WorkNo": workNo }
        })
            .map((value: BbyzHttpResonse<T>, index: number) => {
                value.success = value.returnNo === 0;
                if (value.success) {
                    if (value.secure == "1") {
                        let content = this.encrypt.decodeForAES(value.content, CacheData.secureKeys.get(command[0]));
                        if (content) {
                            value.object = JSON.parse(content) as T;
                        }
                    } else {
                        value.object = JSON.parse(value.content) as T;
                    }
                }
                this.log.saveResponseLogs(command[0] + "-" + command[1],JSON.stringify(value))
                if (CacheData.isDebug) {
                    console.log("<<<<<<<<返回参数<<<<<<<<" + command);
                    console.log(value);
                }
                return value;
            })
            .subscribe(suc => {
                if (this.loadDialog && showProgress) {
                    this.loadDialog.dismiss();
                }
                if (success) {
                    if (!success(suc)) {
                        if (!suc.success) {
                            this.dialog.showAtMiddleToast(suc.returnInfo);
                        }
                    }
                }

            }, err => {
                this.dialog.showAtMiddleToast("网络连接失败，请检查网络。");
                if (this.loadDialog && showProgress) {
                    this.loadDialog.dismiss();
                }
                if (error) {
                    error(err);
                }
            });
    }

    private getPostBody(command: [string, string], secure: boolean, content: any): any {
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
        this.log.saveRequestLogs(command[0]+"-"+command[1],JSON.stringify(json));
        if (CacheData.isDebug) {
            console.info(">>>>>>>>请求参数>>>>>>>>" + command);
            console.info(json.content);
        }
        let key = this.encrypt.encodeMD5(new Date().getTime().toString());
        json.key = this.encrypt.encodeForRSA(key);
        CacheData.secureKeys.set(command[0], key);
        if (content && secure) {
            json.content = this.encrypt.encodeFroAES(JSON.stringify(json.content), key);
        }
        if (content == undefined || content == null) {
            json.content = "";
        }
        return JSON.stringify(json);
    }
}