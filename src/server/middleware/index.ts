
import * as handler from 'feathers-errors/lib/error-handler';
import {notFound} from './not-found-handler';
import {logger} from './logger';

export function middleware() {
  // Add your custom middleware here. Remember, that
  // just like Express the order matters, so error
  // handling middleware should go last.
  const app = this;

  app.use(notFound());
  app.use(logger(app));
  app.use(handler());
}
