
const before = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};

const after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
export function gameView() {
    const app = this;

    class GameViewService {
        get(id, params, callback) {
            const gameService = app.service('/games');
            return gameService.get(id).then(game => {
                const myId = '???TODO';
                game.players = game.players || [];
                const me = game.players.find(p => p._id === myId);
                return {
                    _id: game.id,
                    me: me,
                    otherPlayers: game.players.filter(p => p !== me).map(p => ({playerId: p._id, wins: p.wins, currentBall: null})),
                }
            });
        }
        yolo(data) {
            console.log('you called yolo', data);
            return Promise.resolve({msg: 'yolo!', data});
        }
    }

    // Initialize our service with any options it requires
    app.use('/gameview', new GameViewService());

    // Get our initialize service to that we can bind hooks
    const gameViewService = app.service('/gameview');

    // Set up our before hooks
    gameViewService.before(before);

    // Set up our after hooks
    gameViewService.after(after);
};

