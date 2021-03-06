import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchemDetailKeepSeatPage } from './schem-detail-keep-seat.page';
import { ShareModule } from '../../../app/app.shared.module';

@NgModule({
    declarations: [
        SchemDetailKeepSeatPage
    ],
    imports: [
        IonicPageModule.forChild(SchemDetailKeepSeatPage),
        ShareModule
    ],
    exports: [SchemDetailKeepSeatPage]
})
export class SchemDetailKeepSeatPageModule { }