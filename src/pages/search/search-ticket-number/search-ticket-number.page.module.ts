import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchTicketNumberPage } from './search-ticket-number.page';

@NgModule({
    declarations: [
        SearchTicketNumberPage
    ],
    imports: [
        IonicPageModule.forChild(SearchTicketNumberPage)
    ],
    exports:[SearchTicketNumberPage]
})
export class SearchTicketNumberPageModule { }