import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PassengerFlowSummaryPage } from './passenger-flow-summary.page';

@NgModule({
    declarations: [
        PassengerFlowSummaryPage
    ],
    imports: [
        IonicPageModule.forChild(PassengerFlowSummaryPage)
    ],
    exports: [PassengerFlowSummaryPage]
})
export class PassengerFlowSummaryPageModule { }