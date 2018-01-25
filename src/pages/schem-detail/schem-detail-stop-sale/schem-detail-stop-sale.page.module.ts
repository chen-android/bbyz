import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchemDetailStopSalePage } from './schem-detail-stop-sale.page';
import { ShareModule } from '../../../app/app.shared.module';

@NgModule({
    declarations: [
        SchemDetailStopSalePage
    ],
    imports: [
        IonicPageModule.forChild(SchemDetailStopSalePage),
        ShareModule
    ],
    exports: [SchemDetailStopSalePage]
})
export class SchemDetailStopSalePageModule { }