'use strict';

const globalHooks = require('../../../hooks');
const hooks = require('feathers-hooks');
const generateName = require('./generate-name');

exports.before = {
  all: [],
  find: [],
  get: [],
  create: [generateName()],
  update: [],
  patch: [],
  remove: []
};

exports.after = {
  all: [],
  find: [],
  get: [],
  create: [],
  update: [],
  patch: [],
  remove: []
};
