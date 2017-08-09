const createLogger = require('log4js');
const cluster = require('cluster');
const _ = require('underscore');

const logger = createLogger.getLogger('');

const workersHash = {};

const forkWorker = function (params) {
  cluster.setupMaster({ exec: `workers/${params.type}.js` });
  const worker = cluster.fork(params);

  workersHash[worker.id] = params;
};

const bindClusterListeners = () => {
  cluster.on('listening', (worker) => {
    const workerParams = workersHash[worker.id];

    logger.info('worker #%s: %s is listening',
      worker.id, workerParams.type);
  });

  cluster.on('exit', (worker) => {
    const workerParams = workersHash[worker.id];

    delete workersHash[worker.id];

    logger.warn('#%s %s worker died, restore',
      worker.id, workerParams.type);

    forkWorker(workerParams);
  });
};

const bindExitListeners = () => {
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

bindClusterListeners();

bindExitListeners();

require('os').cpus().forEach(() => {
  forkWorker({ type: 'main' });
});
