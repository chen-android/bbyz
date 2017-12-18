import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchemDetailPage } from './schem-detail.page';

@NgModule({
  declarations: [
    SchemDetailPage,
  ],
  imports: [
    IonicPageModule.forChild(SchemDetailPage),
  ],
})
export class SchemDetailPageModule {}
