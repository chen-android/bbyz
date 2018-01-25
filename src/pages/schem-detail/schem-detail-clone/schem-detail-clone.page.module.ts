import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchemDetailClonePage } from './schem-detail-clone.page';
import { ShareModule } from '../../../app/app.shared.module';

@NgModule({
    declarations: [
        SchemDetailClonePage
    ],
    imports: [
        IonicPageModule.forChild(SchemDetailClonePage),
        ShareModule
    ],
    exports: [SchemDetailClonePage]
})
export class SchemDetailClonePageModule { }