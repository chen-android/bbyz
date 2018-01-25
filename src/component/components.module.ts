import { NgModule } from "@angular/core";
import { SchemTitleComponent } from "./schem-title/schem-title.component";
import { IonicModule } from "ionic-angular/module";
export const components = [
    SchemTitleComponent,
]
@NgModule({
    declarations:[components],
    imports:[IonicModule],
    exports:[components]
})
export class ComponentsModule{}