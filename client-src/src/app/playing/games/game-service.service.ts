import { GameView, PlayerInGameView } from '../views';
import { FeathersApp, AppContext } from '../../core';
import { Injectable } from '@angular/core';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/fromPromise';

@Injectable()
export class GameService {

  private gameViewsService;
  private startGameService;

  constructor(feathersApp: FeathersApp, private appContext: AppContext) {
    this.gameViewsService = feathersApp.app.service('gameview');
    this.startGameService = feathersApp.app.service('startgame');
  }

  get(id): Observable<GameView> {
    //const s = new Subject<GameView>();

    return new Observable<GameView>(obs => {
      const updateListener = g => obs.next(GameView.copy(g));
      this.gameViewsService.get(id).then(updateListener, e => { obs.error(e); obs.complete(); });
      this.gameViewsService.on('update', updateListener);
      return () => {
        console.log('cleaning up game update listener');
        this.gameViewsService.removeListener('update', updateListener);
      }
    });
  }

  startGame(game: GameView): Observable<boolean> {
    return Observable.fromPromise<boolean>(
      this.startGameService.update({ gameId: game._id }).then(() => true, () => false)
    );
  }

  claimWinOfCurrentRound(player: PlayerInGameView): void {
    
  }


}
