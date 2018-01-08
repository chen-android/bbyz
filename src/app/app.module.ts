import { KeepReasonComponentModule } from '../component/keep-reason/keep-reason.component.module';
import { CompanySearchPageModule } from './../pages/company-search/company-search.page.module';
import { DialogUtil } from './../utils/DialogUtil';
import { HttpServices } from './../providers/http/http.service';
import { EncryptUtils } from './../utils/EncryptUtils';
import { HttpClientModule } from '@angular/common/http';
import { StorageUtils } from './../providers/storage/StorageUtils';
import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home.page';
import { ListPage } from '../pages/list/list';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { AppVersion } from "@ionic-native/app-version";
import { Device } from "@ionic-native/device";
import { LoginPageModule } from '../pages/login/login.page.module';
import { MainMenuModule } from '../pages/main/main.menu.module';
import { SiteSearchPageModule } from './../pages/site-search/site-search.page.module';
import { FeedbackPageModule } from './../pages/other/feedback/feedback.page.module';
import { SchemDetailPageModule } from '../pages/schem-detail/schem-detail.page.module';
import { SchemDetailModifyPageModule } from '../pages/schem-detail-modify/schem-detail-modify.page.module';
import { SchemDetailClonePageModule } from '../pages/schem-detail-clone/schem-detail-clone.page.module';
import { SearchBusSalePageModule } from '../pages/search-bus-sale/search-bus-sale.page.module';
import { SearchSaleDetailPageModule } from '../pages/search-sale-detail/search-sale-detail.page.module';
import { SearchTicketNumberPageModule } from '../pages/search-ticket-number/search-ticket-number.page.module';
import { SearchIssueBusPageModule } from '../pages/search-issue-bus/search-issue-bus.page.module';
import { SchemDetailShiftClosePageModule } from '../pages/schem-detail-shift-close/schem-detail-shift-close.page.module';
import { BusTypeSearchPageModule } from '../pages/bus-type-search/bus-type-search.page.module';
import { BusIdSearchPageModule } from '../pages/bus-id-search/bus-id-search.page.module';
import { SchemDetailKeepSeatPageModule } from '../pages/schem-detail-keep-seat/schem-detail-keep-seat.page.module';
import { SchemDetailStopSalePageModule } from '../pages/schem-detail-stop-sale/schem-detail-stop-sale.module';
import { PassengerFlowSummaryPageModule } from '../pages/passenger-flow-summary/passenger-flow-summary.page.module';
import { PipeModule } from '../pipe/PipeModule';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage
  ],
  imports: [
    BrowserModule,
    LoginPageModule,
    MainMenuModule,
    SearchBusSalePageModule,
    SearchSaleDetailPageModule,
    SearchTicketNumberPageModule,
    SearchIssueBusPageModule,
    HttpClientModule,
    FeedbackPageModule,
    SiteSearchPageModule,
    SchemDetailPageModule,
    SchemDetailModifyPageModule,
    SchemDetailClonePageModule,
    SchemDetailShiftClosePageModule,
    SchemDetailKeepSeatPageModule,
    SchemDetailStopSalePageModule,
    BusTypeSearchPageModule,
    CompanySearchPageModule,
    BusIdSearchPageModule,
    KeepReasonComponentModule,
    PassengerFlowSummaryPageModule,
    PipeModule.forRoot(),
    IonicModule.forRoot(MyApp,{
      platform:{
        ios:{
          backButtonText: ''
        }
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    ListPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AppVersion,
    Device,
    EncryptUtils,
    HttpServices,
    StorageUtils,
    DialogUtil,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
