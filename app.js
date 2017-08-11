const Steppy = require('twostep').Steppy;
const _ = require('underscore');
const cluster = require('cluster');
const createLogger = require('log4js');
const config = require('./config');

const logger = createLogger.getLogger('master');
logger.level = config.logger.level;
const workersHash = {};

const bindExitListeners = function () {
  const exitSignals = {
    SIGINT: 2,
    SIGTERM: 15,
  };

  _(exitSignals).each((exitCode, exitSignal) => {
    process.on(exitSignal, () => {
      process.exit(128 + exitCode);
    });
  });
};

const forkWorker = function (params, callback) {
  callback = callback || _.noop;
  cluster.setupMaster({ exec: `workers/${params.type}.js` });
  const worker = cluster.fork(params);
  workersHash[worker.id] = params;
  worker.on('listening', () => {
    callback();
  });
  worker.on('error', callback);
};

const bindClusterListeners = function () {
  cluster.on('listening', (worker) => {
    const workerParams = workersHash[worker.id];
    logger.info('worker #%s: %s is listening', worker.id, workerParams.type);
  });

  cluster.on('exit', (worker) => {
    const workerParams = workersHash[worker.id];
    delete workersHash[worker.id];

    logger.warn('#%s %s worker died, restore', worker.id, workerParams.type);
    forkWorker(workerParams);
  });
};


Steppy(
  function () {
    bindClusterListeners();

    bindExitListeners();

    const group = this.makeGroup();
    require('os').cpus().forEach(() => {
      forkWorker({ type: 'api' }, group.slot());
    });
  },
  (err) => {
    if (err) {
      logger.error(err.stack || err);
      process.exit(1);
    }
  },
);
