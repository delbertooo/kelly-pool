import { Injectable } from '@angular/core'
import { FeathersApp } from './feathers-app.service'
import { Player } from '../playing/views';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from "rxjs/Observable";
import { PlayerService } from "./player-service.service";

@Injectable()
export class AppContext {
    private static readonly KEY_PLAYER_ID = 'kellyPoolPlayerId';

    constructor(private feathersApp: FeathersApp, private playerService: PlayerService) {
        this.loadCurrentPlayer();
    }

    private loadCurrentPlayer() {
        const playerId = localStorage.getItem(AppContext.KEY_PLAYER_ID);
        this.playerService.switchPlayer(playerId);
        this.playerService.currentPlayer$.subscribe(p => {
            console.debug('Switched player', p, this.playerService.currentPlayer$);
            if (p && p._id) { localStorage.setItem(AppContext.KEY_PLAYER_ID, p._id); }
        });
    }
    /*this.findOrCreatePlayer(playerId).then(
        player => {
            console.debug('Loaded player', player);
            localStorage.setItem(AppContext.KEY_PLAYER_ID, player._id);
            this.currentPlayer$.next(player);
            //return player;
        },
        e => {
            console.debug('Error loading or creating current player.', e);
            this.currentPlayer$.next(null);
        });

}

private findOrCreatePlayer(playerId: string): Promise<Player> {
    const players = this.feathersApp.app.service('players');
    if (playerId) {
        return players.get(playerId).catch(e => {
            console.error(`Could not load player "${playerId}", creating a new one.`);
            return players.create(new Player());
        });
    } else {
        return players.create(new Player());
    }
}*/
}