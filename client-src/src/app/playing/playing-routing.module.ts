import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CurrentPlayerLoadedGuard } from 'app/core'
import { GamesComponent } from './games/games.component';
import { GameLobbyComponent } from './games/game-lobby.component';
import { PlayGameComponent } from './games/play-game.component';

const routes: Routes = [
    {
        path: '',
        canActivateChild: [CurrentPlayerLoadedGuard],
        children: [
            { path: '', component: GamesComponent },
            { path: 'lobby/:gameId', component: GameLobbyComponent },
            { path: 'play/:gameId', component: PlayGameComponent },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PlayingRoutingModule { }