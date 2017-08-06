
import {player} from './player';
import {game} from './game';
import {gameView} from './games/game-view-service';


export function services() {
  const app = this;

  app.configure(game);
  app.configure(player);
  app.configure(gameView);
};
