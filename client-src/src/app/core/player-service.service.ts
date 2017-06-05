import { PlayerView } from '../playing/views';

import { FeathersApp } from './feathers-app.service';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { ReplaySubject } from "rxjs/ReplaySubject";

@Injectable()
export class PlayerService {

  private _currentPlayer$: ReplaySubject<PlayerView> = new ReplaySubject(1);
  get currentPlayer$(): Observable<PlayerView> { return this._currentPlayer$; }

  private playerViews;

  constructor(feathersApp: FeathersApp) {
    this.playerViews = feathersApp.app.service('players');
    
  }

  switchPlayer(playerId): void {
    this._findOrCreatePlayer(playerId).then(
      p => this._currentPlayer$.next(PlayerView.copy(p)),
      e => {
        this._currentPlayer$.next(null);
        console.debug('Switching player failed.', e);
      })
  }

  private _findOrCreatePlayer(playerId: string): Promise<PlayerView> {
    if (playerId) {
      return this.playerViews.get(playerId).catch(e => {
        console.debug(`Could not load player "${playerId}", creating a new one.`);
        return this.playerViews.create(new PlayerView());
      });
    } else {
      return this.playerViews.create(new PlayerView());
    }
  }

}
