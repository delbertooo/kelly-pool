'use strict';


const player = require('./player');


const game = require('./game');

const gameView = require('./games/game-view-service');


module.exports = function() {
  const app = this;


  app.configure(game);
  app.configure(player);
  app.configure(gameView);
};
