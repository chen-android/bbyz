import { KeepReasonComponent } from './keep-reason.component';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

@NgModule({
    declarations: [
        KeepReasonComponent,
    ],
    imports: [
        IonicPageModule.forChild(KeepReasonComponent),
    ],
})
export class KeepReasonComponentModule { }