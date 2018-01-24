import { Component ,Input} from "@angular/core";
import { SchemItem } from "../../module/SchemItem";

@Component({
    selector: 'schem-title',
    templateUrl: 'schem-title.component.html'
})
export class SchemTitleComponent {
    @Input() schem:SchemItem;
}