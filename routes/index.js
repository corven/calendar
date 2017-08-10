const express = require('express');
const _ = require('underscore');

// const router = express.Router({ mergeParams: true });
const router = require('express-promise-router')();

const routes = ['main'];

_(routes).each((name) => {
  require(`./${name}`)(router);
});

module.exports = router;
