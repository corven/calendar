const express = require('express');
const _ = require('underscore');

const router = express.Router({ mergeParams: true });

exports.router = router;

const routes = [
  'get', 'create', 'patch', 'delete',
];

_(routes).each((name) => {
  require(`./${name}`)(router);
});
