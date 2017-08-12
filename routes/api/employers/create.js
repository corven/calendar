const Steppy = require('twostep').Steppy;
const _ = require('underscore');
const db = require('../../../db');
const helpers = require('../helpers');

module.exports = function (router) {
  router.post('/',
    (req, res, next) => {
      Steppy(
        function () {
          const validation = helpers.getValidation({
            entityType: 'employers',
            method: 'create',
          });
          const params = req.validate(validation);

          db.employers.insertOne(params, this.slot());
        },
        function (err, employer) {
          res.json(employer);
        },
        next,
      );
    },
  );
};
