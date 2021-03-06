import { Component } from '@angular/core';
import {  NavController, NavParams, Keyboard } from 'ionic-angular';

import { CacheData } from '../../providers/storage/CacheData';
import { DialogUtil } from '../../utils/DialogUtil';
import { User } from './../../module/User';
import { HttpServices } from './../../providers/http/http.service';
import { StorageUtils } from './../../providers/storage/StorageUtils';
import { CommandKeys } from './../../utils/CommandKeys';
import { EncryptUtils } from './../../utils/EncryptUtils';
import { IonicPage } from 'ionic-angular/navigation/ionic-page';

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
        public http: HttpServices,public dialog:DialogUtil,public encrypt:EncryptUtils,public keyboard:Keyboard) {
    }

    ionViewDidLoad() {
        this.isDebug = CacheData.isDebug;
        this.storage.getUser().then(value => {
            if (value) {
                this.id = value["WorkerNo"];
                this.pwd = value["Password"]
                this.saveCheck = this.pwd.length>0;
            }
        });
        if(this.keyboard.isOpen()){
            this.keyboard.close();
        }
    }
    login() {
        if(!this.id){
            this.dialog.showAtMiddleToast("账号不能为空");
            return;
        }
        if(!this.pwd){
            this.dialog.showAtMiddleToast("密码不能为空");
            return;
        }
        this.http.postRequestFull<User>(CommandKeys.login,this.id,{"Password":this.pwd},value=>{
            if (value.success){
                let user = value.object;
                CacheData.id = this.id;
                if (!this.saveCheck) {
                    user.Password = "";
                }
                this.storage.setUser(user);
                this.dialog.showAtMiddleToast("登录成功",800);
                setTimeout(() => {
                    this.navCtrl.setRoot('MainMenu');
                }, 800);
            }
            return false;
        });
        
    }

    // setPath(){
    //     CacheData.url = this.path + "/api/Mobile";
    //     this.dialog.showAtMiddleToast("设置成功", 800);
    // }
}
