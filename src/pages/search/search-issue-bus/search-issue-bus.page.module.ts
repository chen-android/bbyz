import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchIssueBusPage } from './search-issue-bus.page';

@NgModule({
    declarations: [
        SearchIssueBusPage
    ],
    imports: [
        IonicPageModule.forChild(SearchIssueBusPage)
    ],
    exports:[SearchIssueBusPage]
})
export class SearchIssueBusPageModule { }