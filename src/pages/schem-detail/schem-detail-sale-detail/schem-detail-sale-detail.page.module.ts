import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchemDetailSaleDetailPage } from './schem-detail-sale-detail.page';
import { ShareModule } from '../../../app/app.shared.module';

@NgModule({
    declarations: [
        SchemDetailSaleDetailPage
    ],
    imports: [
        IonicPageModule.forChild(SchemDetailSaleDetailPage),
        ShareModule
    ],
    exports: [SchemDetailSaleDetailPage]
})
export class SearchBusSalePageModule { }