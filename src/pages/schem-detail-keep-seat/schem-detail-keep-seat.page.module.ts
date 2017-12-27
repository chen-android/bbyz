import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchemDetailKeepSeatPage } from './schem-detail-keep-seat.page';
import { PipeModule } from '../../pipe/PipeModule';

@NgModule({
  declarations: [
    SchemDetailKeepSeatPage,
  ],
  imports: [
    IonicPageModule.forChild(SchemDetailKeepSeatPage),
    PipeModule
  ],
})
export class SchemDetailKeepSeatPageModule {}
