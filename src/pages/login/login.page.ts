import { Station } from './../../module/Station';
import { MainMenu } from './../main/main.menu';
import { EncryptUtils } from './../../utils/EncryptUtils';
import { User } from './../../module/User';
import { CommandKeys } from './../../utils/CommandKeys';
import { HttpServices } from './../../providers/http/http.service';
import { StorageKeys } from './../../utils/StorageKeys';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { CacheData } from '../../providers/storage/CacheData';
import CryptoJS from "crypto-js";
/**
 * Generated class for the LoginPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-login',
    templateUrl: 'login.page.html',
})
export class LoginPage {
    id:string;
    pwd:string;
    saveCheck: boolean;
    constructor(public navCtrl: NavController, public navParams: NavParams,public storage:Storage,public http:HttpServices,private en:EncryptUtils) {
    }

    ionViewDidLoad() {
        this.storage.get(StorageKeys.USER_ID).then(value=>{
            if(value){
                this.id = <string>value;
                this.saveCheck = true;
            }
        });

        // let json = [{ "ID": "1", "StationName": "杭州" }, { "ID": "2", "StationName": "丽水" }];
        // let sList:Array<Station> = json;
        // sList.forEach((value,index)=>{
        //     console.info(value.ID+"--"+value.StationName+"```"+index);
        // });

        // let key = "aslkdjflakjsdljfals";
        // let enStr = this.en.encodeFroAES("你好啊啊啊",key);
        // console.info("encoding:"+enStr);
        // let result = this.en.decodeForAES(enStr, key);
        // console.info("decoding:" + result);

        // let text = '雷克萨接待来访骄傲';
        // let key = 'secret key 123';
        // let ciphertext = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(text), CryptoJS.enc.Utf8.parse(key) , {
        //     mode: CryptoJS.mode.ECB,
        //     padding: CryptoJS.pad.Pkcs7
        // });

        // // Decrypt
        // let bytes = CryptoJS.AES.decrypt(ciphertext.toString(), CryptoJS.enc.Utf8.parse(key), {
        //     mode: CryptoJS.mode.ECB,
        //     padding: CryptoJS.pad.Pkcs7
        // });
        // let plaintext = bytes.toString(CryptoJS.enc.Utf8);

        // console.log(plaintext);
    }
    login(){
        // this.http.postRequest1<User>(CommandKeys.login,this.id,{"Password":this.pwd},user=>{
        //     if(user){
        //         CacheData.id = this.id;
        //         console.info("登录成功:"+JSON.stringify(user));
        //     }
        // });
        CacheData.id = "1000";
        this.navCtrl.setRoot(MainMenu);
    }
}
