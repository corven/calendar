const _ = require('underscore');
const db = require('../db');

const getAll = async function () {
  const tests = await db.test.find().toArray();
  console.log(tests);
};

module.exports = (router) => {
  router.get('/', (req, res, next) => getAll().then(result => res.send('qweqwe')));
};
