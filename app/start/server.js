require('dotenv').config()
const express = require('express');
const cors = require('cors');


const { dbConnector } = require('../database/config');

const userRoutes = require('../routes/user');
const coingeckoRoutes = require('../routes/coingecko');


class Server {

    constructor() {
        this.app = express();
        this.port = process.env.PORT;

        // DB Connection
        this.dbConnection();

        // Middlewares
        this.middlewares();

        // App routes
        this.routes();

    }

    async dbConnection() {
        await dbConnector();
    }

    middlewares() {
        // CORS
        this.app.use(cors());

        // Reading and body parser
        this.app.use(express.json());
    }

    routes() {
        this.app.use(userRoutes);
        this.app.use(coingeckoRoutes);

    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Server running in port: ', this.port);
        })
    }

}

module.exports = Server;