import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { FeedbackPage } from './feedback.page';

@NgModule({
    declarations: [
        FeedbackPage
    ],
    imports: [
        IonicPageModule.forChild(FeedbackPage)
    ],
})
export class FeedbackPageModule { }