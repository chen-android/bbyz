import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchemDetailShiftClosePage } from './schem-detail-shift-close.page';
import { PipeModule } from '../../pipe/PipeModule';

@NgModule({
  declarations: [
    SchemDetailShiftClosePage,
  ],
  imports: [
    IonicPageModule.forChild(SchemDetailShiftClosePage),
    PipeModule
  ],
})
export class SchemDetailShiftClosePageModule {}
