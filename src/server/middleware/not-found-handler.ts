import {NotFound} from 'feathers-errors';

export function notFound() {
  return function(req, res, next) {
    next(new NotFound('Page not found'));
  };
};
