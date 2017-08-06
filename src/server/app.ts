import * as path from 'path';
import * as favicon from 'serve-favicon';
import * as compress from 'compression';
import * as cors from 'cors';
import * as feathers from 'feathers';
import * as configuration from 'feathers-configuration';
import * as hooks from 'feathers-hooks';import * as socketio from 'feathers-socketio';
import {middleware} from './middleware';
import {services} from './services';
const serveStatic = feathers.static;

export const app = feathers();

app.configure(configuration(path.join(__dirname, '../..')));

const whitelist = app.get('corsWhitelist');
const corsOptions = {
  origin(origin, callback){
    const originIsWhitelisted = whitelist.indexOf(origin) !== -1;
    callback(null, originIsWhitelisted);
  }
};

app.use(compress())
  .options('*', cors(corsOptions))
  .use(cors(corsOptions))
  .use(favicon( path.join(app.get('public'), 'favicon.ico') ))
  .use('/', serveStatic( app.get('public') ))
  .configure(hooks())
  .configure(socketio())
  .configure(services)
  .configure(middleware);

