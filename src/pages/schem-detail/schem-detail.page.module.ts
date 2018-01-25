import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SchemDetailPage } from './schem-detail.page';
import { ShareModule } from '../../app/app.shared.module';

@NgModule({
    declarations: [
        SchemDetailPage,
    ],
    imports: [
        IonicPageModule.forChild(SchemDetailPage),
        ShareModule
    ],
    exports:[
        SchemDetailPage
    ],
})
export class SchemDetailPageModule { }