import { Injectable } from '@angular/core'

import * as feathers from 'feathers/client';
import * as socketio from 'feathers-socketio/client';
//import * as io from 'socket.io-client';
const io = require('socket.io-client');

@Injectable()
export class FeathersApp {
    public socket;
    public app;

    constructor() {
        // Establish a Socket.io connection to the local server
        this.socket = io();
        // Create a client side Feathers application that uses the socket
        // for connecting to services
        this.app = feathers();
        this.app.configure(socketio(this.socket));
    }
}