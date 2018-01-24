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
import { File } from "@ionic-native/file";
import { FileTransfer,FileTransferObject } from "@ionic-native/file-transfer";
import { FileOpener } from "@ionic-native/file-opener";
import { AndroidPermissions } from "@ionic-native/android-permissions";
import { Device } from "@ionic-native/device";
import { InAppBrowser } from "@ionic-native/in-app-browser";
import { Keyboard } from "@ionic-native/keyboard";
import { UpgradeService } from '../providers/upgrade.service';
import { LogUtil } from '../utils/LogUtil';
import { LogPage } from '../pages/log/log';
import { LoginPage } from '../pages/login/login.page';
import { MainMenu } from '../pages/main/main.menu';
import { SchemDetailPage } from '../pages/schem-detail/schem-detail.page';
import { SchemDetailClonePage } from '../pages/schem-detail-clone/schem-detail-clone.page';
import { SchemDetailKeepSeatPage } from '../pages/schem-detail-keep-seat/schem-detail-keep-seat.page';
import { SchemDetailModifyPage } from '../pages/schem-detail-modify/schem-detail-modify.page';
import { SchemDetailStopSalePage } from '../pages/schem-detail-stop-sale/schem-detail-stop-sale';
import { PassengerFlowSummaryPage } from '../pages/passenger-flow-summary/passenger-flow-summary.page';
import { PassengerCollectPage } from '../pages/passenger-collect/passenger-collect.page';
import { SearchBusSalePage } from '../pages/search-bus-sale/search-bus-sale.page';
import { SearchIssueBusPage } from '../pages/search-issue-bus/search-issue-bus.page';
import { SearchSaleDetailPage } from '../pages/search-sale-detail/search-sale-detail.page';
import { SearchTicketNumberPage } from '../pages/search-ticket-number/search-ticket-number.page';
import { SiteSearchPage } from '../pages/site-search/site-search.page';
import { FeedbackPage } from '../pages/other/feedback/feedback.page';
import { CompanySearchPage } from '../pages/company-search/company-search.page';
import { BusTypeSearchPage } from '../pages/bus-type-search/bus-type-search.page';
import { BusIdSearchPage } from '../pages/bus-id-search/bus-id-search.page';
import { KeepReasonComponent } from '../component/keep-reason/keep-reason.component';
import { DateFormatPipe } from '../pipe/dateTransform.pipe';
import { SchemTitleComponent } from '../component/schem-title/schem-title.component';
import { SchemDetailShiftClosePage } from '../pages/schem-detail-shift-close/schem-detail-shift-close.page';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    ListPage,
    LogPage,
    LoginPage,
    MainMenu,
    SchemDetailPage,
    SchemDetailClonePage,
    SchemDetailShiftClosePage,
    SchemDetailKeepSeatPage,
    SchemDetailModifyPage,
    SchemDetailStopSalePage,
    PassengerFlowSummaryPage,
    PassengerCollectPage,
    SearchBusSalePage,
    SearchIssueBusPage,
    SearchSaleDetailPage,
    SearchTicketNumberPage,
    SiteSearchPage,
    FeedbackPage,
    CompanySearchPage,
    BusTypeSearchPage,
    BusIdSearchPage,
    KeepReasonComponent,
    DateFormatPipe,
    SchemTitleComponent,
    KeepReasonComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
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
    ListPage,
    LogPage,
    LoginPage,
    MainMenu,
    SchemDetailPage,
    SchemDetailClonePage,
    SchemDetailShiftClosePage,
    SchemDetailKeepSeatPage,
    SchemDetailModifyPage,
    SchemDetailStopSalePage,
    PassengerFlowSummaryPage,
    PassengerCollectPage,
    SearchBusSalePage,
    SearchIssueBusPage,
    SearchSaleDetailPage,
    SearchTicketNumberPage,
    SiteSearchPage,
    FeedbackPage,
    CompanySearchPage,
    BusTypeSearchPage,
    BusIdSearchPage,
    KeepReasonComponent,
    SchemTitleComponent
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AppVersion,
    Keyboard,
    File,
    FileOpener,
    FileTransfer,
    FileTransferObject,
    Device,
    AndroidPermissions,
    InAppBrowser,
    EncryptUtils,
    HttpServices,
    UpgradeService,
    StorageUtils,
    DialogUtil,
    LogUtil,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
