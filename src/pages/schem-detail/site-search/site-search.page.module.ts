import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { SiteSearchPage } from './site-search.page';

@NgModule({
    declarations: [
        SiteSearchPage
    ],
    imports: [
        IonicPageModule.forChild(SiteSearchPage)
    ],
    exports: [SiteSearchPage]
})
export class SiteSearchPageModule { }