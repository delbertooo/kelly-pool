import { ModuleWithProviders, NgModule, Optional, SkipSelf, LOCALE_ID } from '@angular/core';

import { FeathersApp } from './feathers-app.service'
import { AppContext } from './app-context.service'
import { CurrentPlayerLoadedGuard } from './current-player-loaded-guard.service'
import { PlayerService } from "./player-service.service";

@NgModule({
    imports: [],
    providers: [
        FeathersApp,
        AppContext,
        CurrentPlayerLoadedGuard,
        PlayerService,
        //{ provide: LOCALE_ID, useValue: 'de-DE' },
    ],
    exports: [],
})
export class CoreModule {
    constructor( @Optional() @SkipSelf() parentModule: CoreModule) {
        if (parentModule) {
            throw new Error('CoreModule is already loaded. Import it in the AppModule only.');
        }
    }
}