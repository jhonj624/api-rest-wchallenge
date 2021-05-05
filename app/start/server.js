require('dotenv').config();
const express = require('express');
const cors = require('cors');

const swaggerUi = require('swagger-ui-express');
const swaggerSpec = require('../../Swagger/index');

const { dbConnector } = require('../database/config');

const userRoutes = require('../routes/user');
const coingeckoRoutes = require('../routes/coingecko');
const authRoutes = require('../routes/auth');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.servidor = ' ';

    // DB Connection
    this.dbConnection();

    // Middlewares
    this.middlewares();

    // App routes
    this.routes();

    // Swagger
    this.documentation();
  }

  // eslint-disable-next-line class-methods-use-this
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
    this.app.use(authRoutes);
  }

  documentation() {
    this.app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }

  listen() {
    this.servidor = this.app.listen(this.port, () => {
      // eslint-disable-next-line no-console
      console.log('Server running on port: ', this.port);
    });
  }

  close() {
    this.servidor.close();
  }
}

module.exports = Server;
