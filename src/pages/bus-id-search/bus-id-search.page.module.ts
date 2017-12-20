import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusIdSearchPage } from './bus-id-search.page';

@NgModule({
  declarations: [
    BusIdSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(BusIdSearchPage),
  ],
})
export class BusIdSearchPageModule {}
