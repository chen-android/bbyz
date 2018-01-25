import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SearchSaleDetailPage } from './search-sale-detail.page';

@NgModule({
    declarations: [
        SearchSaleDetailPage
    ],
    imports: [
        IonicPageModule.forChild(SearchSaleDetailPage)
    ],
    exports:[SearchSaleDetailPage]
})
export class SearchSaleDetailPageModule { }