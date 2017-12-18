import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { PassengerCollectPage } from './passenger-collect.page';

@NgModule({
  declarations: [
    PassengerCollectPage,
  ],
  imports: [
    IonicPageModule.forChild(PassengerCollectPage),
  ],
})
export class PassengerCollectPageModule {}
