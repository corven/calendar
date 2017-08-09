const _ = require('underscore');

module.exports = (router) => {
  router.get(
    '/',
    (req, res, next) => {
      console.log('aaaaaaaaaaaaaaaaaaaaaaa');
      res.send('ok');
      next();
    },
  );
};
