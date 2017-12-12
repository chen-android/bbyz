import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { BusTypeSearchPage } from './bus-type-search.page';

@NgModule({
  declarations: [
    BusTypeSearchPage,
  ],
  imports: [
    IonicPageModule.forChild(BusTypeSearchPage),
  ],
})
export class BusTypeSearchPageModule {}
