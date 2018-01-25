import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { KeepReasonPage } from './keep-reason.page';


@NgModule({
    declarations: [KeepReasonPage],
    imports: [IonicPageModule.forChild(KeepReasonPage),],
    exports:[KeepReasonPage]
})
export class KeepReasonPageModule{}