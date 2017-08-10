const _ = require('underscore');
const db = require('../db');

const conn = function () {
  return new Promise((res, rej) => {    
    return db.test.findOne();
  }).then((res) => {
    console.log('wwwwwwwww')
    console.log(res);
    return res;
  }).catch((err) => {
    console.log(err);
  });
};

module.exports = (router) => {
  router.get('/', (req, res, next) => {
    conn().then((res1) => {
      console.log(res1);
    })
    // db.test.findOne().then((result) => {
    //   console.log('asd123');
    //   res.send('ok');
    //   next();
    // });
  });
};
