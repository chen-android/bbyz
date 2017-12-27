import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchemDetailStopSalePage } from './schem-detail-stop-sale';
import { PipeModule } from '../../pipe/PipeModule';

@NgModule({
  declarations: [
    SchemDetailStopSalePage,
  ],
  imports: [
    IonicPageModule.forChild(SchemDetailStopSalePage),
    PipeModule
  ],
})
export class SchemDetailStopSalePageModule {}
