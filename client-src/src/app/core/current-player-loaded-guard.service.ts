import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot, CanActivateChild } from '@angular/router';
import { PlayerService } from "./player-service.service";
import 'rxjs/add/operator/take';

@Injectable()
export class CurrentPlayerLoadedGuard implements CanActivate, CanActivateChild {

    constructor(private playerService: PlayerService, private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        console.log('whaat?');
        return new Promise<boolean>(resolve => {
            console.log('in promise');
            this.playerService.currentPlayer$
                .take(1)
                //.subscribe(p => resolve(p !== null), () => resolve(false))
                .subscribe(p => { console.log('sc', p); resolve(p !== null); }, e => { console.log('se', e); resolve(false); })
            //.unsubscribe();
        });
        //return this.appContext.currentPlayer.subscribe(() => true, () => false).unsubscribe();
    }

    canActivateChild(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Promise<boolean> {
        return this.canActivate(route, state);
    }
}