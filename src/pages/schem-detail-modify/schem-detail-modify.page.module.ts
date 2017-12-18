import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchemDetailModifyPage } from './schem-detail-modify.page';

@NgModule({
  declarations: [
    SchemDetailModifyPage,
  ],
  imports: [
    IonicPageModule.forChild(SchemDetailModifyPage),
  ],
})
export class SchemDetailModifyPageModule {}
