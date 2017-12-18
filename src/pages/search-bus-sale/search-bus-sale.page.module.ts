import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchBusSalePage } from './search-bus-sale.page';

@NgModule({
  declarations: [
    SearchBusSalePage,
  ],
  imports: [
    IonicPageModule.forChild(SearchBusSalePage),
  ],
})
export class SearchBusSalePageModule {}
