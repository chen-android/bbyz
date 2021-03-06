import { Component, ViewChild } from '@angular/core';
import { AppVersion } from '@ionic-native/app-version';
import { Device } from '@ionic-native/device';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { Keyboard, Nav, Platform } from 'ionic-angular';
import { App } from 'ionic-angular/components/app/app';

import { User } from '../module/User';
import { CacheData } from './../providers/storage/CacheData';
import { StorageUtils } from './../providers/storage/StorageUtils';
import { StorageKeys } from './../utils/StorageKeys';
import { DialogUtil } from '../utils/DialogUtil';

@Component({
    templateUrl: 'app.html'
})
export class MyApp {
    rootPage: any;
    @ViewChild(Nav) nav: Nav;
    lastClickTime: number;
    keyShow:boolean = false;
    backBtnToExit = false;
    constructor(public platform: Platform, public statusBar: StatusBar, public splashScreen: SplashScreen,
        private appVersion: AppVersion, private device: Device, private storage: StorageUtils,private keyboard:Keyboard,
        private app:App,private dialog:DialogUtil) {
        this.platform.ready().then(() => {
            // Okay, so the platform is ready and our plugins are available.
            // Here you can do any higher level native things you might need.
            this.statusBar.styleDefault();
            this.splashScreen.hide();
            this.initAppData();
            this.registerBackButtonListener();
            this.rootPage = 'LoginPage';
        });
    }
    initAppData(): any {
        if (this.platform.is("android")) {
            CacheData.isAndroid = true;
        } else if (this.platform.is("ios")) {
            CacheData.isIos = true;
        } else {
            CacheData.isDebug = true;
        }
        this.initCommon();
    }

    initCommon() {
        if (!CacheData.isDebug) {
            this.appVersion.getVersionNumber().then((value: string) => {
                CacheData.getCommon().$appVer = value.replace(".", "").replace(".", "");
            });
            this.appVersion.getPackageName().then((value) => {
                CacheData.getCommon().$appId = value;
            });
            let user: User;
            this.storage.get<User>(StorageKeys.USER_ID).then(value => {
                user = value;
                if (user) {
                    CacheData.getCommon().$usId = user.id;
                    CacheData.getCommon().$loginStatus = "1";
                } else {
                    CacheData.getCommon().$usId = "";
                    CacheData.getCommon().$loginStatus = "0";
                }
            });
            CacheData.getCommon().$pushToken = this.device.uuid;
            CacheData.getCommon().$imei = this.device.uuid;
            CacheData.getCommon().$mobileVer = this.device.version;
            CacheData.getCommon().$platformCode = CacheData.isAndroid?"03":"04";
            CacheData.getCommon().$channelVer = "";
            CacheData.getCommon().$phone = "";

            if (CacheData.isAndroid) {
                CacheData.getCommon().$terminalType = "3";
            }
            if (CacheData.isIos) {
                CacheData.getCommon().$terminalType = "4";
            }
        } else {
            //debug
            CacheData.getCommon().$usId = "";
            CacheData.getCommon().$appVer = "100";
            CacheData.getCommon().$appId = "com.bbkb.bbyz";
            CacheData.getCommon().$pushToken = "860482031470585";
            CacheData.getCommon().$imei = "860482031470585";
            CacheData.getCommon().$mobileVer = "7.0";
            CacheData.getCommon().$platformCode = "01";
            CacheData.getCommon().$loginStatus = "0";
            CacheData.getCommon().$channelVer = "";
            CacheData.getCommon().$phone = "";
            CacheData.getCommon().$terminalType = "3";
        }
    }
    registerBackButtonListener(){
        this.platform.registerBackButtonAction(()=>{
            if(this.keyboard.isOpen()){
                this.keyboard.close();
                return;
            }
            let overlay = this.app._appRoot._overlayPortal.getActive() || this.app._appRoot._modalPortal.getActive();
            if (overlay) {
                overlay.dismiss();
                return;
            }

            let act = this.app.getActiveNav();
            if(act.canGoBack()){
                act.pop();
                return;
            }
            if(!this.backBtnToExit){
                this.backBtnToExit = true;
                this.dialog.showAtMiddleToast("再按一次返回，退出应用");
                setTimeout(() => {
                    this.backBtnToExit = false;
                }, 2000);
            }else{
                this.platform.exitApp();
            }
        })
    }
    
}
