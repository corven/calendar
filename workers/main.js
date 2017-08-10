const express = require('express');
const createLogger = require('log4js');
const config = require('../config/base');
const routes = require('../routes');
const requestLogger = require('../middleware/requestLogger');
const db = require('../db');

const logger = createLogger.getLogger('');

const createApp = function () {
  const app = express();

  app.use(requestLogger());
  app.set('view engine', 'jade');
  app.use(routes);

  app.use((req, res) => {
    res.status(404).send();
  });

  app.use((err, req, res, next) => {
    res.status(500).send();
  });

  return app;
};

const start = function (params) {
  return db.init({ config: config.mongodb }).then(() => {
    logger.info('Connection to mongodb has been established');

    const app = createApp();

    if (params.listen) {
      const hostname = config.listen.hostname;
      const port = config.listen.port;

      logger.info('Starting server on %s:%s', hostname, port);

      app.listen(port, hostname);
    }
  }).catch((err) => {
    logger.error(err.stack || err);
    process.exit(1);
  });
};

module.exports = start;

if (require.main === module) {
  start({ listen: true });
}
