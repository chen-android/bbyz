import { NgModule } from "@angular/core";
import { DateFormatPipe } from "./dateTransform.pipe";
export const pipes = [
    DateFormatPipe
]
@NgModule({
    declarations:[pipes],
    exports:[pipes]
})
export class PipesModule{}