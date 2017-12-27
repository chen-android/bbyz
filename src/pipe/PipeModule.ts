import { NgModule } from '@angular/core';
import { DateFormatPipe } from './dateTransform.pipe';


@NgModule({
    imports: [],
    declarations: [DateFormatPipe],
    exports: [DateFormatPipe],
})
export class PipeModule {
    static forRoot() {
        return {
            ngModule: PipeModule,
            providers: [],
        };
    }
}