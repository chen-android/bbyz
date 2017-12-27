import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchemDetailModifyPage } from './schem-detail-modify.page';
import { PipeModule } from '../../pipe/PipeModule';

@NgModule({
  declarations: [
    SchemDetailModifyPage,
  ],
  imports: [
    IonicPageModule.forChild(SchemDetailModifyPage),
    PipeModule
  ],
})
export class SchemDetailModifyPageModule {}
