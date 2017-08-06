import * as path from 'path';
import * as NeDB from 'nedb';
import * as service from 'feathers-nedb';
import * as hooks from 'feathers-hooks';

const before = {
  all: [(hooks as any).disable('external')],
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

export function game(){
  const app = this;

  const db = new NeDB({
    filename: path.join(app.get('nedb'), 'games.db'),
    autoload: true
  });

  let options = {
    Model: db,
    paginate: {
      default: 5,
      max: 25
    }
  };

  // Initialize our service with any options it requires
  app.use('/games', service(options));

  // Get our initialize service to that we can bind hooks
  const gameService = app.service('/games');

  // Set up our before hooks
  gameService.before(before);

  // Set up our after hooks
  gameService.after(after);
};


