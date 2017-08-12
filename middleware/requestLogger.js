const chalk = require('chalk');
const morgan = require('morgan');
const cluster = require('cluster');

module.exports = () => morgan([
  chalk.yellow('[:date]'),
  chalk.green(`[worker #${cluster.worker.id}]`),
  chalk.yellow(':method'),
  ':url',
  '-',
  ':status',
  '-',
  ':response-time ms',
].join(' '));
