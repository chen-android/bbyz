import { Component, ViewChild, ElementRef } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { HttpServices } from '../../providers/http/http.service';
import { CacheData } from '../../providers/storage/CacheData';
import { PassengerFlowItem } from '../../module/PassengerFlowItem';
import { CommandKeys } from '../../utils/CommandKeys';
import Chart from 'chart.js'; // 导入chart.jsimport 
import { DialogUtil } from '../../utils/DialogUtil';

/**
 * Generated class for the PassengerFlowSummaryPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-passenger-flow-summary',
  templateUrl: 'passenger-flow-summary.page.html',
})
export class PassengerFlowSummaryPage {
  @ViewChild('canvas1') canvas1: ElementRef;
  @ViewChild('canvas2') canvas2: ElementRef;
  beginTime: string;   // 起始日期
  endTime: string;    // 结束日期
  hiddenInfo: boolean = true;
  passengerFlowItem: PassengerFlowItem;
  constructor(public navCtrl: NavController, public navParams: NavParams, public dialog: DialogUtil, public http: HttpServices) {
    this.beginTime = new Date().toISOString().substring(0,10);
    this.endTime = new Date().toISOString().substring(0, 10);
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad PassengerFlowSummaryPage');
  }
  requestData() {
    let content = {
      StationID: CacheData.stationId,
      StartDate: this.beginTime,
      EndDate: this.endTime
    }
    this.http.postRequest<Array<PassengerFlowItem>>(CommandKeys.passengerFlowSummary, content, value => {
      if (value.success) {
        var items = value.object;
        if (items.length > 0) {
          this.passengerFlowItem = value.object[0];
          this.initCanvas();
          this.hiddenInfo = false;
        } else {
          this.dialog.showAtMiddleToast("暂无相关数据！");
        }
      }
      return false;
    })
  }
  initCanvas() {
    Chart.Bar(this.canvas1.nativeElement.getContext("2d"), {
      data: {
        labels: ['总人数', '正班人数', '加班人数'],
        datasets: [{
          label: '人数统计',
          data: [this.passengerFlowItem.TotalTickets, this.passengerFlowItem.NormalTickets, this.passengerFlowItem.AddedTickets],
          backgroundColor: [
            '#f2bb2b',
            'rgba(242, 187, 43, 0.8)',
            'rgba(242, 187, 43, 0.6)',
          ],
          borderColor: [
            '#f2bb2b',
            '#f2bb2b',
            '#f2bb2b',
          ],
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          xAxes: [{
            barPercentage: 0.5,
            categoryPercentage: 0.8,
            gridLines: {
              display: false
            }
          }],
          yAxes: [{
            display: false
          }]
        }
      }
    })
    Chart.Bar(this.canvas2.nativeElement.getContext("2d"), {
      data: {
        labels: ['总营收', '正班营收', '加班营收'],
        datasets: [{
          label: '营收统计',
          data: [this.passengerFlowItem.TotalIncome, this.passengerFlowItem.NormalIncome, this.passengerFlowItem.AddedIncome],
          backgroundColor: [
            '#62bff9',
            'rgba(98, 191, 249, 0.8)',
            'rgba(98, 191, 249, 0.6)',
          ],
          borderColor: [
            '#62bff9',
            '#62bff9',
            '#62bff9',
          ],
          borderWidth: 1
        }]
      },
      options: {

        scales: {
          xAxes: [{
            barPercentage: 0.5,
            categoryPercentage: 0.8,
            gridLines: {
              display: false
            }
          }],
          yAxes: [{
            display: false
          }]
        }
      }
    })
  }
  searchAction() {
    if (!this.beginTime || !this.endTime) {
      this.dialog.showAtMiddleToast("请选择必要信息！");
      return;
    }
    this.requestData();
  }
}
