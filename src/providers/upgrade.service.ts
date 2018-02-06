import { Injectable } from "@angular/core";
import { FileTransfer } from "@ionic-native/file-transfer";
import { File } from "@ionic-native/file";
import { FileOpener } from "@ionic-native/file-opener";
import { HttpServices } from "./http/http.service";
import { Upgrade } from "../module/Upgrade";
import { CommandKeys } from "../utils/CommandKeys";
import { CacheData } from "./storage/CacheData";
import { DialogUtil } from "../utils/DialogUtil";
import { AndroidPermissions } from "@ionic-native/android-permissions";
import { InAppBrowser } from '@ionic-native/in-app-browser';

@Injectable()
export class UpgradeService {
    upgrade: Upgrade;
    constructor(private transfer: FileTransfer, private file: File, private opener: FileOpener, private http: HttpServices,
        private dialog: DialogUtil, private permission: AndroidPermissions, private inAppBrowser: InAppBrowser) {

    }
    /**
     * 检查更新
     */
    detectionUpgrade(next: boolean = false): Promise<boolean> {
        return new Promise<boolean>((resolve) => {
            if (this.upgrade == null) {
                this.http.postRequest<Array<Upgrade>>(CommandKeys.upgrade, { VersionNo: CacheData.getCommon().$appVer }, value => {
                    if (value.success) {
                        this.upgrade = value.object[0];
                        resolve(this.upgrade.NeedUpdate == 1);
                        if (next) {
                            if (this.upgrade.NeedUpdate == 1) {
                                this.doUpgrade();
                            } else {
                                this.dialog.showAtMiddleToast("已经是最新版本");
                            }
                        }
                    } else {
                        resolve(false);
                        if (next) {
                            this.dialog.showAtMiddleToast(value.returnInfo);
                        }
                    }
                    return false;
                },undefined,{
                    showProgress:false
                })
            } else {
                if (next && this.upgrade.NeedUpdate == 1) {
                    this.doUpgrade();
                    resolve(true);
                } else {
                    resolve(false);
                }
            }
        });

    }

    private doUpgrade() {
        this.dialog.simpleTitleMessageDialog("升级提示", this.upgrade.Reason, () => {
            if (CacheData.isAndroid) {
                this.checkPermission();
            }else if(CacheData.isIos){
                this.inAppBrowser.create(this.upgrade.UpdateUrl,"_system")
            }
        })
    }

    private checkPermission() {
        this.permission.checkPermission(this.permission.PERMISSION.WRITE_EXTERNAL_STORAGE).then(
            result => {
                this.downloadApp()
            },
            err => {
                this.permission.requestPermissions([this.permission.PERMISSION.WRITE_EXTERNAL_STORAGE, this.permission.PERMISSION.READ_EXTERNAL_STORAGE]).then(
                    result => {
                        this.downloadApp()
                    },
                    err => {
                        this.dialog.showAtMiddleToast("权限拒绝，无法下载");
                    }
                )
            }
        );
    }

    private downloadApp() {
        const fileTransfer = this.transfer.create();
        let apkName = this.upgrade.UpdateUrl.substring(this.upgrade.UpdateUrl.lastIndexOf("/") + 1, this.upgrade.UpdateUrl.length);
        const apk = this.file.externalApplicationStorageDirectory + apkName;
        this.file.checkFile(this.file.externalApplicationStorageDirectory, apkName).then(
            success => {
                this.opener.open(apk, 'application/vnd.android.package-archive').then(() => {

                })
            },
            err => {
                let dialog = this.dialog.showUpgradeDialot(() => {
                    fileTransfer.abort();
                });
                fileTransfer.download(this.upgrade.UpdateUrl, apk).then(() => {
                    this.opener.open(apk, 'application/vnd.android.package-archive').then(() => {

                    })
                })
                fileTransfer.onProgress((event: ProgressEvent) => {
                    let num = Math.floor(event.loaded / event.total * 100);
                    if (num == 100) {
                        dialog.dismiss();
                    } else {
                        let title = document.getElementsByClassName('alert-title')[0];
                        title && (title.innerHTML = '下载进度：' + num + '%');
                    }
                })
            }
        )
    }
}