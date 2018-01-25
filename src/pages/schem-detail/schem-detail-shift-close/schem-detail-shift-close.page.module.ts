import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchemDetailShiftClosePage } from './schem-detail-shift-close.page';
import { ShareModule } from '../../../app/app.shared.module';

@NgModule({
    declarations: [
        SchemDetailShiftClosePage
    ],
    imports: [
        IonicPageModule.forChild(SchemDetailShiftClosePage),
        ShareModule
    ],
    exports: [SchemDetailShiftClosePage]
})
export class SchemDetailShiftClosePageModule { }