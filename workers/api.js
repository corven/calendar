const Steppy = require('twostep').Steppy;
const createLogger = require('log4js');
const express = require('express');
const cluster = require('cluster');
const bodyParser = require('body-parser');

const config = require('../config');
const db = require('../db');
const requestLogger = require('../middleware/requestLogger');

const apiResource = require('../routes/api');

// when current module forked cluster.worker will be set
const loggerLabel = (
  `worker${
    cluster.worker ? ` #${cluster.worker.id}` : ''
  }: api`
);

const logger = createLogger.getLogger(loggerLabel);
logger.level = config.logger.level;

const createApp = function (callback) {
  Steppy(
    function () {
      const app = express();

      this.pass(app);

      app.set('config', config);
      app.set('env', config.env);
      app.set('worker', cluster.worker);
      app.disable('x-powered-by');

      app.use(requestLogger());
      app.use(bodyParser.json());
      app.use(bodyParser.urlencoded({ extended: true }));
    },
    function (err, app) {
      app.use('/api', apiResource.router);

      app.use((req, res) => {
        res.status(404).send();
      });

      app.use((err, req, res, next) => {
        res.status(500).send();
      });

      this.pass(app);
    },
    callback,
  );
};

const start = function (params, callback) {
  Steppy(
    function () {
      db.init({
        config: config.mongodb,
      }, this.slot());
    },
    function () {

      logger.info('Connection to mongodb has been established');

      createApp(this.slot());
    },
    function (err, app) {
      this.pass(app);

      if (params.listen) {
        const hostname = config.listen.hostname;
        const port = config.listen.port;

        logger.info('Starting server on %s:%s', hostname, port);

        app.listen(port, hostname, this.slot());
      }
    },
    function (err, app) {
      logger.info('Server is ready to accept requests');

      this.pass(app);
    },
    callback,
  );
};

module.exports = start;

if (require.main === module) {
  start({ listen: true }, (err) => {
    if (err) {
      logger.error(err.stack || err);
      process.exit(1);
    }
  });
}
