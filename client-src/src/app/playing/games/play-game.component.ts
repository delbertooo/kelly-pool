import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameView } from '../views';
import { GameService } from './game-service.service';
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-play-game',
  templateUrl: './play-game.component.html',
})
export class PlayGameComponent implements OnInit {

  private gameChangeSubscription: Subscription;
  game$: Observable<GameView>;

  constructor(
    private gameService: GameService,
    private route: ActivatedRoute,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.game$ = this.gameService.get(this.route.snapshot.params['gameId']);
    this.gameChangeSubscription = this.game$.subscribe(game => this.onGameChange(game));
  }
  ngOnDestroy(): void {
    this.gameChangeSubscription.unsubscribe();
  }

  private onGameChange(game: GameView) {
    console.debug('game in lobby changed', game);
    if (game.mode === 'OVER') {
      this.router.navigate(['/score', game._id]);
    } else if (game.mode !== 'RUNNING') {
      console.error('Unexpected game mode for playing redirecting to home.');
      //this.router.navigate(['/']);
    }
  }

  claimWinOfCurrentRound(game: GameView) {
    this.gameService.claimWinOfCurrentRound(game.me);
  }

}
