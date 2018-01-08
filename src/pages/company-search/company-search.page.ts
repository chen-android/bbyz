import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Company } from '../../module/Company';
import { HttpServices } from '../../providers/http/http.service';
import { CacheData } from '../../providers/storage/CacheData';
import { CommandKeys } from '../../utils/CommandKeys';

/**
 * Generated class for the CompanySearchPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
    selector: 'page-company-search',
    templateUrl: 'company-search.page.html',
})
export class CompanySearchPage {
    companyList: Array<Company>;
    allList: Array<Company>;
    searchCallBack: (params: Company) => Promise<string>;
    lastCompany:string;
    constructor(public navCtrl: NavController, public navParams: NavParams, public http: HttpServices) {
        this.searchCallBack = navParams.get("callback");
        this.lastCompany = navParams.get("company");
    }

    ionViewDidLoad() {
        this.requestCompany();
    }
    requestCompany() {
        this.http.postRequest<Array<Company>>(CommandKeys.company, { StationID: CacheData.stationId }, value => {
            if (value.success) {
                this.allList = value.object;
                if(this.allList){
                    this.allList.reverse();
                    let index = this.allList.findIndex((value)=>{
                        if(value.ShortName == this.lastCompany){
                            return true;
                        }
                        return false;
                    });
                    if(index>0){
                        this.allList.push(this.allList.splice(index,1)[0]);
                    }
                    this.allList.reverse();
                }
                this.setData();
            }
            return false;
        })
    }
    setData() {
        this.companyList = this.allList;
    }
    searchInput(ev: any) {
        this.setData();
        let s: string = ev.target.value;
        if (this.companyList != undefined && s && s.trim() != "") {
            this.companyList = this.companyList.filter(value => {
                return value.FullName.includes(s) ||
                    value.ShortName.includes(s) ||
                    value.Spell.toLocaleLowerCase().includes(s.toLocaleLowerCase());
            })
        }
    }
    itemClick(s: Company) {
        this.searchCallBack(s).then(value => {
            this.navCtrl.pop();
        });
    }
}
