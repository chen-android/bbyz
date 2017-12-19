import { ToastUtil } from './../../utils/ToastUtil';
import { EncryptUtils } from './../../utils/EncryptUtils';
import { StorageUtils } from './../../providers/storage/StorageUtils';
import { MainMenu } from './../main/main.menu';
import { User } from './../../module/User';
import { CommandKeys } from './../../utils/CommandKeys';
import { HttpServices } from './../../providers/http/http.service';
import { StorageKeys } from './../../utils/StorageKeys';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { CacheData } from '../../providers/storage/CacheData';
import CryptoJS from "crypto-js";
/**
 * 登录页
 */

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.page.html',
})
export class LoginPage {
    id: string;
    pwd: string ;
    saveCheck: boolean;
    isDebug:boolean ;
    path:string;
    constructor(public navCtrl: NavController, public navParams: NavParams, public storage: StorageUtils, 
        public http: HttpServices,public toast:ToastUtil,public encrypt:EncryptUtils) {
    }

    ionViewDidLoad() {
        this.isDebug = CacheData.isDebug;
        this.storage.getUser().then(value => {
            if (value) {
                this.id = value["WorkerNo"];
                this.saveCheck = true;
            }
        });
        this.pwd = "12345678";
    }
    login() {
        this.http.postRequest1<User>(CommandKeys.login,this.id,{"Password":this.pwd},value=>{
            if (value.success){
                let user = value.object;
                CacheData.id = this.id;
                if (this.saveCheck) {
                    this.storage.setUser(user);
                }
                this.toast.showAtMiddle("登录成功",800);
                setTimeout(() => {
                    this.navCtrl.setRoot(MainMenu);
                }, 800);
            }
            return false;
        });
        
    }

    setPath(){
        CacheData.url = this.path + "/api/Mobile";
        this.toast.showAtMiddle("设置成功", 800);
    }
}
