import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchemDetailClonePage } from './schem-detail-clone.page';
import { PipeModule } from '../../pipe/PipeModule';

@NgModule({
  declarations: [
    SchemDetailClonePage,
  ],
  imports: [
    IonicPageModule.forChild(SchemDetailClonePage),
    PipeModule
  ],
})
export class SchemDetailClonePageModule {}
