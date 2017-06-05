import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamesComponent } from './games/games.component';
import { PlayingRoutingModule } from './playing-routing.module';
import { GameService } from './games/game-service.service';
import { GameLobbyComponent } from './games/game-lobby.component';
import { PlayGameComponent } from './games/play-game.component';

@NgModule({
  imports: [
    CommonModule,
    PlayingRoutingModule,
  ],
  declarations: [GamesComponent, GameLobbyComponent, PlayGameComponent],
  exports: [GamesComponent],
  providers: [GameService],
})
export class PlayingModule { }
