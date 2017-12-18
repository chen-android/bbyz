import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchemDetailClonePage } from './schem-detail-clone.page';

@NgModule({
  declarations: [
    SchemDetailClonePage,
  ],
  imports: [
    IonicPageModule.forChild(SchemDetailClonePage),
  ],
})
export class SchemDetailClonePageModule {}
