import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';

import { PipesModule } from '../../pipe/pipes.module';
import { HomePage } from './home.page';

@NgModule({
    declarations: [
        HomePage
    ],
    imports: [
        IonicPageModule.forChild(HomePage),
        PipesModule
    ],
    exports:[HomePage]
})
export class HomePageModule { }