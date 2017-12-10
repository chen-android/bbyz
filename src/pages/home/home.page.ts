import { Station } from './../../module/Station';
import { CommandKeys } from './../../utils/CommandKeys';
import { HttpServices } from './../../providers/http/http.service';
import { Component } from '@angular/core';
import { ActionSheetController, MenuController, NavController } from 'ionic-angular';

@Component({
    selector: 'page-home',
    templateUrl: 'home.page.html'
})
export class HomePage {
    upStation: string;
    today = new Date();
    stationSelected: boolean = false;
    stationSelectClass: {};
    menuClass: {};
    stations:Array<Station>;
    selectedStation:Station;
    constructor(public navCtrl: NavController,public http:HttpServices,public action:ActionSheetController,
        public menu:MenuController) {
        this.upStation = "请选择乘车站";
    }
    ionViewDidLoad() {
        this.setTitleClass();
    }

    setTitleClass() {
        this.stationSelectClass = {
            "home_station_select": true,
            "home_station_select_defalut": !this.stationSelected,
            "home_station_select_selected": this.stationSelected
        };
        this.menuClass = {
            "home_menu": true,
            "home_menu_hide": !this.stationSelected,
            "home_menu_show": this.stationSelected
        }
    }
    /** 选择车站 */
    stationSelect() {
        this.requestCanSelectedStation();
        
    }
    /**获取可查询车站 */
    requestCanSelectedStation(){
        // this.http.postRequest<Array<Station>>(CommandKeys.canSelectedStation,undefined,value=>{
        //     if(value.success){

        //     }
        // })
        let json = [
            { "ID": "1", "StationName": "杭州是打开就法拉接受的" }, 
            { "ID": "2", "StationName": "丽水" },
            { "ID": "3", "StationName": "衢州机啊上拉框架的发" },
            { "ID": "4", "StationName": "宁波" },
            { "ID": "5", "StationName": "温州" },
            { "ID": "6", "StationName": "金华和请勿靠近额和让客户去玩儿" }
        ];
        this.stations = json;
        let bts = [];
        this.stations.forEach((value,index)=>{
            bts[index] = {
                text:value.StationName,
                handler:()=>{
                    this.selectedStation = value;
                    this.upStation = value.StationName;
                    if(!this.stationSelected){
                        this.stationSelected = true;
                        this.setTitleClass();
                    }
                }
            }
        });
        bts[bts.length] = {
            text: "取消",
            role: "cancel",
            
        }
        this.action.create({
            buttons:bts,
            enableBackdropDismiss:true
        }).present();
    }

    showSearchDialog(){
        this.action.create({
            buttons:[
                {
                    text:'车次售票查询',
                    handler:()=>{

                    }
                },
                {
                    text:'售票明细查询',
                    handler:()=>{
                        
                    }
                },
                {
                    text:'票号追踪查询',
                    handler:()=>{
                        
                    }
                },
                {
                    text:'疑问班次查询',
                    handler:()=>{
                        
                    }
                }
            ],
            enableBackdropDismiss:true
        }).present();
    }
}
