const _ = require('underscore');
const db = require('../db').db;
const Steppy = require('twostep').Steppy;

const conn = function () {
  db.test.findOne().then((res) => {
    console.log('wwwwwwwww');
    console.log(res);
    return res;
  }).catch((err) => {
    console.log(err);
  });
};

module.exports = (router) => {
  router.get('/', (req, res, next) => {
    db.test.findOne({}).then((data) => {
      console.log(data);
      res.send(data);
    }).then(next);
  });
};
