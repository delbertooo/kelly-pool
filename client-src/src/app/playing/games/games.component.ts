import { GameView } from '../views';
import { GameService } from './game-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FeathersApp } from '../../core/feathers-app.service'
import { Observable } from "rxjs/Observable";
import { PlayerService } from "../../core";

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
})
export class GamesComponent implements OnInit, OnDestroy {

  private games: any;
  private players: any;
  public currentGame$: Observable<GameView>;
  constructor(private feathersApp: FeathersApp, private gameService: GameService, public playerService: PlayerService) { }

  ngOnInit() {
    // Retrieve a connection to the /games service on the server
    // This service will use websockets for all communication
    this.games = this.feathersApp.app.service('games');
    this.players = this.feathersApp.app.service('players');

    // Listen for when a new message has been created
    this.games.on('created', (message) => {
      console.log('Someone created a game', message);
    });
    this.players.on('created', player => {
      console.log('Someone created a player', player);
    });
    //this.games.find().then(g => console.log(g));
    //this.feathersApp.app.service('/gameview').get('1ZXBe3tXDM5VotFk').then(g => console.log('found it', g), e => console.error('damn', e));
    this.currentGame$ = this.gameService.get('1ZXBe3tXDM5VotFk');
    // Create a new message on the service
  }
  ngOnDestroy(): void {
    //this.currentGame$.unsubscribe();
  }

  createGame() {
    this.games.create({ title: 'A cool new game.' });
  }

  createUser() {
    this.players.create({});
  }

}
