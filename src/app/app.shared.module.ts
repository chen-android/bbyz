import { NgModule } from "@angular/core";
import { IonicModule } from "ionic-angular/module";
import { PipesModule } from "../pipe/pipes.module";
import { ComponentsModule } from "../component/components.module";


@NgModule({
    declarations:[],
    imports:[IonicModule,PipesModule,ComponentsModule],
    exports: [PipesModule, ComponentsModule]
})
export class ShareModule{}