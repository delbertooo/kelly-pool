import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GameView } from '../views';
import { GameService } from './game-service.service';
import { Observable } from "rxjs/Observable";
import { Subscription } from "rxjs/Subscription";

@Component({
  selector: 'app-game-lobby',
  templateUrl: './game-lobby.component.html',
})
export class GameLobbyComponent implements OnInit, OnDestroy {

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
    if (game.mode === 'RUNNING') {
      this.router.navigate(['/play', game._id]);
    } else if (game.mode !== 'LOBBY') {
      console.error('Unexpected game mode for lobby, redirecting to home.');
      //this.router.navigate(['/']);
    }
  }

  startGame(game: GameView) {
    this.gameService.startGame(game);
  }
}
