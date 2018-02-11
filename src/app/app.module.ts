import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { MODULES, PROVIDERS } from './app.import';
import { ShareModule } from './app.shared.module';

@NgModule({
  declarations: [
    MyApp
  ],
  imports: [
    MODULES,
    ShareModule,
    IonicModule.forRoot(MyApp,{
      platforms: {
        ios: {
          backButtonText: ""
        }
      }
    })
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp
  ],
  providers: [
    PROVIDERS,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
  ]
})
export class AppModule {}
