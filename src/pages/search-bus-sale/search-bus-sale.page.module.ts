import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchBusSalePage } from './search-bus-sale.page';
import { PipeModule } from '../../pipe/PipeModule';

@NgModule({
  declarations: [
    SearchBusSalePage,
  ],
  imports: [
    IonicPageModule.forChild(SearchBusSalePage),
    PipeModule
  ],
})
export class SearchBusSalePageModule {}
