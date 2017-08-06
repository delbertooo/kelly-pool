import * as path from 'path';
import * as NeDB from 'nedb';
import * as service from 'feathers-nedb';

import {generateName} from './generate-name.hook';

const before = {
  all: [],
  find: [],
  get: [],
  create: [generateName()],
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

export function player(){
  const app = this;

  const db = new NeDB({
    filename: path.join(app.get('nedb'), 'players.db'),
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
  app.use('/players', service(options));

  // Get our initialize service to that we can bind hooks
  const playerService = app.service('/players');

  // Set up our before hooks
  playerService.before(before);

  // Set up our after hooks
  playerService.after(after);
};
