const _ = require('underscore');
const db = require('../db');
const Steppy = require('twostep').Steppy;

module.exports = (router) => {
  router.get('/', (req, res, next) => {
    console.log(db);
    db.test.findOne().then((data) => {
      console.log(data);
      res.send(data);
    }).then(next);
  });
};
