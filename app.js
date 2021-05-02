const Server = require('./app/start/server')

const app = new Server();

app.listen();

module.exports = app;
