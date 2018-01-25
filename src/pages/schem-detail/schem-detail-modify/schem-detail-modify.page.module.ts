import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchemDetailModifyPage } from './schem-detail-modify.page';
import { ShareModule } from '../../../app/app.shared.module';

@NgModule({
    declarations: [
        SchemDetailModifyPage
    ],
    imports: [
        IonicPageModule.forChild(SchemDetailModifyPage),
        ShareModule
    ],
    exports: [SchemDetailModifyPage]
})
export class SchemDetailModifyPageModule { }