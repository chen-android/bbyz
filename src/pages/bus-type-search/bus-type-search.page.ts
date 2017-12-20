import {CacheData} from '../../providers/storage/CacheData';
import {CommandKeys} from '../../utils/CommandKeys';
import { HttpServices } from './../../providers/http/http.service';
import { BusType } from './../../module/BusType';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

/**
 * Generated class for the BusTypeSearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-bus-type-search',
    templateUrl: 'bus-type-search.page.html',
})
export class BusTypeSearchPage {
    typeList: Array<BusType>;
    allList: Array<BusType>;
    searchCallBack: (params: BusType) => Promise<string>;
    busTypeName:string;
    constructor(public navCtrl: NavController, public navParams: NavParams,public http:HttpServices) {
        this.searchCallBack = navParams.get("callback");
        this.busTypeName = navParams.get("busTypeName");
    }

    ionViewDidLoad() {
        this.requestBusType();
    }
    requestBusType() {
        this.http.postRequest<Array<BusType>>(CommandKeys.busType, { StationID: CacheData.stationId }, value => {
            if (value.success) {
                this.allList = value.object;
                if (this.allList) {
                    this.allList.reverse();
                    let index = this.allList.findIndex((value) => {
                        if (value.BusTypeName == this.busTypeName) {
                            return true;
                        }
                        return false;
                    });
                    if (index > 0) {
                        this.allList.push(this.allList.splice(index, 1)[0]);
                    }
                    this.allList.reverse();
                }
                this.setData();
            }
            return false;
        })
    }
    setData(){
        this.typeList = this.allList;
    }
    searchInput(ev: any) {
        this.setData();
        let s: string = ev.target.value;
        if (this.typeList != undefined && s && s.trim() != "") {
            this.typeList = this.typeList.filter(value => {
                return value.BusTypeName.includes(s);
            })
        }
    }
    itemClick(s: BusType) {
        this.searchCallBack(s).then(value => {
            this.navCtrl.pop();
        });
    }
}
