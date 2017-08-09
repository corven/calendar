const express = require('express');
const createLogger = require('log4js');
const config = require('../config/base');
const routes = require('../routes');
const requestLogger = require('../middleware/requestLogger');

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
  return new Promise((() => {
    const app = createApp();

    if (params.listen) {
      const hostname = config.listen.hostname;
      const port = config.listen.port;

      logger.info('Starting server on %s:%s', hostname, port);

      app.listen(port, hostname);
    }
  }));
};

module.exports = start;

if (require.main === module) {
  process.on('uncaughtException', (err) => {
    logger.error('Uncaught exception occured:', err.stack || err);
  });

  start({ listen: true }).catch((err) => {
    logger.error(err.stack || err);
    process.exit(1);
  });
}
