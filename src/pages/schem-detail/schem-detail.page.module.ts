import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchemDetailPage } from './schem-detail.page';
import { PipeModule } from '../../pipe/PipeModule';

@NgModule({
  declarations: [
    SchemDetailPage
  ],
  imports: [
    IonicPageModule.forChild(SchemDetailPage),
    PipeModule
  ],
})
export class SchemDetailPageModule {}
