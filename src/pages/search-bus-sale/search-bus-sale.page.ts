import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { SearchSaleDetailPage } from '../search-sale-detail/search-sale-detail.page';

/**
 * 
 * 查询车次售票
 */

@IonicPage()
@Component({
  selector: 'page-search-bus-sale',
  templateUrl: 'search-bus-sale.page.html',
})
export class SearchBusSalePage {
  schemID: string;
  list: Array<object> = [];
  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {

  }

  searchAction() {
    this.list = [{
      DriveDate: 'yyyy-MM-dd',
      StationName: '杭州客运中心',
      SchemNo: '9999',
      TicketNo: '22222',
      SeatNo: '12',
      StopName: '丽水',
      TicketType: '全票',
      Price: '123.00',
      Status: '已售',
      SaleDateTime:'yyyy-MM-dd',
      ClientName: '刘照天',
      IDCardNo: '610103199305231619',
      Tel: '18740395237',
      CheckDateTime:'yyyy-MM-dd',
      IsFreeChild: 0,
      SaleStationName: '杭州',
      SaleWorkerName: '陈宇宝宝'      
    },{
      DriveDate: 'yyyy-MM-dd',
      StationName: '杭州客运中心',
      SchemNo: '9999',
      TicketNo: '22222',
      SeatNo: '12',
      StopName: '丽水',
      TicketType: '全票',
      Price: '123.00',
      Status: '已售',
      SaleDateTime:'yyyy-MM-dd HH:mm:ss',
      ClientName: '刘照天',
      IDCardNo: '610103199305231619',
      Tel: '18740395237',
      CheckDateTime:'yyyy-MM-dd',
      IsFreeChild: 0,
      SaleStationName: '杭州',
      SaleWorkerName: '陈宇宝宝'      
    },{
      DriveDate: 'yyyy-MM-dd',
      StationName: '杭州客运中心',
      SchemNo: '9999',
      TicketNo: '22222',
      SeatNo: '12',
      StopName: '丽水',
      TicketType: '全票',
      Price: '123.00',
      Status: '已售',
      SaleDateTime:'yyyy-MM-dd',
      ClientName: '刘照天',
      IDCardNo: '610103199305231619',
      Tel: '18740395237',
      CheckDateTime:'yyyy-MM-dd',
      IsFreeChild: 0,
      SaleStationName: '杭州',
      SaleWorkerName: '陈宇宝宝'      
    },{
      DriveDate: 'yyyy-MM-dd',
      StationName: '杭州客运中心',
      SchemNo: '9999',
      TicketNo: '22222',
      SeatNo: '12',
      StopName: '丽水',
      TicketType: '全票',
      Price: '123.00',
      Status: '已售',
      SaleDateTime:'yyyy-MM-dd',
      ClientName: '刘照天',
      IDCardNo: '610103199305231619',
      Tel: '18740395237',
      CheckDateTime:'yyyy-MM-dd',
      IsFreeChild: 0,
      SaleStationName: '杭州',
      SaleWorkerName: '陈宇宝宝'      
    },{
      DriveDate: 'yyyy-MM-dd',
      StationName: '杭州客运中心',
      SchemNo: '9999',
      TicketNo: '22222',
      SeatNo: '12',
      StopName: '丽水',
      TicketType: '全票',
      Price: '123.00',
      Status: '已售',
      SaleDateTime:'yyyy-MM-dd',
      ClientName: '刘照天',
      IDCardNo: '610103199305231619',
      Tel: '18740395237',
      CheckDateTime:'yyyy-MM-dd',
      IsFreeChild: 0,
      SaleStationName: '杭州',
      SaleWorkerName: '陈宇宝宝'      
    },{
      DriveDate: 'yyyy-MM-dd',
      StationName: '杭州客运中心',
      SchemNo: '9999',
      TicketNo: '22222',
      SeatNo: '12',
      StopName: '丽水',
      TicketType: '全票',
      Price: '123.00',
      Status: '已售',
      SaleDateTime:'yyyy-MM-dd',
      ClientName: '刘照天',
      IDCardNo: '610103199305231619',
      Tel: '18740395237',
      CheckDateTime:'yyyy-MM-dd',
      IsFreeChild: 0,
      SaleStationName: '杭州',
      SaleWorkerName: '陈宇宝宝'      
    }]
    console.log(this.schemID);
    console.log(this.list);
    this.navCtrl.push(SearchSaleDetailPage)
  }
}
