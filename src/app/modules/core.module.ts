import { NgModule, Optional, SkipSelf } from '@angular/core';

import { BookifyService } from '../bookify.service';

@NgModule({
  providers: [BookifyService]
})
export class CoreModule {
  constructor(@Optional() @SkipSelf() parentModule: CoreModule) {
    if (parentModule) {
      throw new Error(
        'CoreModule is already loaded. Import it in the AppModule only'
      );
    }
  }
}