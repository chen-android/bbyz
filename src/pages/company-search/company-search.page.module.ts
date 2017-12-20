import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CompanySearchPage } from './company-search.page';

@NgModule({
  declarations: [
    CompanySearchPage,
  ],
  imports: [
    IonicPageModule.forChild(CompanySearchPage),
  ],
})
export class CompanySearchPageModule {}
