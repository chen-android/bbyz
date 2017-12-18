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
import { BusTypeSearchPageModule } from './../pages/bus-type-search/bus-type-search.page.module';
import { FeedbackPageModule } from './../pages/other/feedback/feedback.page.module';
import { SchemDetailPageModule } from '../pages/schem-detail/schem-detail.page.module';
import { SchemDetailModifyPageModule } from '../pages/schem-detail-modify/schem-detail-modify.page.module';
import { SchemDetailClonePageModule } from '../pages/schem-detail-clone/schem-detail-clone.page.module';

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
    HttpClientModule,
    FeedbackPageModule,
    BusTypeSearchPageModule,
    SchemDetailPageModule,
    SchemDetailModifyPageModule,
    SchemDetailClonePageModule,
    IonicModule.forRoot(MyApp)
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
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
