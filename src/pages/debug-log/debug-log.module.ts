import { NgModule } from "@angular/core";
import { LogPage } from "./log/log";
import { LogMenuPage } from "./log-menu/log-menu";
import { IonicModule } from "ionic-angular/module";

@NgModule({
    declarations:[LogPage,LogMenuPage],
    imports:[IonicModule],
    exports: [LogPage, LogMenuPage]
})
export class DebugLogModule{}