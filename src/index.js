const express = require('express');
const cors = require('cors');
const checker = require('./checker');
const routes = require('./core/routes');

class App{
    constructor() {
        this.server = express();

        this.middlewares();

        this.routes();
    }

    routes() {
        this.server.use('/api', routes)
    }

    async middlewares(){
        this.server.use(cors());
        this.server.use(express.json());
        this.server.use('/health', checker);
    }
}

module.exports = new App().server;